import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

interface DatabaseError extends Error {
  code?: string;
  detail?: string;
  constraint?: string;
  driverError?: {
    code?: string;
    detail?: string;
    constraint?: string;
  };
}

@Injectable()
export class CatchAndThrowAsyncErrors {
  private readonly logger = new Logger(CatchAndThrowAsyncErrors.name);

  public execute(error: Error): never {
    this.logger.error('Database operation failed', error.stack);

    if (error instanceof QueryFailedError) {
      return this.handleQueryFailedError(error as DatabaseError);
    }

    if (error instanceof BadRequestException) {
      throw error;
    }

    this.logger.error('Unexpected error type', error);
    throw new InternalServerErrorException('An unexpected error occurred');
  }

  private handleQueryFailedError(error: DatabaseError): never {
    const code = error.driverError?.code || error.code;
    const detail = error.driverError?.detail || error.detail || error.message;
    const constraint = error.driverError?.constraint || error.constraint;

    // Unique constraint violations
    if (this.isUniqueConstraintError(code)) {
      throw new ConflictException(
        this.parseUniqueConstraintMessage(detail, constraint),
      );
    }

    // Foreign key constraint violations
    if (this.isForeignKeyConstraintError(code)) {
      throw new BadRequestException('Referenced record does not exist');
    }

    // Not null constraint violations
    if (this.isNotNullConstraintError(code)) {
      throw new BadRequestException('Required field cannot be empty');
    }

    this.logger.error(`Unhandled database error code: ${code}`, detail);
    throw new InternalServerErrorException('Database operation failed');
  }

  private isUniqueConstraintError(code?: string): boolean {
    return (
      code === '23505' || // PostgreSQL
      code === 'ER_DUP_ENTRY' || // MySQL
      code === 'SQLITE_CONSTRAINT_UNIQUE' // SQLite
    );
  }

  private isForeignKeyConstraintError(code?: string): boolean {
    return (
      code === '23503' || // PostgreSQL
      code === 'ER_NO_REFERENCED_ROW_2' || // MySQL
      code === 'SQLITE_CONSTRAINT_FOREIGNKEY' // SQLite
    );
  }

  private isNotNullConstraintError(code?: string): boolean {
    return (
      code === '23502' || // PostgreSQL
      code === 'ER_BAD_NULL_ERROR' || // MySQL
      code === 'SQLITE_CONSTRAINT_NOTNULL' // SQLite
    );
  }

  private parseUniqueConstraintMessage(
    detail?: string,
    constraint?: string,
  ): string {
    if (!detail) return 'Record with this value already exists';

    // Extract field name from constraint or detail message
    const fieldMatch =
      detail.match(/Key \((\w+)\)=/) || constraint?.match(/(\w+)_unique/);
    const field = fieldMatch?.[1];

    if (field) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    }

    return detail.includes('already exists') ? detail : 'Record already exists';
  }
}

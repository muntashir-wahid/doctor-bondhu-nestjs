import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';

interface PrismaErrorMeta {
  column_name?: string;
  model_name?: string;
  target?: string[];
  field_name?: string;
  cause?: string;
  constraint?: string;
  path?: string;
  details?: string;
  relation_name?: string;
  table?: string;
  column?: string;
  [key: string]: any;
}

@Injectable()
export class PrismaExceptionsService {
  /**
   * Handles Prisma errors and converts them to appropriate HTTP exceptions
   * @param error - The error thrown by Prisma
   * @param customMessage - Optional custom message to override default
   */
  public handlePrismaError(error: any, customMessage?: string): never {
    // console.error('Prisma error occurred:', {
    //   code: error?.code,
    //   message: error?.message,
    //   meta: error?.meta,
    // });

    // Handle Prisma Client Known Request Errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return this.handleKnownRequestError(error, customMessage);
    }

    // Handle Prisma Client Validation Errors
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: customMessage || 'Invalid request data',
        error: 'Validation Error',
        details: this.extractValidationErrorDetails(error.message),
      });
    }

    // Handle Prisma Client Initialization Errors
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Database connection failed',
        error: 'Database Error',
      });
    }

    // Handle Prisma Client Rust Panic Errors
    if (error instanceof Prisma.PrismaClientRustPanicError) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Critical database error',
        error: 'Database Panic',
      });
    }

    // Handle generic errors
    throw new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: customMessage || 'An unexpected error occurred',
      error: 'Internal Server Error',
    });
  }

  /**
   * Handles Prisma Known Request Errors based on error code
   */
  private handleKnownRequestError(
    error: Prisma.PrismaClientKnownRequestError,
    customMessage?: string,
  ): never {
    const meta = error.meta as PrismaErrorMeta | undefined;

    switch (error.code) {
      case 'P2000':
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            customMessage ||
            `The provided value is too long for the column: ${meta?.column_name || 'unknown'}`,
          error: 'Value Too Long',
          field: meta?.column_name,
        });

      case 'P2001':
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message:
            customMessage ||
            `Record not found in ${meta?.model_name || 'database'}`,
          error: 'Record Not Found',
          model: meta?.model_name,
        });

      case 'P2002':
        throw new ConflictException({
          success: false,
          statusCode: HttpStatus.CONFLICT,
          message:
            this.formatUniqueConstraintError(error?.message) || customMessage,
          error: `Unique Constraint Violation on`,
        });

      case 'P2003':
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            customMessage ||
            `Foreign key constraint failed on field: ${meta?.field_name || 'unknown'}`,
          error: 'Foreign Key Constraint',
          field: meta?.field_name,
        });

      case 'P2025':
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: customMessage || 'Record not found or already deleted',
          error: 'Record Not Found',
          cause: meta?.cause,
        });

      case 'P2014':
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            customMessage ||
            `Invalid relationship: ${meta?.relation_name || 'unknown'}`,
          error: 'Invalid Relation',
          relation: meta?.relation_name,
        });

      case 'P2011':
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            customMessage ||
            `Null constraint violation on field: ${meta?.constraint || 'unknown'}`,
          error: 'Null Constraint Violation',
          constraint: meta?.constraint,
        });

      case 'P2012':
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            customMessage ||
            `Missing required value for field: ${meta?.path || 'unknown'}`,
          error: 'Missing Required Field',
          field: meta?.path,
        });

      case 'P2015':
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message:
            customMessage ||
            `Related record not found: ${meta?.details || 'unknown'}`,
          error: 'Related Record Not Found',
          details: meta?.details,
        });

      case 'P2021':
        throw new InternalServerErrorException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            customMessage ||
            `Table ${meta?.table || 'unknown'} does not exist in the database`,
          error: 'Table Not Found',
          table: meta?.table,
        });

      case 'P2022':
        throw new InternalServerErrorException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            customMessage ||
            `Column ${meta?.column || 'unknown'} does not exist in the database`,
          error: 'Column Not Found',
          column: meta?.column,
        });

      default:
        throw new InternalServerErrorException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: customMessage || 'A database error occurred',
          error: 'Database Error',
          code: error.code,
          details: error.message,
        });
    }
  }

  /**
   * Formats unique constraint error message with field names
   */
  private formatUniqueConstraintError(message?: string): string {
    if (!message) {
      return 'A unique constraint violation occurred';
    }

    const fields = message.split('fields:')[1]?.trim()?.replace(/[`()]/g, '');

    return `A record with this ${fields} already exists`;
  }

  /**
   * Extracts validation error details from error message
   */
  private extractValidationErrorDetails(errorMessage: string): string {
    // Clean up the error message to make it more user-friendly
    const lines = errorMessage.split('\n');
    const relevantLines = lines.filter(
      (line) =>
        line.includes('Argument') ||
        line.includes('Invalid') ||
        line.includes('Expected') ||
        line.includes('Got'),
    );
    return relevantLines.join(' ').trim() || errorMessage;
  }
}

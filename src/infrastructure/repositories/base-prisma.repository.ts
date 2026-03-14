/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import {
  FindAllOptions,
  IBaseRepository,
} from './interfaces/base.repository.interface';

/**
 * Abstract Base Repository Implementation
 *
 * Provides common CRUD operations for all domain repositories.
 * Uses Prisma as the underlying data access technology.
 *
 * This follows:
 * - Repository Pattern: Abstracts data access logic
 * - Open/Closed Principle: Open for extension, closed for modification
 * - DRY: Eliminates duplicate CRUD code across repositories
 *
 * @template T - The domain entity type
 * @template PrismaDelegate - The Prisma model delegate type
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class PrismaUserRepository extends BasePrismaRepository<User, Prisma.UserDelegate> {
 *   constructor(prisma: PrismaService) {
 *     super(prisma.user);
 *   }
 * }
 * ```
 */
@Injectable()
export abstract class BasePrismaRepository<
  T,
  PrismaDelegate = any,
> implements IBaseRepository<T> {
  /**
   * The Prisma model delegate (e.g., prisma.user, prisma.patient)
   * Injected by concrete repository implementations
   */
  protected readonly model: PrismaDelegate;

  /**
   * The name of the tenant field used for multi-tenant isolation
   * Default is 'clinicId', but can be overridden in derived classes
   */
  protected readonly tenantField: string = 'clinicId';

  /**
   * Constructor
   * @param model - The Prisma model delegate (e.g., prisma.user)
   * @param tenantField - Optional custom tenant field name
   */
  constructor(model: PrismaDelegate, tenantField?: string) {
    this.model = model;
    if (tenantField) {
      this.tenantField = tenantField;
    }
  }

  /**
   * Find an entity by its unique identifier
   */
  async findById(id: string): Promise<T | null> {
    return (this.model as any).findUnique({
      where: { id },
    });
  }

  /**
   * Find all entities with optional pagination and filtering
   */
  async findAll(options?: FindAllOptions): Promise<T[]> {
    const { skip, take, orderBy, where, include } = options || {};

    return (this.model as any).findMany({
      skip,
      take,
      orderBy,
      where,
      include,
    });
  }

  /**
   * Find entities by tenant (clinic) for multi-tenant isolation
   */
  async findByTenant(clinicId: string, options?: FindAllOptions): Promise<T[]> {
    const { skip, take, orderBy, where, include } = options || {};

    return (this.model as any).findMany({
      where: {
        ...where,
        [this.tenantField]: clinicId,
      },
      skip,
      take,
      orderBy,
      include,
    });
  }

  /**
   * Create a new entity
   */
  async create(data: Partial<T>): Promise<T> {
    return (this.model as any).create({
      data,
    });
  }

  /**
   * Update an existing entity
   */
  async update(id: string, data: Partial<T>): Promise<T> {
    return (this.model as any).update({
      where: { id },
      data,
    });
  }

  /**
   * Delete an entity by its unique identifier
   */
  async delete(id: string): Promise<void> {
    await (this.model as any).delete({
      where: { id },
    });
  }

  /**
   * Count entities matching the given criteria
   */
  async count(where?: any): Promise<number> {
    return (this.model as any).count({
      where,
    });
  }

  /**
   * Check if an entity exists by its unique identifier
   */
  async exists(id: string): Promise<boolean> {
    const count = await (this.model as any).count({
      where: { id },
    });
    return count > 0;
  }

  /**
   * Find one entity matching the given criteria
   * Useful for domain-specific queries
   * @param where - The filter criteria
   * @returns The entity if found, null otherwise
   */
  protected async findOne(where: any): Promise<T | null> {
    return (this.model as any).findFirst({
      where,
    });
  }

  /**
   * Find many entities matching the given criteria
   * Useful for domain-specific queries
   * @param where - The filter criteria
   * @param options - Additional query options
   * @returns Array of entities
   */
  protected async findMany(
    where: any,
    options?: Omit<FindAllOptions, 'where'>,
  ): Promise<T[]> {
    return (this.model as any).findMany({
      where,
      ...options,
    });
  }

  /**
   * Update many entities matching the given criteria
   * Useful for bulk operations
   * @param where - The filter criteria
   * @param data - The partial entity data to update
   * @returns The count of updated entities
   */
  protected async updateMany(where: any, data: Partial<T>): Promise<number> {
    const result = await (this.model as any).updateMany({
      where,
      data,
    });
    return result.count;
  }

  /**
   * Delete many entities matching the given criteria
   * Useful for bulk operations
   * @param where - The filter criteria
   * @returns The count of deleted entities
   */
  protected async deleteMany(where: any): Promise<number> {
    const result = await (this.model as any).deleteMany({
      where,
    });
    return result.count;
  }
}

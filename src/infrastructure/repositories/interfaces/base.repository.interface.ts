/**
 * Base Repository Interface
 *
 * Generic repository contract defining common CRUD operations
 * that all domain repositories must implement.
 *
 * This follows the Repository Pattern and Interface Segregation Principle (ISP).
 *
 * @template T - The domain entity type
 */
export interface IBaseRepository<T> {
  /**
   * Find an entity by its unique identifier
   * @param id - The entity's unique identifier
   * @returns The entity if found, null otherwise
   */
  findById(id: string): Promise<T | null>;

  /**
   * Find all entities with optional pagination
   * @param options - Pagination and filtering options
   * @returns Array of entities
   */
  findAll(options?: FindAllOptions): Promise<T[]>;

  /**
   * Find entities by tenant (clinic) with optional pagination
   * Used for multi-tenant data isolation
   * @param clinicId - The tenant identifier
   * @param options - Pagination and filtering options
   * @returns Array of entities belonging to the tenant
   */
  findByTenant(clinicId: string, options?: FindAllOptions): Promise<T[]>;

  /**
   * Create a new entity
   * @param data - The entity data
   * @returns The created entity
   */
  create(data: Partial<T>): Promise<T>;

  /**
   * Update an existing entity
   * @param id - The entity's unique identifier
   * @param data - The partial entity data to update
   * @returns The updated entity
   */
  update(id: string, data: Partial<T>): Promise<T>;

  /**
   * Delete an entity by its unique identifier
   * @param id - The entity's unique identifier
   * @returns void
   */
  delete(id: string): Promise<void>;

  /**
   * Count entities matching the given criteria
   * @param where - The filter criteria
   * @returns The count of matching entities
   */
  count(where?: any): Promise<number>;

  /**
   * Check if an entity exists by its unique identifier
   * @param id - The entity's unique identifier
   * @returns true if exists, false otherwise
   */
  exists(id: string): Promise<boolean>;
}

/**
 * Options for findAll and findByTenant operations
 */
export interface FindAllOptions {
  /**
   * Number of records to skip (for pagination)
   */
  skip?: number;

  /**
   * Maximum number of records to return
   */
  take?: number;

  /**
   * Field to order by
   */
  orderBy?: {
    [key: string]: 'asc' | 'desc';
  };

  /**
   * Additional filter criteria (Prisma where clause)
   */
  where?: any;

  /**
   * Relations to include in the result
   */
  include?: any;
}

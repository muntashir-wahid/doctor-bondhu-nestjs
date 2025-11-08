import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginatedList<T> {
  public create(
    items: T[],
    totalCount: number,
    page: number,
    limit: number,
    itemName?: string,
  ) {
    const totalPages = Math.ceil(totalCount / limit);
    return {
      data: {
        [itemName || 'items']: items,
        meta: {
          totalCount,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      },
    };
  }
}

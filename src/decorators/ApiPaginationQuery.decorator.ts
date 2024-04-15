import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPaginationQuery({ canSelect = true }) {
  const decorators = [
    ApiQuery({
      name: 'page',
      required: false,
      description: 'Page number',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      description: 'Number of items per page',
      example: 10,
    }),
    ApiQuery({
      name: 'sortBy',
      required: false,
      description: 'Sort by field',
      example: 'createdAt:desc',
    }),
    ApiQuery({
      name: 'filter',
      required: false,
      description:
        'Filter items with expressions (e.g., filter.age=$gte:3 for items where field >= 3)',
    }),
  ];
  if (canSelect) {
    decorators.push(
      ApiQuery({
        name: 'select',
        required: false,
        description: 'Select fields',
        example: 'id,name',
      }),
    );
  }
  return applyDecorators(...decorators);
}

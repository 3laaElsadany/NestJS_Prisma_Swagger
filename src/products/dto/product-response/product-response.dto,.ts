import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Product Name' })
  name: string;

  @ApiProperty({ example: 'Product description...', required: false })
  description?: string;

  @ApiProperty({ example: 99.99 })
  price: number;

  @ApiProperty({ example: 10 })
  quantity: number;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Category Name' }
    }
  })
  category: {
    id: number;
    name: string;
  };

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
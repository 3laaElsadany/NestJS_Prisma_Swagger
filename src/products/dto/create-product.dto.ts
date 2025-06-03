import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of a product',
    type: 'string',
    minLength: 3,
    maxLength: 20,
    default: 'Product_1',
    required: true
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'The description of a product',
    default: 'Product_1 description .....',
    minLength: 10
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: 'number',
    description: 'The price of a product',
    minimum: 10,
    default: 199.99,
    required: true
  })
  @IsNotEmpty({ message: 'Price must not be empty' })
  @IsPositive({ message: 'Price must be a positive number' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price must be a valid number with up to 2 decimal places' })
  price: number;

  @ApiProperty({
    type: 'number',
    description: 'The quantity of a product',
    minimum: 1,
    default: 5,
    required: true
  })
  @IsNotEmpty({ message: 'Quantity must not be empty' })
  @IsPositive({ message: 'Quantity must be a positive number' })
  @IsInt({ message: 'Quantity must be a number' })
  quantity: number;

  @ApiProperty({
    type: 'number',
    description: 'The id of a category',
    required: true
  })
  @IsNotEmpty({ message: 'CategoryId must not be empty' })
  @IsInt({ message: 'CategoryId must be a number' })
  categoryId: number;
}

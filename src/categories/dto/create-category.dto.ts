import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    type: 'string',
    description: 'The name of a category',
    default: 'Category_1',
    minLength: 3,
    maxLength: 20,
    required: true
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;
}
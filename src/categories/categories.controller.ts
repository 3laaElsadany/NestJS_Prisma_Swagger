import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CategoryResponseDto } from './dto/category-response/category-response.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created',
    type: CategoryResponseDto
  })
  @ApiResponse({ status: 400, description: 'Category already exists' })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of all categories',
    type: [CategoryResponseDto]
  })
  async findCategories(): Promise<Category[]> {
    return await this.categoriesService.findCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category details',
    type: CategoryResponseDto
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiParam({
    type: 'string',
    name: 'id',
    description: 'Category ID',
    required: true,
    example: 1
  })
  async findCategory(@Param('id') id: string) {
    return await this.categoriesService.findCategory(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiParam({
    type: 'string',
    name: 'id',
    description: 'Category ID',
    required: true,
    example: 1
  })
  @ApiResponse({
    status: 400,
    description: 'Category already exists'
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found'
  })
  @ApiResponse({
    status: 200,
    description: 'The updated category',
    type: CategoryResponseDto
  })
  async updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({
    status: 200,
    description: 'Confirmation message',
    schema: {
      example: {
        message: 'Category with id __ deleted successfully'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: ' Category can not be deleted because it has products'
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiParam({
    type: 'string',
    name: 'id',
    description: 'Category ID',
    required: true,
    example: 1
  })
  removeCategory(@Param('id') id: string): Promise<{ message: string }> {
    return this.categoriesService.removeCategory(+id);
  }
}

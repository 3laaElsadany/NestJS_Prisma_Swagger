import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductResponseDto } from './dto/product-response/product-response.dto,';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found'
  })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: [ProductResponseDto]
  })
  async findProducts() {
    return this.productsService.findProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Product ID',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Product details',
    type: ProductResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found'
  })
  async findProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findProduct(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Product ID',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated',
    type: ProductResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'Category or product not found'
  })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Product ID',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted',
    schema: {
      example: {
        message: 'Product with id __ deleted successfully'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found'
  })
  async removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.removeProduct(id);
  }

  @Get('category/:id')
  @ApiOperation({ summary: 'Get products by category ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Category ID',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'List of products by category',
    type: [ProductResponseDto]
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async getProductByCategoryId(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductByCategoryId(id);
  }
}
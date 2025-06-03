import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService, private readonly categoriesService: CategoriesService) { }

  async createProduct(createProductDto: CreateProductDto) {
    const category = await this.categoriesService.findCategory(createProductDto.categoryId);
    let product = await this.prismaService.product.findFirst({
      where: {
        name: createProductDto.name,
        categoryId: createProductDto.categoryId
      }
    })
    if (product) {
      product = await this.prismaService.product.update({
        where: { id: product.id },
        data: {
          ...createProductDto,
          quantity: product.quantity + createProductDto.quantity
        }
      })
      return product;
    }

    const createProduct = await this.prismaService.product.create({
      data: {
        ...createProductDto
      }
    })
    return createProduct;
  }

  async findProducts() {
    return await this.prismaService.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      omit: {
        categoryId: true
      }
    });
  }

  async findProduct(id: number) {
    const product = await this.prismaService.product.findFirst({
      where: { id }, include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      omit: {
        categoryId: true
      }
    })
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findProduct(id);
    if (updateProductDto.categoryId) {
      await this.categoriesService.findCategory(updateProductDto.categoryId)
    }
    const updatedProduct = await this.prismaService.product.update({
      where: { id: product.id },
      data: {
        ...updateProductDto,
        quantity: product.quantity + updateProductDto.quantity
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      omit: {
        categoryId: true
      }
    });

    return updatedProduct;
  }

  async removeProduct(id: number): Promise<{ message: string }> {
    await this.findProduct(id);
    await this.prismaService.product.delete({
      where: { id }
    });
    return { message: `Product with id ${id} deleted successfully` };
  }

  async getProductByCategoryId(id: number) {
    await this.categoriesService.findCategory(id);
    const products = await this.prismaService.product.findMany({
      where: { categoryId: id },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      omit: {
        categoryId: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return products;
  }
}

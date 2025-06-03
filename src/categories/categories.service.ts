import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) { }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    let category = await this.findUnique(createCategoryDto.name)
    if (category) {
      throw new BadRequestException('Category already exists');
    }
    category = await this.prismaService.category.create({
      data: {
        name: createCategoryDto.name
      }
    })

    return category;
  }

  async findCategories(): Promise<Category[]> {
    return await this.prismaService.category.findMany()
  }

  async findCategory(id: number) {
    const category = await this.prismaService.category.findFirst({
      where: {
        id
      }
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
  
  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findCategory(id);
    if (await this.findUnique(updateCategoryDto.name)) {
      throw new BadRequestException('Category already exists');
    }
    let updatedCategory = await this.prismaService.category.update({
      where: {
        id
      },
      data: {
        name: updateCategoryDto.name
      }
    })
    return updatedCategory;
  }

  async findUnique(name: string) {
    return await this.prismaService.category.findUnique({
      where: {
        name
      }
    })
  }

  async removeCategory(id: number): Promise<{ message: string }> {
    await this.findCategory(id);
    const n_products = await this.prismaService.product.count({
      where: {
        categoryId: id
      }
    });
    if (n_products > 0) {
      throw new BadRequestException('Category cannot be deleted because it has products');
    }
    await this.prismaService.category.delete({
      where: {
        id
      }
    })
    return { message: `Category with id ${id} deleted successfully` };
  }
}
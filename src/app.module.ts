import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({

  imports: [CategoriesModule, ProductsModule, PrismaModule]
})
export class AppModule { }

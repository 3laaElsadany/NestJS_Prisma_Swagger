import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
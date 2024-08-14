// eslint-disable-next-line prettier/prettier
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/image-file-filter';
import { NullableType } from 'src/utils/types/nullable.type';
import { Product } from './domain/product';
import { CreateProductDto } from './dto/create-product.dto';
import { ImageRemoveDto } from './dto/image-remove.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('image')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'images',
        },
      ],
      {
        fileFilter: imageFileFilter,
      },
    ),
  )
  async uploadImage(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    return this.productsService.uploadProductIamge(files);
  }

  @Delete('image')
  @HttpCode(HttpStatus.OK)
  async removeImage(@Body() data: ImageRemoveDto[]): Promise<void> {
    return this.productsService.removeImage(data);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() data: CreateProductDto): Promise<Product> {
    return this.productsService.create(data);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Body() data: UpdateProductDto,
    @Param('id') id: Product['id'],
  ) {
    return this.productsService.update(id, data);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOneById(
    @Param('id') id: Product['id'],
  ): Promise<NullableType<Product>> {
    return await this.productsService.findOne(id);
  }

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // async getProducts() {
  //   const result = await this.productsService.findAll();
  //   return result;
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') id: Product['id']): Promise<void> {
    return this.productsService.delete(id);
  }
}

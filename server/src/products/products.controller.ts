import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { imageFileFilter } from 'src/utils/image-file-filter';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
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
  async createProduct(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() body: any,
  ) {
    const { productInfo } = body;
    const parsedProductInfo = JSON.parse(productInfo);
    const productData = plainToInstance(CreateProductDto, {
      ...body,
      productInfo: parsedProductInfo,
    });

    if (files.images.length === 0) {
      throw new BadRequestException('At least one image is required');
    }

    const imageUrls = await Promise.all(
      files.images.map((image) =>
        this.cloudinaryService.uploadFile(image, 'products'),
      ),
    );

    productData.productInfo.forEach((info, index) => {
      info.imageUrl = imageUrls[index].secure_url;
    });

    await validateOrReject(productData);

    const result = await this.productsService.create(productData);

    return result;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProduct(@Param('id') id: number) {
    const result = await this.productsService.findOne(id);
    return result;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProducts() {
    const result = await this.productsService.findAll();
    return result;
  }
}

// eslint-disable-next-line prettier/prettier
import {
  BadRequestException,
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
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { imageFileFilter } from 'src/utils/image-file-filter';
import { generateErrors } from 'src/utils/validation-options';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
    try {
      const { productInfo } = body;
      const parsedProductInfo = JSON.parse(productInfo);
      const productData = plainToInstance(CreateProductDto, {
        ...body,
        productInfo: parsedProductInfo,
      });

      if (!files.images || files?.images?.length === 0) {
        throw new BadRequestException('At least one image is required');
      }

      const imageUrls = await Promise.all(
        files.images.map((image) =>
          this.cloudinaryService.uploadFile(image, 'products'),
        ),
      );

      productData.images = imageUrls.map((url) => ({
        imageUrl: url.secure_url,
      }));

      await validateOrReject(productData);

      console.log(productData.images);

      const result = this.productsService.create(productData);

      return result;
    } catch (error) {
      if (error instanceof Array && error[0] instanceof ValidationError) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: generateErrors(error),
        });
      } else {
        throw new BadRequestException(error.message);
      }
    }
  }

  @Post(':id')
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
  async updateProduct(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() body: any,
    @Param('id') productId: number,
  ) {
    try {
      const { productInfo } = body;
      const parsedProductInfo = JSON.parse(productInfo);
      const productData = plainToInstance(UpdateProductDto, {
        ...body,
        productInfo: parsedProductInfo,
      });

      let imageUrls;
      if (files.images && files?.images?.length > 0) {
        imageUrls = await Promise.all(
          files.images.map((image) =>
            this.cloudinaryService.uploadFile(image, 'products'),
          ),
        );

        productData.images = imageUrls.map((url) => ({
          imageUrl: url.secure_url,
        }));
      }

      await validateOrReject(productData);

      const result = this.productsService.update(productId, productData);

      return result;
    } catch (error) {
      if (error instanceof Array && error[0] instanceof ValidationError) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: generateErrors(error),
        });
      } else {
        throw new BadRequestException(error.message);
      }
    }
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

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}

import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { CloudinaryResponse } from 'src/cloudinary/cloudinary-response';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductSizesEnum } from 'src/product-sizes/product-sizes.enum';
import { ProductImage } from './domain/product-image';
import { CreateProductDto } from './dto/create-product.dto';
import { ImageRemoveDto } from './dto/image-remove.dto';
import { ProductRepository } from './infrastructure/product.repository';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepo: ProductRepository,
    private categoriesService: CategoriesService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async uploadProductIamge(files: {
    images?: Express.Multer.File[];
  }): Promise<ProductImage[]> {
    let imageUploadedRes: CloudinaryResponse[];
    if (files.images && files?.images?.length > 0) {
      imageUploadedRes = await Promise.all(
        files.images.map((image) =>
          this.cloudinaryService.uploadFile(image, 'products'),
        ),
      );
    }

    return Promise.all(
      imageUploadedRes.map((image) => {
        return this.productsRepo.uploadProductImage({
          imageUrl: image.secure_url,
          publicId: image.public_id,
        });
      }),
    );
  }

  async removeImage(data: ImageRemoveDto[]): Promise<void> {
    await Promise.all(
      data.map(async (image) => {
        await this.productsRepo.removeProductImage(image.id);
        await this.cloudinaryService.removeFile(image.publicId);
      }),
    );

    return;
  }

  async create(payload: CreateProductDto): Promise<any> {
    const clonedPayload = {
      ...payload,
    };
    const category = await this.categoriesService.findById(
      clonedPayload.category.id,
    );
    console.log({ category });
    if (!category) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          category: 'Category not found!',
        },
      });
    }

    const { sizes } = clonedPayload;
    if (sizes) {
      sizes.forEach((size) => {
        if (size.id) {
          const sizeObject = Object.values(ProductSizesEnum)
            .map(String)
            .includes(String(size.id));

          if (!sizeObject) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                message: 'size not exits',
              },
            });
          }
        }
      });
    }

    const validSizes = sizes.map((size) => size.id.toString());
    console.log({ validSizes });
    clonedPayload.productInfo.forEach((info) => {
      const invalidSizes = Object.keys(info.colorSizeWiseQuantity).filter(
        (size) => !validSizes.includes(size),
      );

      if (invalidSizes.length > 0) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          errors: {
            message: `Invalid sizes in colorSizeWiseQuantity: ${invalidSizes.join(', ')}`,
          },
        });
      }
    });

    const { images } = clonedPayload;
    if (images) {
      images.forEach((image) => {
        if (image.id) {
          const imageObject = this.productsRepo.findImageById(image.id);

          if (!imageObject) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                message: 'image not exits',
              },
            });
          }
        }
      });
    }

    return await this.productsRepo.create(clonedPayload);

    // // Save product sizes
    // for (const sizeName of sizes) {
    //   let size = await this.sizesRepository.findOne({
    //     where: { sizeName: sizeName.toUpperCase() },
    //   });
    //   if (!size) {
    //     size = this.sizesRepository.create({
    //       sizeName: sizeName.toUpperCase(),
    //     });
    //     size = await this.sizesRepository.save(size);
    //   }
    //   const productSize = this.productSizesRepository.create({
    //     product: savedProduct,
    //     size,
    //   });
    //   await this.productSizesRepository.save(productSize);
    // }
    // // Save product colors and related information like color size quantity and color wise quantity
    // for (const info of productInfo) {
    //   const { color, colorWiseQuantity, colorSizeWiseQuantity, colorName } =
    //     info;
    //   const productColor = this.productColorsRepository.create({
    //     colorName: colorName.toLowerCase(),
    //     colorCode: color,
    //     product: savedProduct,
    //     colorWiseQuantity,
    //     colorSizeWiseQuantity,
    //   });

    //   await this.productColorsRepository.save(productColor);
    // }

    // for (const image of images) {
    //   const { imageUrl } = image;
    //   const newImage = this.imagesRepository.create({
    //     imageUrl,
    //     product: savedProduct,
    //   });
    //   await this.imagesRepository.save(newImage);
    // }

    // return await this.findOne(savedProduct.id);
  }

  // async update(
  //   id: number,
  //   updateProductDto: UpdateProductDto,
  // ): Promise<ProductDto> {
  //   const {
  //     title,
  //     description,
  //     buyPrice,
  //     sellPrice,
  //     categoryId,
  //     quantity,
  //     discount,
  //     visibility,
  //     sizes,
  //     productInfo,
  //   } = updateProductDto;

  //   const category = await this.categoryService.findById(categoryId);
  //   if (!category) {
  //     throw new NotFoundException(`Category with id ${categoryId} not found`);
  //   }
  //   const product = await this.productsRepository.findOneBy({ id });
  //   if (!product) {
  //     throw new NotFoundException(`Product with id ${id} not found`);
  //   }

  //   product.title = title;
  //   product.description = description;
  //   product.buyPrice = buyPrice;
  //   product.sellPrice = sellPrice;
  //   product.category = category;
  //   product.quantity = quantity;
  //   product.discount = discount;
  //   product.visibility = visibility;

  //   await this.productsRepository.save(product);

  //   // Save product sizes
  //   for (const sizeName of sizes) {
  //     let size = await this.sizesRepository.findOneBy({
  //       sizeName: sizeName.toUpperCase(),
  //     });

  //     if (!size) {
  //       size = this.sizesRepository.create({ sizeName });
  //       size = await this.sizesRepository.save(size);
  //     }

  //     const productSize = await this.productSizesRepository.findOneBy({
  //       product,
  //       size,
  //     });
  //     if (!productSize) {
  //       const newProductSize = this.productSizesRepository.create({
  //         product,
  //         size,
  //       });
  //       await this.productSizesRepository.save(newProductSize);
  //     }
  //   }
  //   // Save product colors and related information like color size quantity and color wise quantity
  //   for (const info of productInfo) {
  //     const { color, colorWiseQuantity, colorSizeWiseQuantity, colorName } =
  //       info;
  //     const isColorExist = await this.productColorsRepository.findOneBy({
  //       product,
  //       colorCode: color,
  //     });
  //     if (isColorExist) {
  //       isColorExist.colorWiseQuantity = colorWiseQuantity;
  //       isColorExist.colorSizeWiseQuantity = colorSizeWiseQuantity;
  //       isColorExist.colorName = colorName;
  //       await this.productColorsRepository.save(isColorExist);
  //       continue;
  //     }
  //     const productColor = this.productColorsRepository.create({
  //       colorName,
  //       colorCode: color,
  //       product,
  //       colorWiseQuantity,
  //       colorSizeWiseQuantity,
  //     });

  //     await this.productColorsRepository.save(productColor);
  //   }

  //   return await this.findOne(product.id);
  // }
  /*
  async findOne(id: number): Promise<ProductDto> {
    const product = await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productColors', 'productInfo')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.productSizes', 'productSizes')
      .leftJoinAndSelect('productSizes.size', 'size')
      .where('product.id = :id', { id })
      .getOne();

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    const transformedProduct = {
      ...product,
      sizes: product.productSizes.map((productSize) => ({
        sizeName: productSize.size.sizeName,
        id: productSize.size.id,
      })),
      productInfo: product.productColors,
    };
    delete transformedProduct.productSizes;
    delete transformedProduct.visibility;
    delete transformedProduct.productColors;
    return transformedProduct;
  }

  async findAll(): Promise<ProductDto[]> {
    const products = await this.productsRepository.find({
      relations: [
        'productColors',
        'productSizes',
        'productSizes.size',
        'images',
      ],
    });
    console.log(products);
    const transformedProducts = products.map((product) => {
      const transformedProduct = {
        ...product,
        sizes: product.productSizes.map((productSize) => ({
          sizeName: productSize.size.sizeName,
          id: productSize.size.id,
        })),
        productInfo: product.productColors,
      };
      delete transformedProduct.productSizes;
      delete transformedProduct.visibility;
      delete transformedProduct.productColors;
      return transformedProduct;
    });

    return transformedProducts;
  }

  async delete(id: number) {
    const product = await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productColors', 'productColors')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.productSizes', 'productSizes')
      .where('product.id = :id', { id })
      .getOne();

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const result = await this.productsRepository.remove(product);
    console.log(result);
    return {
      message: 'Product successfully deleted',
    };
  }
    */
}

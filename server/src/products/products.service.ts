import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ColorSizeQuantity } from './entity/color-size-quantity.entity';
import { Image } from './entity/image.entity';
import { ProductColor } from './entity/product-color.entity';
import { ProductSize } from './entity/product-size.entity';
import { Product } from './entity/product.entity';
import { Size } from './entity/size.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly categoriesService: CategoriesService,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductColor)
    private productColorsRepository: Repository<ProductColor>,
    @InjectRepository(ColorSizeQuantity)
    private colorSizeQuantitiesRepository: Repository<ColorSizeQuantity>,
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    @InjectRepository(Size)
    private sizesRepository: Repository<Size>,
    @InjectRepository(ProductSize)
    private productSizesRepository: Repository<ProductSize>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // const {
    //   title,
    //   description,
    //   buyPrice,
    //   sellPrice,
    //   categoryId,
    //   quantity,
    //   discount,
    //   visibility,
    //   sizes,
    //   productInfo,
    // } = createProductDto;
    // const category = await this.categoriesService.getCategoryById(categoryId);
    // if (!category) {
    //   throw new NotFoundException(`Category with id ${categoryId} not found`);
    // }
    // const product = this.productsRepository.create({
    //   title,
    //   description,
    //   buyPrice,
    //   sellPrice,
    //   category,
    //   quantity,
    //   discount,
    //   visibility,
    // });
    // const savedProduct = await this.productsRepository.save(product);
    // // Save product sizes
    // for (const sizeName of sizes) {
    //   let size = await this.sizesRepository.findOne({ where: { sizeName } });
    //   if (!size) {
    //     size = this.sizesRepository.create({ sizeName });
    //     size = await this.sizesRepository.save(size);
    //   }
    //   const productSize = this.productSizesRepository.create({
    //     product: savedProduct,
    //     size,
    //   });
    //   await this.productSizesRepository.save(productSize);
    // }
    // // Save product colors and related information
    // for (const info of productInfo) {
    //   const {
    //     color,
    //     colorWiseQuantity,
    //     colorSizeWiseQuantity,
    //     colorName,
    //     imageUrl,
    //   } = info;
    //   const productColor = this.productColorsRepository.create({
    //     colorName,
    //     colorCode: color,
    //     product: savedProduct,
    //     colorWiseQuantity,
    //   });
    //   const savedProductColor =
    //     await this.productColorsRepository.save(productColor);
    //   for (const [size, qty] of Object.entries(colorSizeWiseQuantity)) {
    //     if (sizes.indexOf(size) === -1) {
    //       throw new BadRequestException(
    //         `Size ${size} is not valid because this product does not have this size`,
    //       );
    //     }
    //     const dbSize = await this.sizesRepository.findOne({
    //       where: { sizeName: size },
    //     });
    //     const colorSizeQuantity = this.colorSizeQuantitiesRepository.create({
    //       productColor: savedProductColor,
    //       size: dbSize,
    //       quantity: +qty, // Ensure quantity is a number
    //     });
    //     await this.colorSizeQuantitiesRepository.save(colorSizeQuantity);
    //   }
    //   const image = this.imagesRepository.create({
    //     productColor: savedProductColor,
    //     imageUrl: imageUrl,
    //   });
    //   await this.imagesRepository.save(image);
    // }
    // const savedProductDeatils = await this.productsRepository.find({
    //   where: { id: savedProduct.id },
    //   relations: [
    //     'category',
    //     'productColors',
    //     'productColors.colorSizeQuantities',
    //     'productColors.images',
    //     'productSizes',
    //     'productSizes.size',
    //   ],
    // });
    // return {
    //   ...savedProductDeatils[0],
    // };
    return createProductDto;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.find({
      where: { id },
      relations: [
        'productColors',
        'productColors.colorSizeQuantities',
        'productColors.images',
        'productSizes.size',
      ],
    });

    return product[0];
  }
}

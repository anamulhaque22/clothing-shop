import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
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
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    @InjectRepository(Size)
    private sizesRepository: Repository<Size>,
    @InjectRepository(ProductSize)
    private productSizesRepository: Repository<ProductSize>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const {
      title,
      description,
      buyPrice,
      sellPrice,
      categoryId,
      quantity,
      discount,
      visibility,
      sizes,
      productInfo,
    } = createProductDto;

    const category = await this.categoriesService.getCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    const product = this.productsRepository.create({
      title,
      description,
      buyPrice,
      sellPrice,
      category,
      quantity,
      discount,
      visibility,
    });
    const savedProduct = await this.productsRepository.save(product);

    // Save product sizes
    for (const sizeName of sizes) {
      let size = await this.sizesRepository.findOne({
        where: { sizeName: sizeName.toUpperCase() },
      });
      if (!size) {
        size = this.sizesRepository.create({ sizeName });
        size = await this.sizesRepository.save(size);
      }
      const productSize = this.productSizesRepository.create({
        product: savedProduct,
        size,
      });
      await this.productSizesRepository.save(productSize);
    }
    // Save product colors and related information like color size quantity and color wise quantity
    for (const info of productInfo) {
      const {
        color,
        colorWiseQuantity,
        colorSizeWiseQuantity,
        colorName,
        imageUrl,
      } = info;
      const productColor = this.productColorsRepository.create({
        colorName,
        colorCode: color,
        product: savedProduct,
        colorWiseQuantity,
        colorSizeWiseQuantity,
      });

      await this.productColorsRepository.save(productColor);

      const image = this.imagesRepository.create({
        imageUrl: imageUrl,
        product: savedProduct,
      });
      await this.imagesRepository.save(image);
    }
    const savedProductDeatils = await this.productsRepository.find({
      where: { id: savedProduct.id },
      relations: {
        productColors: true,
      },
    });
    return {
      ...savedProductDeatils[0],
    };
  }

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
}

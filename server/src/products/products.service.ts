import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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

  async create(createProductDto: CreateProductDto): Promise<ProductDto> {
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
      images,
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
        size = this.sizesRepository.create({
          sizeName: sizeName.toUpperCase(),
        });
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
      const { color, colorWiseQuantity, colorSizeWiseQuantity, colorName } =
        info;
      const productColor = this.productColorsRepository.create({
        colorName: colorName.toLowerCase(),
        colorCode: color,
        product: savedProduct,
        colorWiseQuantity,
        colorSizeWiseQuantity,
      });

      await this.productColorsRepository.save(productColor);
    }

    for (const image of images) {
      const { imageUrl } = image;
      const newImage = this.imagesRepository.create({
        imageUrl,
        product: savedProduct,
      });
      await this.imagesRepository.save(newImage);
    }

    return await this.findOne(savedProduct.id);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
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
    } = updateProductDto;

    const category = await this.categoriesService.getCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    product.title = title;
    product.description = description;
    product.buyPrice = buyPrice;
    product.sellPrice = sellPrice;
    product.category = category;
    product.quantity = quantity;
    product.discount = discount;
    product.visibility = visibility;

    await this.productsRepository.save(product);

    // Save product sizes
    for (const sizeName of sizes) {
      let size = await this.sizesRepository.findOneBy({
        sizeName: sizeName.toUpperCase(),
      });

      if (!size) {
        size = this.sizesRepository.create({ sizeName });
        size = await this.sizesRepository.save(size);
      }

      const productSize = await this.productSizesRepository.findOneBy({
        product,
        size,
      });
      if (!productSize) {
        const newProductSize = this.productSizesRepository.create({
          product,
          size,
        });
        await this.productSizesRepository.save(newProductSize);
      }
    }
    // Save product colors and related information like color size quantity and color wise quantity
    for (const info of productInfo) {
      const { color, colorWiseQuantity, colorSizeWiseQuantity, colorName } =
        info;
      const isColorExist = await this.productColorsRepository.findOneBy({
        product,
        colorCode: color,
      });
      if (isColorExist) {
        isColorExist.colorWiseQuantity = colorWiseQuantity;
        isColorExist.colorSizeWiseQuantity = colorSizeWiseQuantity;
        isColorExist.colorName = colorName;
        await this.productColorsRepository.save(isColorExist);
        continue;
      }
      const productColor = this.productColorsRepository.create({
        colorName,
        colorCode: color,
        product,
        colorWiseQuantity,
        colorSizeWiseQuantity,
      });

      await this.productColorsRepository.save(productColor);
    }

    return await this.findOne(product.id);
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
}

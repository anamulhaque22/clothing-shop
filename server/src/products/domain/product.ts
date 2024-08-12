import { Expose } from 'class-transformer';
import { Category } from 'src/categories/domain/category';
class Size {
  id: number;
  name?: string;
}

class Image {
  id: number;
  imageUrl?: string;
}

class ProductInfo {
  id?: number;
  colorName: string;
  colorCode: string;
  colorWiseQuantity: number;
  colorSizeWiseQuantity: { [key: string]: number };
}

export class Product {
  id: number;
  title: string;
  description: string;

  @Expose({ groups: ['admin'] })
  buyPrice: number;

  sellPrice: number;

  category: Category;

  quantity: number;

  discount: number;

  sizes: Size[];

  images: Image[];

  productInfo: ProductInfo[];

  visibility: 'Hidden' | 'Visible';
}

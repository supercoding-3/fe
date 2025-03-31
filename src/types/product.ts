export interface Product {
  productId: number;
  img: string;
  title: string;
  price: number;
  category: string;
  productStatus: string;
}

export interface MyPageProduct {
  bidProducts: Product[] | [];
  soldProducts: Product[] | [];
}

export interface ProductForm {
  images: File[];
  title: string;
  description: string;
  startingBidPrice: number;
  immediatePrice: number;
  productEndDate: string;
  category: string;
}

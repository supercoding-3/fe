export interface Product {
  productId: number;
  img: string;
  title: string;
  price: number;
  category: string;
  productStatus: string;
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

// TODO: 제거
// export interface ProductData {
//   productId?: number;
//   title: string;
//   description: string;
//   startingBidPrice?: number;
//   immediatePrice: number;
//   category: string;
//   productEndDate?: string;
//   productStatus?: string;
//   isSeller: boolean;
//   imageUrls?: string[];
//   img?: string;
//   allBids?: Bid[];
//   price?: number;
// }

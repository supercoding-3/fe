export interface Bid {
  bidCreatedAt: string;
  bidPrice: number;
}

export interface ProductData {
  productId?: number;
  title: string;
  description: string;
  startingBidPrice?: number;
  immediatePrice: number;
  category: string;
  productEndDate?: string;
  productStatus?: string;
  isSeller: boolean;
  imageUrls?: string[];
  allBids?: Bid[];
}

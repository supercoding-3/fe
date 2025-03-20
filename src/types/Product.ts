export interface Bid {
  bidId: number;
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
  img?: string;
  allBids?: Bid[];
  price?: number;
}

export interface ProductData {
  productId?: number;
  title: string;
  description: string;
  startingBidPrice?: number;
  immediatePrice: number;
  category: string;
  productEndDate?: string;
}

export interface Bid {
  bidCreatedAt: string;
  bidPrice: number;
}

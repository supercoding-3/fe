import axios from '@/axios/axios';
import { Product } from '@/types';

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await axios.get('/products/all');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  },
  getById: async (id: string): Promise<Product> => {
    try {
      const response = await axios.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching product with ID ${id}`);
    }
  },
};

import axios from '@/axios/axios';
import { AuthForm, Product, ProductForm } from '@/types';

export const userApi = {
  login: async (payload: AuthForm) => {
    try {
      const response = await axios.post('api/user/login', payload);
      return response.data;
    } catch (error) {
      throw new Error('Error logging in');
    }
  },
  signup: async (payload: AuthForm) => {
    try {
      const response = await axios.post('api/user/signup', payload);
      return response.data;
    } catch (error) {
      throw new Error('Error signing up');
    }
  },
};

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await axios.get('api/products/all');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  },
  search: async (query: string): Promise<Product[]> => {
    try {
      const response = await axios.get(`api/products/search?${query}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  },
  getById: async (id: string): Promise<Product> => {
    try {
      const response = await axios.get(`api/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching product with ID ${id}`);
    }
  },
  createProduct: async (payload: FormData): Promise<Product> => {
    try {
      const response = await axios.post('api/products/register', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error creating product');
    }
  },
};

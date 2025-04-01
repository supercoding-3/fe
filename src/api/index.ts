import { AuthForm, Product, ProductDetail } from '@/types';
import axios from './axios';

export const userApi = {
  signup: async (payload: AuthForm) => {
    try {
      const response = await axios.post('api/user/signup', payload);
      return response.data;
    } catch (error) {
      throw new Error('Error signing up');
    }
  },
  login: async (payload: AuthForm) => {
    try {
      const response = await axios.post('api/user/login', payload);
      return response.data;
    } catch (error) {
      throw new Error('Error logging in');
    }
  },
  checkLogin: async () => {
    try {
      const response = await axios.get('api/user/check-login');
      return response.data;
    } catch (error) {
      throw new Error('Error checking login status');
    }
  },
  getProducts: async () => {
    try {
      const response = await axios.get('api/user/my-page');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching users products');
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
  getById: async (id: string): Promise<ProductDetail> => {
    try {
      const response = await axios.get(`api/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching product with ID ${id}`);
    }
  },
  create: async (payload: FormData) => {
    try {
      axios.post('api/products/register', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      throw new Error('Error creating product');
    }
  },
  edit: async (id: string, payload: FormData) => {
    try {
      await axios.patch(`api/products/${id}/edit`, payload);
    } catch (error) {
      throw new Error(`Error editing product with ID ${id}`);
    }
  },
  delete: async (id: number) => {
    try {
      await axios.delete(`api/products/${id}`);
    } catch (error) {
      throw new Error(`Error deleting product with ID ${id}`);
    }
  },
};

export const chatApi = {
  getUserRooms: async () => {
    try {
      const response = await axios.get('api/chat/rooms');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching chat list');
    }
  },
};

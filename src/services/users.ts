// services/users.ts
import api from './api';
import { User } from '../types';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface UpdateUserData {
    name?: string;
    email?: string;
    role?: 'admin' | 'cashier' | 'inventory_manager';
}

export const userApi = {
    getAll: async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      console.log('Token en getAll:', token); // Debug
      const response = await api.get('/users');
      return response.data.data.users;
    },

    getById: async (id: string): Promise<User> => {
        const response = await api.get<ApiResponse<{ user: User }>>(`/users/${id}`);
        return response.data.data.user;
    },

    update: async (id: string, userData: UpdateUserData): Promise<User> => {
        const response = await api.put<ApiResponse<{ user: User }>>(`/users/${id}`, userData);
        return response.data.data.user;
    },

    deactivate: async (id: string): Promise<void> => {
        await api.delete(`/users/${id}`);
    },
    register: async (userData: Record<string, any>): Promise<User> => {
        const response = await api.post('/auth/register', userData);
        return response.data;
      },
};
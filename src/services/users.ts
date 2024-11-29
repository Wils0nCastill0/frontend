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
    getAll: async (): Promise<User[]> => {
        const response = await api.get<ApiResponse<{ users: User[] }>>('/users');
        return response.data.data.users || [];
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
    }
};
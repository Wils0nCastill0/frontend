// services/auth.ts
import api from './api';
import { User } from '../types';

interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    };
}

export const authApi = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await api.post<LoginResponse>('/auth/login', { email, password });
            console.log('Login response:', response.data); // Debug

            if (response.data.data.token) {
                const token = response.data.data.token;
                localStorage.setItem('token', token);
                // Establecer el token en los headers por defecto
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                console.log('Token guardado:', token); // Debug
            }

            return response.data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    },

    // Método para verificar si el usuario está autenticado
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return !!token;
    },

    // Método para obtener el token
    getToken: () => {
        return localStorage.getItem('token');
    }
};
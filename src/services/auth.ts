import api from '../services/api'; // Asegúrate de que esta ruta sea la correcta.

// Define los tipos esperados para el usuario y el token
interface User {
    id: string;
    name: string;
    email: string;
  // Agrega otras propiedades relevantes según el modelo de tu backend
}

interface LoginResponse {
    user: User;
    token: string;
}

// Servicios de autenticación
export const authApi = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', { email, password });
        return response.data;
    },
    register: async (userData: Record<string, unknown>): Promise<void> => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    getRoles: async (): Promise<string[]> => {
        const response = await api.get('/roles'); // Asegúrate de que este endpoint esté en tu backend
        return response.data;
    },
};

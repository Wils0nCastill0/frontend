import axios, {  InternalAxiosRequestConfig } from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

// Configuración base de la API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '1'  // Añadido para ngrok
  },
  // withCredentials: true  // Importante para CORS
});

// Interceptor de solicitudes
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  // Asegurarse de que el header de ngrok siempre esté presente
  config.headers.set('ngrok-skip-browser-warning', '1');
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);


// Interfaces de datos
interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
}

interface Sale {
  id?: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  paymentMethod: string;
  receivedAmount: number;
  notes?: string;
}

interface DashboardStats {
  dailySales: number;
  totalRevenue: number;
  averageTicket: number;
  topProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
}

// Define los tipos esperados para `user` y `token`
interface User {
  id: string;
  name: string;
  email: string;
  // Agrega más propiedades relevantes según el modelo de tu backend
}

interface LoginResponse {
  user: User;
  token: string;
}
// Interfaces actualizadas
interface RegisterResponse {
  status: string;
  data: {
    user: User;
  };
  message?: string;
}

// Servicios de autenticación
export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: Record<string, unknown>): Promise<User> => {
    try {
      const response = await api.post<RegisterResponse>('/auth/register', userData);
      
      // Verifica si la respuesta tiene la estructura esperada
      if (!response?.data?.data?.user) {
        throw new Error('Formato de respuesta inválido');
      }
      
      return response.data.data.user;
    } catch (error) {
      console.error('Error en registro:', error);
      
      if (error instanceof Error) {
        throw new Error(`Error en registro: ${error.message}`);
      }
      
      throw new Error('Error durante el registro');
    }
  }
};


// Servicios de productos actualizado
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data.data.products; // Ajustado según la estructura de respuesta
  },
  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data.data.product;
  },
  create: async (productData: Product): Promise<Product> => {
    const response = await api.post('/products', productData);
    return response.data.data.product;
  },
  update: async (id: string, productData: Product): Promise<Product> => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data.data.product;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
  updateStock: async (id: string, quantity: number, operation: 'add' | 'subtract'): Promise<Product> => {
    const response = await api.patch(`/products/${id}/stock`, { quantity, operation });
    return response.data.data.product;
  }
};
// Servicios de ventas
export const salesApi = {
  create: async (saleData: Sale): Promise<Sale> => {
    const response = await api.post('/sales', saleData);
    return response.data;
  },
  getAll: async (): Promise<Sale[]> => {
    const response = await api.get('/sales');
    return response.data;
  },
  getById: async (id: string): Promise<Sale> => {
    const response = await api.get(`/sales/${id}`);
    return response.data;
  },
  getDailyStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/sales/daily-stats');
    return response.data;
  },
};

// src/services/api.ts
export const apiFetchTopSellingProducts = async () => {
  // Datos ficticios
  return [
    { id: '1', name: 'Producto A', category: 'Categoría 1', unitsSold: 1200, revenue: 24000 },
    { id: '2', name: 'Producto B', category: 'Categoría 2', unitsSold: 900, revenue: 18000 },
    { id: '3', name: 'Producto C', category: 'Categoría 3', unitsSold: 700, revenue: 14000 },
    { id: '4', name: 'Producto D', category: 'Categoría 4', unitsSold: 500, revenue: 10000 },
    { id: '5', name: 'Producto E', category: 'Categoría 5', unitsSold: 400, revenue: 8000 },
  ];
};


export default api;

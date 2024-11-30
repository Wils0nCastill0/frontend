import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

// Configuración base de la API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '1', // Añadido para ngrok
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log('Headers enviados:', config.headers); // Debug opcional
    } else {
      // console.log('No token found in localStorage'); // Debug opcional
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en response:', error.response || error.message);
    // Si el token es inválido o expiró, forzar logout
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

// Interfaces de datos
// En src/services/api.ts
export interface Product {
  id: string; // Cambiar `id` a no opcional
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
}

export interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateSaleRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  notes?: string;
}

export interface Sale {
  id: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  paymentMethod: string;
  receivedAmount: number;
  notes?: string;
}

export interface DashboardStats {
  dailySales: number;
  totalRevenue: number;
  averageTicket: number;
  topProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
}

export interface User {
  role: string;
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  status: string;
  data: {
    user: User;
  };
  message?: string;
}

// Servicios de autenticación
export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<{ data: LoginResponse }>('/auth/login', {
        email,
        password,
      });

      const { token } = response.data.data;
      if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        // console.log('Token guardado:', token); // Debug opcional
      }

      return response.data.data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Error al iniciar sesión');
    }
  },

  register: async (userData: Record<string, unknown>): Promise<User> => {
    try {
      const response = await api.post<RegisterResponse>('/auth/register', userData);

      if (!response?.data?.data?.user) {
        throw new Error('Formato de respuesta inválido');
      }

      return response.data.data.user;
    } catch (error) {
      console.error('Error en registro:', error);
      throw new Error('Error durante el registro');
    }
  },
};

// Servicios de productos
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    
    if (!response.data?.data?.products || !Array.isArray(response.data.data.products)) {
      throw new Error('Los productos no están en formato de array');
    }
    
    return response.data.data.products;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get<{ data: { product: Product } }>(`/products/${id}`);
    return response.data.data.product;
  },

  getBySKU: async (sku: string): Promise<Product> => {
    const response = await api.get<{ data: { product: Product } }>(`/products/sku/${sku}`);
    return response.data.data.product;
  },

  create: async (productData: Product): Promise<Product> => {
    const response = await api.post<{ data: { product: Product } }>('/products', productData);
    return response.data.data.product;
  },

  update: async (id: string, productData: Product): Promise<Product> => {
    const response = await api.put<{ data: { product: Product } }>(`/products/${id}`, productData);
    return response.data.data.product;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  }
};

// Servicios de ventas
export const salesApi = {
  create: async (saleData: CreateSaleRequest): Promise<Sale> => {
    try {
      const response = await api.post<{ data: { sale: Sale } }>('/sales', saleData);
      return response.data.data.sale;
    } catch (error) {
      console.error('Error creating sale:', error);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Error en los datos de la venta');
      }
      throw new Error('Error al crear la venta');
    }
  },

  getAll: async (): Promise<Sale[]> => {
    const response = await api.get<{ data: Sale[] }>('/sales');
    return response.data.data;
  },

  getById: async (id: string): Promise<Sale> => {
    const response = await api.get<{ data: Sale }>(`/sales/${id}`);
    return response.data.data;
  },

  getDailyStats: async (): Promise<DashboardStats> => {
    const response = await api.get<{ data: DashboardStats }>('/sales/daily-stats');
    return response.data.data;
  },
};

export default api;
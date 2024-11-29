import api from '../services/api';

// interface User {
//     id: string;
//     name: string;
//     email: string;
//     role: 'admin' | 'cashier' | 'inventory_manager';
//     active: boolean;
// }

// interface RegisterData {
//     name: string;
//     email: string;
//     password: string;
//     role: 'admin' | 'cashier';
// }

// En auth.ts
export const authApi = {
    login: async (email: string, password: string) => {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    },
  
    register: async (userData: {
      name: string;
      email: string;
      password: string;
      role: string;
    }) => {
      try {
        console.log('Datos a enviar:', userData);
        const response = await api.post('/auth/register', userData);
        console.log('Respuesta completa:', response);
        return response.data;
      } catch (error) {
        console.error('Error en registro:', error);
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Error desconocido en el registro');
      }
    },
  
    getRoles: async () => {
      const response = await api.get('/roles');
      return response.data;
    }
  };
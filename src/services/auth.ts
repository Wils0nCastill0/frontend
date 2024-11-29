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
  /**
   * Handles user login and token management.
   * @param email - User's email.
   * @param password - User's password.
   * @returns Response data including user and token.
   */
  login: async (email: string, password: string) => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      const token = response.data.data.token;

      if (token) {
        // Store token in localStorage
        localStorage.setItem('token', token);

        // Set token in headers for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Add interceptor to ensure Authorization header is always set
        api.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        });
      }

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Handles user logout by removing the token and resetting the Authorization header.
   */
  logout: () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    delete api.defaults.headers.common['Authorization']; // Remove token from headers
    window.location.href = '/login'; // Redirect to login page
  },

  /**
   * Checks if the user is authenticated by validating the token.
   * @returns True if the token is valid, otherwise false.
   */
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      const expTime = payload.exp * 1000; // Convert expiration time to milliseconds
      return expTime > Date.now(); // Token is valid if expiration time is in the future
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  },

  /**
   * Retrieves the current authentication token.
   * @returns The stored token, or null if none exists.
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Refreshes Authorization headers with the current token from localStorage.
   */
  refreshAuthHeaders: () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },
};

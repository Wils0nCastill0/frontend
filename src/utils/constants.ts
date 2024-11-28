// Roles de usuario
export const USER_ROLES = {
    ADMIN: 'admin',
    CASHIER: 'cashier',
    INVENTORY_MANAGER: 'inventory_manager'
  } as const;
  
  // Estados de venta
  export const SALE_STATUS = {
    COMPLETED: 'completed',
    PENDING: 'pending',
    CANCELLED: 'cancelled'
  } as const;
  
  // Categorías de productos
  export const PRODUCT_CATEGORIES = [
    'Electrónicos',
    'Ropa',
    'Alimentos',
    'Bebidas',
    'Hogar',
    'Otros'
  ] as const;
  
  // Configuración de paginación
  export const PAGINATION_CONFIG = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    LIMITS: [5, 10, 25, 50, 100]
  } as const;
  
  // Mensajes de error
  export const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    NETWORK_ERROR: 'Error de conexión. Por favor, intenta más tarde',
    SESSION_EXPIRED: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente',
    INSUFFICIENT_STOCK: 'Stock insuficiente',
    INVALID_QUANTITY: 'Cantidad inválida',
    INVALID_PRICE: 'Precio inválido',
    REQUIRED_FIELD: 'Este campo es requerido',
    INVALID_EMAIL: 'Email inválido',
    INVALID_PASSWORD: 'Contraseña inválida',
    INVALID_PHONE: 'Número de teléfono inválido',
    INVALID_RUT: 'RUT inválido',
    SERVER_ERROR: 'Error en el servidor'
  } as const;
  
  // Mensajes de éxito
  export const SUCCESS_MESSAGES = {
    SALE_COMPLETED: 'Venta realizada con éxito',
    PRODUCT_CREATED: 'Producto creado exitosamente',
    PRODUCT_UPDATED: 'Producto actualizado exitosamente',
    PRODUCT_DELETED: 'Producto eliminado exitosamente',
    LOGIN_SUCCESS: 'Inicio de sesión exitoso',
    LOGOUT_SUCCESS: 'Sesión cerrada exitosamente',
    SAVE_SUCCESS: 'Guardado exitosamente'
  } as const;
  
  // Configuración de caché
  export const CACHE_CONFIG = {
    TTL: 5 * 60 * 1000, // 5 minutos en milisegundos
    PREFIX: 'sgc_cache:'
  } as const;
  
  // Configuración de tema
  export const THEME_CONFIG = {
    COLORS: {
      primary: 'blue.500',
      secondary: 'purple.500',
      success: 'green.500',
      warning: 'yellow.500',
      danger: 'red.500',
      info: 'blue.400'
    },
    FONTS: {
      body: 'Inter, system-ui, sans-serif',
      heading: 'Inter, system-ui, sans-serif'
    }
  } as const;
  
  // URLs de la API
  export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile'
    },
    PRODUCTS: {
      BASE: '/products',
      DETAIL: (id: string) => `/products/${id}`,
      STOCK: (id: string) => `/products/${id}/stock`
    },
    SALES: {
      BASE: '/sales',
      DETAIL: (id: string) => `/sales/${id}`,
      CANCEL: (id: string) => `/sales/${id}/cancel`,
      REPORTS: '/sales/reports'
    },
    USERS: {
      BASE: '/users',
      DETAIL: (id: string) => `/users/${id}`
    }
  } as const;
  
  // Configuración de almacenamiento local
  export const STORAGE_KEYS = {
    TOKEN: 'sgc_token',
    USER: 'sgc_user',
    THEME: 'sgc_theme',
    SETTINGS: 'sgc_settings'
  } as const;
  
  // Limitaciones y validaciones
  export const VALIDATION_RULES = {
    MIN_PASSWORD_LENGTH: 8,
    MAX_PRODUCT_NAME_LENGTH: 100,
    MIN_PRODUCT_NAME_LENGTH: 3,
    MAX_PRICE: 99999999,
    MIN_PRICE: 0,
    MAX_DISCOUNT: 100,
    MIN_DISCOUNT: 0,
    MAX_QUANTITY: 9999,
    MIN_QUANTITY: 1
  } as const;
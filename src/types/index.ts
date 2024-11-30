// User types
// export interface User {
//     id: string;
//     name: string;
//     email: string;
//     role?: string; // Agrega role como obligatorio;
//     isActive: boolean;
//   }
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cashier' | 'inventory_manager';
  active: boolean;
}

  // Product types
  export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    sku: string;
    minimumStock?: number;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface CreateProductDTO {
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    sku: string;
    minimumStock?: number;
  }
  
  // Sale types
  export interface SaleItem {
    productId: number;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    product?: Product;
  }
  
  export interface Sale {
    id: string;
    items: SaleItem[];
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    userId: string;
    user?: User;
    notes?: string;
    createdAt: string;
  }
  
  export interface CreateSaleDTO {
    items: {
      productId: string;
      quantity: number;
    }[];
    notes?: string;
  }
  
  // Cart types for POS
  export interface CartItem extends SaleItem {
    product: Product;
  }
  
  // API Response types
  export interface ApiResponse<T> {
    status: 'success' | 'error';
    data: T;
    message?: string;
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    totalPages: number;
  }
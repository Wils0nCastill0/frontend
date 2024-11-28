import { useState, useEffect } from 'react';
import { Product } from '../types';

const fakeProducts: Product[] = [
  {
    id: 1,
    name: 'Coca Cola 2L',
    price: 25,
    stock: 100,
    category: 'Bebidas',
    sku: 'CC-2L',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Pan Molde',
    price: 12,
    stock: 50,
    category: 'Panadería',
    sku: 'PM-01',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Leche',
    price: 15,
    stock: 30,
    category: 'Lácteos',
    sku: 'LK-500',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Simulamos un retraso
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProducts(fakeProducts);
    };

    fetchProducts();
  }, []);

  return { products };
};

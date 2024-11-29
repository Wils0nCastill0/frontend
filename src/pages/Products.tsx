import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  useToast,
} from '@chakra-ui/react';

// Define la estructura del producto
interface Product {
  id: string; // Asegúrate de que 'id' sea el tipo correcto según el backend
  name: string;
  price: number;
}

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]); // Ahora es un array de productos
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3009/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: Product[] = await response.json(); // Define explícitamente el tipo de datos
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3009/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price: parseFloat(price) }),
      });
      if (response.ok) {
        toast({ title: 'Producto agregado', status: 'success' });
        fetchProducts();
      } else {
        toast({ title: 'No se pudo agregar el producto', status: 'error' });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Box>
      <Input
        placeholder="Nombre del Producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        mb={2}
      />
      <Input
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        mb={2}
      />
      <Button onClick={addProduct} mb={4}>
        Agregar Producto
      </Button>

      <Table>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Precio</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>${product.price.toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

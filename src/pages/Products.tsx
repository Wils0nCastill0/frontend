import  { useEffect, useState } from 'react';
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

export const Products = () => {
  const [products, setProducts] = useState([]);
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
      const data = await response.json();
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
        toast({ title: 'Product added', status: 'success' });
        fetchProducts();
      } else {
        toast({ title: 'Failed to add product', status: 'error' });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Box>
      <Input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button onClick={addProduct}>Add Product</Button>

      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

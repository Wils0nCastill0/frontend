import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Badge,
  Button,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsApi } from '../services/api';
import { Product } from '../types';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID del producto desde la URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await productsApi.getById(id as string);
        setProduct(response);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <Spinner size="xl" />
        <Text mt={2}>Cargando producto...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={6} color="red.500">
        <Text>{error}</Text>
        <Button mt={4} onClick={() => navigate('/inventory')}>
          Volver al Inventario
        </Button>
      </Box>
    );
  }

  return (
    <Flex direction="column" p={6}>
      <Heading size="lg" mb={6}>
        Detalles del Producto
      </Heading>
      <Box bg="white" p={6} shadow="sm" borderRadius="md" border="1px solid" borderColor="gray.200">
        <Text fontWeight="bold">Código:</Text>
        <Text>{product?.sku}</Text>
        <Text fontWeight="bold" mt={4}>Nombre:</Text>
        <Text>{product?.name}</Text>
        <Text fontWeight="bold" mt={4}>Categoría:</Text>
        <Text>{product?.category}</Text>
        <Text fontWeight="bold" mt={4}>Stock:</Text>
        <Text>
          {product?.stock} 
          <Badge colorScheme={product?.stock > 0 ? 'green' : 'red'} ml={2}>
            {product?.stock > 0 ? 'Disponible' : 'Agotado'}
          </Badge>
        </Text>
        <Text fontWeight="bold" mt={4}>Precio:</Text>
        <Text>${product?.price.toLocaleString()}</Text>
      </Box>
      <Button mt={6} colorScheme="blue" onClick={() => navigate('/inventory')}>
        Volver al Inventario
      </Button>
    </Flex>
  );
};

export default ProductDetails;

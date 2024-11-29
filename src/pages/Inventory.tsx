import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar';
import { Navbar } from '../components/layout/Navbar';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ProductModal from '../components/products/ProductModal'; // Importamos el modal
import { Product, productsApi } from '../services/api';

interface TransformedProduct extends Product {
  code: string;
  status: string;
}

const Inventory: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const [products, setProducts] = useState<TransformedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await productsApi.getAll();
        const transformedProducts = response.map((product) => ({
          ...product,
          code: product.sku, // Mapear `sku` a `code`
          status: product.stock > 0 ? 'Activo' : 'Inactivo', // Derivar `status`
        }));
        setProducts(transformedProducts);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar el inventario');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Flex height="100vh">
      <CollapsibleSidebar isOpen={isOpen} onToggle={onToggle} />
      <Box flex="1" ml={isOpen ? '240px' : '60px'} transition="margin-left 0.3s">
        <Navbar onMenuClick={onToggle} userName="Bruno" />
        <Box p={6}>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg">Inventario</Heading>
            <Flex gap={2}>
              <Button
                variant="outline"
                onClick={() => navigate('/mass-import')}
                colorScheme="blue"
              >
                Importar
              </Button>
              <Button colorScheme="blue" onClick={openModal}>
                Nuevo Producto
              </Button>
            </Flex>
          </Flex>
          {loading && (
            <Box textAlign="center" mt={6}>
              <Spinner size="xl" />
              <Text mt={2}>Cargando inventario...</Text>
            </Box>
          )}
          {error && (
            <Box textAlign="center" mt={6} color="red.500">
              <Text>{error}</Text>
            </Box>
          )}
          {!loading && !error && (
            <Box
              bg="white"
              shadow="sm"
              borderRadius="md"
              p={6}
              border="1px solid"
              borderColor="gray.200"
            >
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>CÓDIGO</Th>
                    <Th>PRODUCTO</Th>
                    <Th>CATEGORÍA</Th>
                    <Th isNumeric>STOCK</Th>
                    <Th isNumeric>PRECIO</Th>
                    <Th>ESTADO</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product) => (
                    <Tr key={product.code}
                        onClick={() => navigate(`/products/${product.code}`)} // Redirige al detalle
                        cursor="pointer"
                        _hover={{ bg: 'gray.100' }}
                        >
                      <Td>{product.code}</Td>
                      <Td>{product.name}</Td>
                      <Td>{product.category}</Td>
                      <Td isNumeric color={product.stock < 10 ? 'red.500' : 'black'}>
                        {product.stock}
                      </Td>
                      <Td isNumeric>${product.price.toLocaleString()}</Td>
                      <Td>
                        <Badge
                          colorScheme={product.status === 'Activo' ? 'green' : 'red'}
                          variant="subtle"
                        >
                          {product.status}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Text mt={4} color="gray.500" fontSize="sm">
                Mostrando {products.length} productos
              </Text>
            </Box>
          )}
        </Box>
      </Box>

      {/* Modal de Producto */}
      <ProductModal
  isOpen={isModalOpen}
  onClose={closeModal}
  onProductCreated={(newProduct) => {
    setProducts((prev) => [...prev, { ...newProduct, code: newProduct.sku, status: 'Activo' }]);
  }}
/>

    </Flex>
  );
};

export default Inventory;

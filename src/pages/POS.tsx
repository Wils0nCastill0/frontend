// src/pages/POS.tsx
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Text,
  useDisclosure,
  Input,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import { productsApi, salesApi } from '../services/api';
import { Product } from '../types';
import { PaymentModal } from '../components/pos/PaymentModal';
import SearchProductModal from '../components/products/SearchProductModal';
import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar';
import { Navbar } from '../components/layout/Navbar';


export const POS = () => {
  const { cartItems, total, addToCart, clearCart, removeItem } = useCart(); // Hook para manejar el carrito
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal de pago
  const searchModal = useDisclosure(); // Modal de búsqueda
  const [products, setProducts] = useState<Product[]>([]); // Lista de productos
  const [searchQuery, setSearchQuery] = useState(''); // Consulta de búsqueda
  const [loading, setLoading] = useState(false); // Cargando productos
  const [error, setError] = useState<string | null>(null); // Manejo de errores
  const [isProcessing, setIsProcessing] = useState(false); // Estado de procesamiento de pago
  const toast = useToast(); // Notificaciones

  useEffect(() => {
    // Cargar productos al montar el componente
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const apiProducts = await productsApi.getAll();
            setProducts(apiProducts.map(p => ({
                ...p,
                id: p.id || ''
            })));
        } catch (error) {
            console.error('Error al cargar productos:', error);
            setError(error instanceof Error ? error.message : 'Error desconocido');
            toast({
                title: 'Error',
                description: 'No se pudieron cargar los productos',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
}, []); // Empty dependency array for component mount only

  const totalWithVAT = Math.round(total * 1.19);

  const handleCompleteSale = async () => {
    // Completar la venta
    setIsProcessing(true);
    try {
      // Validar stock
      for (const item of cartItems) {
        const product = await productsApi.getById(item.product.id);
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }
      }

      const saleData = {
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        notes: undefined, // Avoid sending an empty string
      };

      await salesApi.create(saleData);
      clearCart();
      toast({
        title: 'Venta registrada',
        description: 'La venta se completó exitosamente.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Close the payment modal after successful sale
    } catch (err) {
      console.error('Error al completar la venta:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'No se pudo completar la venta.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSearchProduct = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setLoading(true);
      try {
        const product = await productsApi.getBySKU(searchQuery.trim());
        addToCart({ ...product, id: product.id || '' });
        setSearchQuery('');
      } catch (error) {
        console.error('Error al buscar producto:', error);
        toast({
          title: 'Error',
          description: 'Producto no encontrado',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredProducts = products.filter(
    (product) => product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Flex height="100vh">
      <CollapsibleSidebar isOpen={searchModal.isOpen} onToggle={searchModal.onClose} />

      <Flex flex="1" direction="column" ml="60px">
        <Navbar onMenuClick={searchModal.onToggle} userName="" />

        <Flex direction="column" flex="1" bg="gray.50" p={4}>
          <Heading size="lg" mb={4}>
            Punto de Venta
          </Heading>

          {loading ? (
            <Flex justify="center" align="center" height="50vh">
              <Spinner size="xl" />
            </Flex>
          ) : error ? (
            <Text color="red.500" textAlign="center" mt={4}>
              {error}
            </Text>
          ) : (
            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} flex="1">
              <GridItem bg="white" rounded="md" shadow="sm" p={4}>
                <Input
                  placeholder="Buscar productos por SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchProduct}
                  mb={4}
                />
                {searchQuery && (
                  <Table variant="striped">
                    <Thead>
                      <Tr>
                        <Th>SKU</Th>
                        <Th>Producto</Th>
                        <Th isNumeric>Precio</Th>
                        <Th isNumeric>Stock</Th>
                        <Th>Acción</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredProducts.map((product) => (
                        <Tr key={product.id}>
                          <Td>{product.sku}</Td>
                          <Td>{product.name}</Td>
                          <Td isNumeric>${product.price}</Td>
                          <Td isNumeric>{product.stock}</Td>
                          <Td>
                            <Button size="sm" onClick={() => addToCart({ ...product, id: product.id || '' })}>
                              Añadir
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}
              </GridItem>
              <GridItem>
                <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                  <GridItem>
                    <Heading size="md" mb={4}>
                      Carrito
                    </Heading>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Producto</Th>
                          <Th isNumeric>Cantidad</Th>
                          <Th isNumeric>Precio</Th>
                          <Th>Acción</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {cartItems.map((item) => (
                          <Tr key={item.productId}>
                            <Td>{item.product.name}</Td>
                            <Td isNumeric>{item.quantity}</Td>
                            <Td isNumeric>${Math.round(item.unitPrice * item.quantity)}</Td>
                            <Td>
                              <Button size="sm" colorScheme="red" onClick={() => removeItem(item.productId)}>
                                Eliminar
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                    <Text fontWeight="bold" mt={4}>
                      Total: ${totalWithVAT}
                    </Text>
                    <Button
                      colorScheme="blue"
                      size="lg"
                      width="full"
                      onClick={onOpen}
                      isLoading={isProcessing}
                      disabled={!cartItems.length || isProcessing}
                      mt={4}
                    >
                      Procesar Pago
                    </Button>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          )}

          <PaymentModal
            isOpen={isOpen}
            onClose={onClose}
            onComplete={handleCompleteSale}
            total={totalWithVAT}
          />
          <SearchProductModal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            products={products}
            onSelectProduct={addToCart}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

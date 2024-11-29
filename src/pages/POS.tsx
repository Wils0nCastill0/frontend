// src/pages/POS.tsx
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useCart } from '../hooks/useCart';
import { PaymentModal } from '../components/pos/PaymentModal';
import SearchProductModal from '../components/products/SearchProductModal';

export const POS = () => {
  const { cartItems, total, addItemToCart } = useCart(); // Hook para manejar el carrito
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control del modal de pago
  const searchModal = useDisclosure(); // Control del modal de búsqueda de producto

  // Productos ficticios
  const products = [
    { id: '001', name: 'Coca Cola 2L', stock: 24, price: 2500 },
    { id: '002', name: 'Sprite 2L', stock: 18, price: 2500 },
  ];

  const handleSelectProduct = (product: any) => {
    addItemToCart(product); // Agregar el producto seleccionado al carrito
    searchModal.onClose(); // Cerrar el modal de búsqueda
  };

  return (
    <Flex height="100vh" direction="column" bg="gray.50" p={4}>
      {/* Título */}
      <Heading size="lg" mb={4}>
        Punto de Venta
      </Heading>

      {/* Layout Principal */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} flex="1" overflow="hidden">
        {/* Sección Izquierda */}
        <GridItem
          bg="white"
          rounded="md"
          shadow="sm"
          p={4}
          overflowY="auto"
          height="calc(100vh - 120px)"
        >
          <Flex mb={4} justify="space-between">
            <Input
              placeholder="Buscar producto o escanear código (F2)"
              size="lg"
            />
            <Button colorScheme="blue" ml={4} onClick={searchModal.onOpen}>
              Buscar Producto
            </Button>
          </Flex>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>CÓDIGO</Th>
                <Th>PRODUCTO</Th>
                <Th isNumeric>PRECIO</Th>
                <Th isNumeric>CANT.</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cartItems.map((item) => (
                <Tr key={item.productId}>
                  <Td>{item.product.sku || 'N/A'}</Td>
                  <Td>{item.product.name}</Td>
                  <Td isNumeric>${item.unitPrice.toLocaleString()}</Td>
                  <Td isNumeric>{item.quantity}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </GridItem>

        {/* Sección Derecha */}
        <GridItem
          bg="white"
          rounded="md"
          shadow="sm"
          p={4}
          overflowY="auto"
          height="calc(100vh - 120px)"
        >
          <Heading size="md" mb={4}>
            VENTA ACTUAL
          </Heading>
          <Box mb={4}>
            <Flex justify="space-between" mb={2}>
              <Text>Subtotal</Text>
              <Text>${(total * 0.81).toFixed(2)}</Text>
            </Flex>
            <Flex justify="space-between" mb={2}>
              <Text>IVA (19%)</Text>
              <Text>${(total * 0.19).toFixed(2)}</Text>
            </Flex>
            <Flex justify="space-between" fontWeight="bold" mb={4}>
              <Text>TOTAL</Text>
              <Text>${total.toLocaleString()}</Text>
            </Flex>
          </Box>
          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={onOpen} // Abre el modal de pago al hacer clic
          >
            PROCESAR PAGO (F12)
          </Button>
        </GridItem>
      </Grid>

      {/* Atajos de teclado */}
      <Box mt={4} textAlign="center" fontSize="sm" color="gray.500">
        F1: Nueva venta | F2: Buscar | F3: Cliente | F4: Descuento | F11:
        Suspender | F12: Pago | ESC: Cancelar
      </Box>

      {/* Modal de Pago */}
      <PaymentModal isOpen={isOpen} onClose={onClose} total={total} />

      {/* Modal de Búsqueda de Producto */}
      <SearchProductModal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSelectProduct={handleSelectProduct}
        products={products}
      />
    </Flex>
  );
};

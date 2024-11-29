// src/pages/POS.tsx
import {
  Box,
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
} from '@chakra-ui/react';
import { useCart } from '../hooks/useCart';
import { PaymentModal } from '../components/pos/PaymentModal';
import SearchProductModal from '../components/products/SearchProductModal';
import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar';
import { Navbar } from '../components/layout/Navbar';
import { useState } from 'react';

export const POS = () => {
  const { cartItems, total, addToCart } = useCart(); // Hook para manejar el carrito
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control del modal de pago
  const { isOpen: isSidebarOpen, onToggle: onSidebarToggle } = useDisclosure(); // Control de la barra lateral
  const searchModal = useDisclosure(); // Control del modal de búsqueda de producto
  const [barcodeInput, setBarcodeInput] = useState(''); // Estado para el cuadro de texto de código de barras

  // Productos ficticios registrados
  const products = [
    { id: '001', name: 'Coca Cola 2L', stock: 24, price: 2500, sku: '123456' },
    { id: '002', name: 'Sprite 2L', stock: 18, price: 2500, sku: '789012' },
    { id: '003', name: 'Fanta 2L', stock: 10, price: 2400, sku: '345678' },
  ];

  // Manejar la entrada del código de barras
  const handleBarcodeSubmit = () => {
    if (!barcodeInput.trim()) return;

    const match = barcodeInput.match(/^(\d+)\*(\d+)$/); // Verificar formato "cantidad*código"
    let quantity = 1;
    let code = barcodeInput;

    if (match) {
      quantity = parseInt(match[1], 10);
      code = match[2];
    }

    const product = products.find((p) => p.sku === code); // Comparar código con `sku`

    if (product) {
      // Agregar el producto al carrito con la cantidad especificada
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    } else {
      alert(`El producto con código ${code} no fue encontrado.`);
    }

    setBarcodeInput(''); // Limpiar el campo de entrada
  };

  return (
    <Flex height="100vh">
      {/* Barra lateral */}
      <CollapsibleSidebar isOpen={isSidebarOpen} onToggle={onSidebarToggle} />

      {/* Contenido principal */}
      <Flex flex="1" direction="column" ml={isSidebarOpen ? '240px' : '60px'}>
        {/* Navbar */}
        <Navbar onMenuClick={onSidebarToggle} userName={''} />

        {/* Layout Principal */}
        <Flex direction="column" flex="1" bg="gray.50" p={4}>
          {/* Título */}
          <Heading size="lg" mb={4}>
            Punto de Venta
          </Heading>

          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} flex="1">
            {/* Sección Izquierda */}
            <GridItem
              bg="white"
              rounded="md"
              shadow="sm"
              p={4}
              overflowY="auto"
              height="calc(100vh - 200px)"
            >
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
            <GridItem>
              <Flex height="100%" direction="column" align="stretch" gap={4}>
                <Box
                  bg="white"
                  rounded="md"
                  shadow="sm"
                  p={4}
                  overflowY="auto"
                  height="250px"
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
                    onClick={onOpen}
                  >
                    PROCESAR PAGO (F12)
                  </Button>
                </Box>

                {/* Cuadro de entrada de código de barras */}
                <Box bg="white" p={4} rounded="md" shadow="sm">
                  <Input
                    placeholder="Ingresar código de barras (ej: 3*123456 para 3 unidades)"
                    size="lg"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleBarcodeSubmit();
                    }}
                  />
                </Box>
              </Flex>
            </GridItem>
          </Grid>

          {/* Modal de Pago */}
          <PaymentModal isOpen={isOpen} onClose={onClose} total={total} />

          {/* Modal de Búsqueda de Producto */}
          <SearchProductModal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSelectProduct={(product) => addToCart(product)}
            products={products}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

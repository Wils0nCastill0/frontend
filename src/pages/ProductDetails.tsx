import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Badge,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react';
  import { Line } from 'react-chartjs-2';
  
  const ProductDetails = () => {
    const product = {
      name: 'Coca Cola 2L',
      code: '001',
      barcode: '7801234567890',
      status: 'Activo',
      category: 'Bebidas',
      brand: 'Coca Cola',
      purchasePrice: 1800,
      salePrice: 2500,
      margin: '28%',
      stock: 24,
      minStock: 20,
      lastRestock: '25/11/2024',
      salesData: [10, 20, 15, 25, 30, 40],
      movements: [
        { date: '27/11/24', type: 'Venta', quantity: -2 },
      ],
    };
  
    const salesChartData = {
      labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6'],
      datasets: [
        {
          label: 'Ventas',
          data: product.salesData,
          borderColor: 'blue',
          fill: false,
        },
      ],
    };
  
    return (
      <Box p={6}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg">Detalle de Producto</Heading>
          <Flex gap={2}>
            <Button colorScheme="blue">Editar</Button>
            <Button colorScheme="red">Eliminar</Button>
          </Flex>
        </Flex>
  
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
          <Box
            bg="white"
            shadow="sm"
            borderRadius="md"
            p={6}
            border="1px solid"
            borderColor="gray.200"
          >
            <Heading size="md" mb={4}>
              {product.name}
            </Heading>
            <Text>Código: {product.code}</Text>
            <Text>Barras: {product.barcode}</Text>
            <Badge colorScheme="green">{product.status}</Badge>
            <Text>Categoría: {product.category}</Text>
            <Text>Marca: {product.brand}</Text>
          </Box>
          <Box
            bg="white"
            shadow="sm"
            borderRadius="md"
            p={6}
            border="1px solid"
            borderColor="gray.200"
          >
            <Heading size="md" mb={4}>
              Stock
            </Heading>
            <Text>Stock Actual: {product.stock}</Text>
            <Text>Stock Mínimo: {product.minStock}</Text>
            <Text>Última Reposición: {product.lastRestock}</Text>
          </Box>
          <Box
            bg="white"
            shadow="sm"
            borderRadius="md"
            p={6}
            border="1px solid"
            borderColor="gray.200"
          >
            <Heading size="md" mb={4}>
              Precios
            </Heading>
            <Text>Precio de Compra: ${product.purchasePrice}</Text>
            <Text>Precio de Venta: ${product.salePrice}</Text>
            <Text>Margen: {product.margin}</Text>
          </Box>
        </SimpleGrid>
  
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box
            bg="white"
            shadow="sm"
            borderRadius="md"
            p={6}
            border="1px solid"
            borderColor="gray.200"
          >
            <Heading size="md" mb={4}>
              Análisis de Ventas
            </Heading>
            <Line data={salesChartData} />
          </Box>
          <Box
            bg="white"
            shadow="sm"
            borderRadius="md"
            p={6}
            border="1px solid"
            borderColor="gray.200"
          >
            <Heading size="md" mb={4}>
              Movimientos
            </Heading>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Fecha</Th>
                  <Th>Tipo</Th>
                  <Th isNumeric>Cantidad</Th>
                </Tr>
              </Thead>
              <Tbody>
                {product.movements.map((movement, index) => (
                  <Tr key={index}>
                    <Td>{movement.date}</Td>
                    <Td>{movement.type}</Td>
                    <Td isNumeric>{movement.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </SimpleGrid>
      </Box>
    );
  };
  
  export default ProductDetails;
  
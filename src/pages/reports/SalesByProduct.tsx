import React from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    SimpleGrid,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Progress,
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../../components/layout/CollapsibleSidebar';
    import { Navbar } from '../../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';

    const SalesByProduct: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();

    // Datos ficticios
    const salesData = [
        {
        product: 'Coca Cola 2L',
        quantity: 245,
        sales: 612500,
        percentage: '15.2%',
        },
    ];

    const topProducts = [
        { product: 'Coca Cola 2L', percentage: '15.2%' },
        { product: 'Pan Molde', percentage: '12.1%' },
    ];

    return (
        <Flex height="100vh">
        {/* Barra lateral */}
        <CollapsibleSidebar isOpen={isOpen} onToggle={onToggle} />

        {/* Contenido principal */}
        <Box flex="1" ml={isOpen ? '240px' : '60px'} transition="margin-left 0.3s">
            {/* Barra superior */}
            <Navbar onMenuClick={onToggle} />
            <Box p={6}>
            {/* Encabezado */}
            <Flex justify="space-between" align="center" mb={6}>
                <Heading size="lg">Ventas por Producto</Heading>
                <Button colorScheme="blue">Excel</Button>
            </Flex>

            {/* Filtros */}
            <Flex gap={4} mb={6}>
                <Select placeholder="Último mes">
                <option value="last-month">Último mes</option>
                <option value="last-quarter">Último trimestre</option>
                <option value="last-year">Último año</option>
                </Select>
                <Select placeholder="Categoría">
                <option value="category-1">Bebidas</option>
                <option value="category-2">Abarrotes</option>
                <option value="category-3">Panadería</option>
                </Select>
                <Select placeholder="Ventas mínimas">
                <option value="sales-1000">Más de $1,000</option>
                <option value="sales-10000">Más de $10,000</option>
                </Select>
            </Flex>

            {/* Tabla y análisis */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {/* Tabla */}
                <Box
                bg="white"
                shadow="sm"
                borderRadius="md"
                p={6}
                border="1px solid"
                borderColor="gray.200"
                >
                <Table variant="simple">
                    <Thead>
                    <Tr>
                        <Th>Producto</Th>
                        <Th isNumeric>Cantidad</Th>
                        <Th isNumeric>Ventas</Th>
                        <Th isNumeric>% del Total</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {salesData.map((data, index) => (
                        <Tr key={index}>
                        <Td>{data.product}</Td>
                        <Td isNumeric>{data.quantity}</Td>
                        <Td isNumeric>${data.sales.toLocaleString()}</Td>
                        <Td isNumeric>{data.percentage}</Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
                </Box>

                {/* Análisis de ventas */}
                <Box>
                {/* Top productos */}
                <Box
                    bg="white"
                    shadow="sm"
                    borderRadius="md"
                    p={6}
                    border="1px solid"
                    borderColor="gray.200"
                    mb={6}
                >
                    <Heading size="md" mb={4}>
                    Top 10 Productos
                    </Heading>
                    {topProducts.map((product, index) => (
                    <Flex key={index} align="center" mb={4}>
                        <Text flex="1">{product.product}</Text>
                        <Progress
                        value={parseFloat(product.percentage)}
                        flex="2"
                        colorScheme="blue"
                        size="sm"
                        mr={2}
                        />
                        <Text>{product.percentage}</Text>
                    </Flex>
                    ))}
                </Box>

                {/* Tendencia del producto */}
                <Box
                    bg="white"
                    shadow="sm"
                    borderRadius="md"
                    p={6}
                    border="1px solid"
                    borderColor="gray.200"
                >
                    <Heading size="md" mb={4}>
                    Tendencia del Producto
                    </Heading>
                    <Box bg="gray.100" height="200px" borderRadius="md"></Box>
                </Box>
                </Box>
            </SimpleGrid>
            </Box>
        </Box>
        </Flex>
    );
};

export default SalesByProduct;

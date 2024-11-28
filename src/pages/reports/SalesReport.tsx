import React from 'react';
import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Select,
    Button,
    Text,
    Grid,
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../../components/layout/CollapsibleSidebar';
    import { Navbar } from '../../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';

    const SalesReport: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();

    // Datos ficticios
    const metrics = [
        {
        title: 'Total Ventas',
        value: '$1,524,300',
        change: '+12.5% vs mes anterior',
        color: 'green.500',
        },
        {
        title: 'Ticket Promedio',
        value: '$12,450',
        change: '+5.2% vs mes anterior',
        color: 'green.500',
        },
        {
        title: 'Total Transacciones',
        value: '1,245',
        change: '↓ 3.1% vs mes anterior',
        color: 'red.500',
        },
        {
        title: 'Promedio Diario',
        value: '$58,400',
        change: '+8.3% vs mes anterior',
        color: 'green.500',
        },
    ];

    const topProducts = [
        { name: 'Coca Cola 2L', units: 245 },
        { name: 'Pan Molde', units: 180 },
        { name: 'Leche', units: 156 },
    ];

    const paymentMethods = [
        { method: 'Efectivo', percentage: '45%' },
        { method: 'Débito', percentage: '35%' },
        { method: 'Crédito', percentage: '20%' },
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
                <Heading size="lg">Reporte de Ventas</Heading>
                <Flex gap={4}>
                <Select placeholder="Categoría" width="200px">
                    <option value="all">Todas</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="alimentos">Alimentos</option>
                </Select>
                <Select placeholder="Método de pago" width="200px">
                    <option value="cash">Efectivo</option>
                    <option value="debit">Débito</option>
                    <option value="credit">Crédito</option>
                </Select>
                <Button colorScheme="blue" variant="outline">
                    Excel
                </Button>
                <Button colorScheme="blue" variant="outline">
                    PDF
                </Button>
                </Flex>
            </Flex>

            {/* Métricas principales */}
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={6}>
                {metrics.map((metric, index) => (
                <Box
                    key={index}
                    bg="white"
                    shadow="sm"
                    borderRadius="md"
                    p={6}
                    border="1px solid"
                    borderColor="gray.200"
                >
                    <Text fontWeight="bold" mb={2}>
                    {metric.title}
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold">
                    {metric.value}
                    </Text>
                    <Text color={metric.color} fontSize="sm">
                    {metric.change}
                    </Text>
                </Box>
                ))}
            </SimpleGrid>

            {/* Gráficos y tablas */}
            <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6}>
                {/* Gráfico de Ventas por Día */}
                <Box
                bg="white"
                shadow="sm"
                borderRadius="md"
                p={6}
                border="1px solid"
                borderColor="gray.200"
                >
                <Heading size="md" mb={4}>
                    Ventas por Día
                </Heading>
                <Box bg="gray.100" height="300px" borderRadius="md" />
                </Box>

                {/* Productos Más Vendidos y Métodos de Pago */}
                <Box>
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
                    Productos Más Vendidos
                    </Heading>
                    {topProducts.map((product, index) => (
                    <Flex
                        key={index}
                        justify="space-between"
                        align="center"
                        mb={2}
                    >
                        <Text>{index + 1}. {product.name}</Text>
                        <Text fontWeight="bold">{product.units} unid.</Text>
                    </Flex>
                    ))}
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
                    Métodos de Pago
                    </Heading>
                    {paymentMethods.map((method, index) => (
                    <Flex
                        key={index}
                        justify="space-between"
                        align="center"
                        mb={2}
                    >
                        <Text>{method.method}</Text>
                        <Text fontWeight="bold">{method.percentage}</Text>
                    </Flex>
                    ))}
                </Box>
                </Box>
            </Grid>
            </Box>
        </Box>
        </Flex>
    );
};

export default SalesReport;

import React from 'react';
import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Select,
    Button,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../../components/layout/CollapsibleSidebar';
    import { Navbar } from '../../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';

    const InventoryReport: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();

    // Datos ficticios
    const metrics = [
        { title: 'Total Productos', value: '1,245' },
        { title: 'Valor Total', value: '$15,245,300' },
        { title: 'Stock Bajo', value: '8', color: 'red.500' },
        { title: 'Sin Stock', value: '2', color: 'red.500' },
    ];

    const inventoryData = [
        {
        category: 'Bebidas',
        products: 245,
        value: '$3,245,600',
        lowStock: 2,
        },
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
                <Heading size="lg">Reporte de Inventario</Heading>
                <Flex gap={4}>
                <Select placeholder="Categoría" width="200px" />
                <Select placeholder="Estado" width="200px" />
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
                    <Text fontSize="2xl" fontWeight="bold" color={metric.color || 'black'}>
                    {metric.value}
                    </Text>
                </Box>
                ))}
            </SimpleGrid>

            {/* Tabla de Inventario */}
            <Box
                bg="white"
                shadow="sm"
                borderRadius="md"
                p={6}
                border="1px solid"
                borderColor="gray.200"
            >
                <Heading size="md" mb={4}>
                Estado de Inventario por Categoría
                </Heading>
                <Table variant="striped" colorScheme="gray">
                <Thead>
                    <Tr>
                    <Th>Categoría</Th>
                    <Th>Productos</Th>
                    <Th>Valor</Th>
                    <Th>Stock Bajo</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {inventoryData.map((data, index) => (
                    <Tr key={index}>
                        <Td>{data.category}</Td>
                        <Td>{data.products}</Td>
                        <Td>{data.value}</Td>
                        <Td color="red.500">{data.lowStock}</Td>
                    </Tr>
                    ))}
                </Tbody>
                </Table>
            </Box>
            </Box>
        </Box>
        </Flex>
    );
};

export default InventoryReport;

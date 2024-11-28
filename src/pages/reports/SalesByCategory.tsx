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
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../../components/layout/CollapsibleSidebar';
    import { Navbar } from '../../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';
    import { Pie } from 'react-chartjs-2';
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

    ChartJS.register(ArcElement, Tooltip, Legend);

    const SalesByCategory: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();

    // Datos ficticios
    const salesData = [
        { category: 'Bebidas', sales: 5335855, vsPrevious: '+12.5%' },
        { category: 'Abarrotes', sales: 4268684, vsPrevious: '+8.2%' },
        { category: 'Panadería', sales: 3201513, vsPrevious: '-2.1%' },
    ];

    const chartData = {
        labels: salesData.map((data) => data.category),
        datasets: [
        {
            data: salesData.map((data) => data.sales),
            backgroundColor: ['#4C8BFE', '#6F42C1', '#FF6384'],
            borderWidth: 1,
        },
        ],
    };

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
                <Heading size="lg">Ventas por Categoría</Heading>
                <Button colorScheme="blue">Excel</Button>
            </Flex>

            {/* Filtros */}
            <Flex gap={4} mb={6}>
                <Select placeholder="Último mes">
                <option value="last-month">Último mes</option>
                <option value="last-quarter">Último trimestre</option>
                <option value="last-year">Último año</option>
                </Select>
                <Select placeholder="Comparar con">
                <option value="last-month">Mes anterior</option>
                <option value="last-year">Año anterior</option>
                </Select>
            </Flex>

            {/* Gráfico y tabla */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {/* Gráfico de pastel */}
                <Box
                bg="white"
                shadow="sm"
                borderRadius="md"
                p={6}
                border="1px solid"
                borderColor="gray.200"
                >
                <Heading size="md" mb={4}>
                    Distribución de Ventas
                </Heading>
                <Pie data={chartData} />
                </Box>

                {/* Tabla de datos */}
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
                        <Th>Categoría</Th>
                        <Th isNumeric>Ventas</Th>
                        <Th isNumeric>vs Anterior</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {salesData.map((data, index) => (
                        <Tr key={index}>
                        <Td>{data.category}</Td>
                        <Td isNumeric>${data.sales.toLocaleString()}</Td>
                        <Td
                            isNumeric
                            color={data.vsPrevious.startsWith('+') ? 'green.500' : 'red.500'}
                        >
                            {data.vsPrevious}
                        </Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
                </Box>
            </SimpleGrid>
            </Box>
        </Box>
        </Flex>
    );
};

export default SalesByCategory;

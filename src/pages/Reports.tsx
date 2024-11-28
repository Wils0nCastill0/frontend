import React, { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar';
    import { Navbar } from '../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';
    import { useNavigate } from 'react-router-dom'; // Importar useNavigate

    const Reports: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate(); // Inicializar useNavigate

    // Datos ficticios para reportes
    const sections = [
        {
        title: 'Ventas',
        links: [
            { name: 'Ventas por período', path: '/sales-report' },
            { name: 'Ventas por producto', path: '/sales-by-product' },
            { name: 'Ventas por categoría', path: '/sales-by-category' },
        ],
        },
        {
        title: 'Inventario',
        links: [
            { name: 'Stock actual', path: '/inventory-report' },
            { name: 'Movimientos', path: '/movements-history' },
            { name: 'Valorización', path: '/reports/valuation' },
        ],
        },
        {
        title: 'Finanzas',
        links: [
            { name: 'Balance diario', path: '/daily-balance' },
            { name: 'Ganancias', path: '/reports/profit' },
            { name: 'Impuestos', path: '/reports/tax-report' },
        ],
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<string>('');

    const categories = ['Categoría 1', 'Categoría 2', 'Categoría 3']; // Datos ficticios
    const products = ['Producto A', 'Producto B', 'Producto C']; // Datos ficticios

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
                <Heading size="lg">Reportes</Heading>
                <Select width="200px" placeholder="Último mes">
                <option value="last-week">Última semana</option>
                <option value="last-3-months">Últimos 3 meses</option>
                <option value="last-year">Último año</option>
                </Select>
            </Flex>

            {/* Secciones principales */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
                {sections.map((section) => (
                <Box
                    key={section.title}
                    bg="white"
                    shadow="sm"
                    borderRadius="md"
                    p={6}
                    border="1px solid"
                    borderColor="gray.200"
                >
                    <Heading size="md" mb={4}>
                    {section.title}
                    </Heading>
                    {section.links.map((link, index) => (
                    <Text
                        key={index}
                        color="blue.500"
                        mb={2}
                        cursor="pointer"
                        onClick={() => navigate(link.path)} // Redirigir a la página correspondiente
                    >
                        • {link.name}
                    </Text>
                    ))}
                </Box>
                ))}
            </SimpleGrid>

            {/* Filtros */}
            <Flex gap={4} mb={6}>
                <Select
                placeholder="Categoría"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                >
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                    {category}
                    </option>
                ))}
                </Select>
                <Select
                placeholder="Producto"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                >
                {products.map((product, index) => (
                    <option key={index} value={product}>
                    {product}
                    </option>
                ))}
                </Select>
            </Flex>

            {/* Tabla */}
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
                    <Th>Categoría</Th>
                    <Th>Producto</Th>
                    <Th isNumeric>Ventas</Th>
                    <Th isNumeric>Stock</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                    <Td>Categoría 1</Td>
                    <Td>Producto A</Td>
                    <Td isNumeric>150</Td>
                    <Td isNumeric>20</Td>
                    </Tr>
                    <Tr>
                    <Td>Categoría 2</Td>
                    <Td>Producto B</Td>
                    <Td isNumeric>200</Td>
                    <Td isNumeric>30</Td>
                    </Tr>
                    <Tr>
                    <Td>Categoría 3</Td>
                    <Td>Producto C</Td>
                    <Td isNumeric>100</Td>
                    <Td isNumeric>10</Td>
                    </Tr>
                </Tbody>
                </Table>
            </Box>
            </Box>
        </Box>
        </Flex>
    );
};

export default Reports;

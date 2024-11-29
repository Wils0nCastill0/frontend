import { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Progress,
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar';
    import { Navbar } from '../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';

    interface Product {
    id: string;
    name: string;
    category: string;
    unitsSold: number;
    revenue: number;
    }

    interface CategoryDistribution {
    category: string;
    percentage: number;
    }

    // Datos ficticios
    const mockProducts: Product[] = [
    { id: '1', name: 'Coca Cola 2L', category: 'Bebidas', unitsSold: 245, revenue: 24500 },
    { id: '2', name: 'Pan Molde', category: 'Panadería', unitsSold: 180, revenue: 18000 },
    { id: '3', name: 'Leche 1L', category: 'Lácteos', unitsSold: 156, revenue: 15600 },
    ];

    const mockCategoryDistribution: CategoryDistribution[] = [
    { category: 'Bebidas', percentage: 35 },
    { category: 'Panadería', percentage: 28 },
    { category: 'Lácteos', percentage: 21 },
    ];

    const TopSellingProducts: React.FC = () => {
    const [products] = useState<Product[]>(mockProducts);
    const [categoryDistribution] = useState<CategoryDistribution[]>(mockCategoryDistribution);
    const { isOpen, onToggle } = useDisclosure(); // Manejo del estado para la barra lateral

    return (
        <Flex height="100vh">
        {/* Barra lateral desplegable */}
        <CollapsibleSidebar isOpen={isOpen} onToggle={onToggle} />

        {/* Contenido principal */}
        <Box flex="1" ml={isOpen ? '240px' : '60px'} transition="margin-left 0.3s">
            {/* Barra superior */}
            <Navbar onMenuClick={onToggle} />
            <Box p={6}>
            {/* Header */}
            <Flex justify="space-between" align="center" mb={6}>
                <Heading size="lg">Productos Más Vendidos</Heading>
                <Select width="200px" placeholder="Últimos 30 días">
                <option value="30">Últimos 30 días</option>
                <option value="7">Últimos 7 días</option>
                <option value="365">Último año</option>
                </Select>
            </Flex>

            {/* Estadísticas principales */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
                {products.slice(0, 3).map((product, index) => (
                <Box
                    key={product.id}
                    bg="white"
                    shadow="sm"
                    borderRadius="md"
                    p={4}
                    border="1px solid"
                    borderColor="gray.200"
                >
                    <Stat>
                    <StatLabel fontWeight="bold">#{index + 1} Producto más vendido</StatLabel>
                    <StatNumber fontSize="2xl">{product.name}</StatNumber>
                    <Text color="gray.500">{product.unitsSold} unidades</Text>
                    <StatHelpText color={index === 2 ? 'red.500' : 'green.500'}>
                        {index === 2 ? '↓ 3.1%' : '↑ 8.2%'} vs mes anterior
                    </StatHelpText>
                    </Stat>
                </Box>
                ))}
            </SimpleGrid>

            {/* Distribución por categoría y tabla Top 10 */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                {/* Distribución por categoría */}
                <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                <Heading size="md" mb={4}>
                    Distribución por Categoría
                </Heading>
                {categoryDistribution.map((category) => (
                    <Box key={category.category} mb={4}>
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text>{category.category}</Text>
                        <Text>{category.percentage}%</Text>
                    </Flex>
                    <Progress colorScheme="blue" value={category.percentage} />
                    </Box>
                ))}
                </Box>

                {/* Tabla Top 10 Productos */}
                <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                <Heading size="md" mb={4}>
                    Top 10 Productos
                </Heading>
                <Table variant="striped" colorScheme="gray">
                    <Thead>
                    <Tr>
                        <Th>Producto</Th>
                        <Th isNumeric>Unidades Vendidas</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {products.map((product) => (
                        <Tr key={product.id}>
                        <Td>{product.name}</Td>
                        <Td isNumeric>{product.unitsSold}</Td>
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

export default TopSellingProducts;

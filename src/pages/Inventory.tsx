import { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Input,
    Select,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Text,
    SimpleGrid,
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar';
    import { Navbar } from '../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';
    import { useNavigate } from 'react-router-dom';

    interface Product {
    code: string;
    name: string;
    category: string;
    stock: number;
    price: number;
    status: string;
    }

    // Datos ficticios
    const mockProducts: Product[] = [
    { code: '001', name: 'Coca Cola 2L', category: 'Bebidas', stock: 24, price: 2500, status: 'Activo' },
    { code: '002', name: 'Pan Integral', category: 'Panadería', stock: 5, price: 1990, status: 'Stock Bajo' },
    ];

    const Inventory: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [stock, setStock] = useState<string>('');

    const filteredProducts = mockProducts.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category ? product.category === category : true;
        const matchesStock =
        stock === 'stock-bajo'
            ? product.stock < 10
            : stock === 'stock-alto'
            ? product.stock >= 10
            : true;
        return matchesSearch && matchesCategory && matchesStock;
    });

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
                <Heading size="lg">Inventario</Heading>
                <Flex gap={2}>
                <Button
                    variant="outline"
                    onClick={() => navigate('/mass-import')}
                    colorScheme="blue"
                >
                    Importar
                </Button>
                <Button colorScheme="blue">Nuevo Producto</Button>
                </Flex>
            </Flex>

            {/* Alertas de Stock Bajo */}
            <Box mb={6}>
                <Heading size="md" mb={4}>
                Alertas de Stock Bajo
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <Box
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={4}
                    textAlign="center"
                >
                    <Text fontSize="lg" color="gray.500" mb={2}>
                    Productos en Alerta
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="red.500">
                    8
                    </Text>
                </Box>
                <Box
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={4}
                    textAlign="center"
                >
                    <Text fontSize="lg" color="gray.500" mb={2}>
                    Productos sin Stock
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="red.700">
                    2
                    </Text>
                </Box>
                <Box
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={4}
                    textAlign="center"
                >
                    <Text fontSize="lg" color="gray.500" mb={2}>
                    Órdenes Pendientes
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                    3
                    </Text>
                </Box>
                </SimpleGrid>
            </Box>

            {/* Filtros */}
            <Flex gap={4} mb={6}>
                <Input
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <Select
                placeholder="Categoría"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                <option value="Bebidas">Bebidas</option>
                <option value="Panadería">Panadería</option>
                <option value="Lácteos">Lácteos</option>
                </Select>
                <Select
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                >
                <option value="stock-bajo">Stock Bajo</option>
                <option value="stock-alto">Stock Alto</option>
                </Select>
            </Flex>

            {/* Tabla de productos */}
            <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                <Table variant="striped" colorScheme="gray">
                <Thead>
                    <Tr>
                    <Th>CÓDIGO</Th>
                    <Th>PRODUCTO</Th>
                    <Th>CATEGORÍA</Th>
                    <Th isNumeric>STOCK</Th>
                    <Th isNumeric>PRECIO</Th>
                    <Th>ESTADO</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredProducts.map((product) => (
                    <Tr key={product.code}>
                        <Td>{product.code}</Td>
                        <Td>{product.name}</Td>
                        <Td>{product.category}</Td>
                        <Td isNumeric color={product.stock < 10 ? 'red.500' : 'black'}>
                        {product.stock}
                        </Td>
                        <Td isNumeric>${product.price.toLocaleString()}</Td>
                        <Td>
                        <Badge
                            colorScheme={product.status === 'Activo' ? 'green' : 'red'}
                            variant="subtle"
                        >
                            {product.status}
                        </Badge>
                        </Td>
                    </Tr>
                    ))}
                </Tbody>
                </Table>
                <Text mt={4} color="gray.500" fontSize="sm">
                Mostrando 1-10 de {filteredProducts.length} productos
                </Text>
            </Box>
            </Box>
        </Box>
        </Flex>
    );
};

export default Inventory;

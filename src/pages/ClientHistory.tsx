import  { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Stat,
    StatLabel,
    StatNumber,
    HStack,
} from '@chakra-ui/react';
import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar';
import { Navbar } from '../components/layout/Navbar';
import { useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

// Datos ficticios
const mockClientData = {
    id: 1,
    name: 'Juan Pérez',
    rut: '12.345.678-9',
    email: 'juan@email.com',
    phone: '+56 9 1234 5678',
    totalPurchases: '$1,524,300',
    purchaseFrequency: '2.3/semana',
    averageTicket: '$12,450',
    purchaseHistory: [
        { date: '27/11/24 15:30', saleId: '#1234', items: '5 items', method: 'Efectivo', total: '$45,900' },
    ],
    topProducts: [
        { product: 'Coca Cola 2L', quantity: '24 un.' },
        { product: 'Pan Molde', quantity: '18 un.' },
        { product: 'Leche', quantity: '15 un.' },
    ],
};

const ClientHistory: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { isOpen, onToggle } = useDisclosure();
    const [clientData, setClientData] = useState<typeof mockClientData | null>(null);

    useEffect(() => {
        // Aquí se haría una llamada al backend para obtener los datos del cliente
        // Por ahora usamos datos ficticios
        setClientData(mockClientData);
    }, [id]);

    if (!clientData) {
        return <Text>Cargando datos del cliente...</Text>;
    }

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
                    <Heading size="lg" mb={6}>
                        Historial del Cliente
                    </Heading>

                    {/* Información del Cliente */}
                    <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200" mb={6}>
                        <Flex justify="space-between">
                            <Box>
                                <Heading size="md">{clientData.name}</Heading>
                                <Text>RUT: {clientData.rut}</Text>
                                <Text>Email: {clientData.email}</Text>
                                <Text>Teléfono: {clientData.phone}</Text>
                            </Box>
                            <SimpleGrid columns={3} spacing={6}>
                                <Stat>
                                    <StatLabel>Total Compras</StatLabel>
                                    <StatNumber>{clientData.totalPurchases}</StatNumber>
                                </Stat>
                                <Stat>
                                    <StatLabel>Frecuencia</StatLabel>
                                    <StatNumber>{clientData.purchaseFrequency}</StatNumber>
                                </Stat>
                                <Stat>
                                    <StatLabel>Ticket Promedio</StatLabel>
                                    <StatNumber>{clientData.averageTicket}</StatNumber>
                                </Stat>
                            </SimpleGrid>
                        </Flex>
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        {/* Historial de Compras */}
                        <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                            <Heading size="md" mb={4}>
                                Historial de Compras
                            </Heading>
                            <Table variant="simple" size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>FECHA</Th>
                                        <Th>N° VENTA</Th>
                                        <Th>PRODUCTOS</Th>
                                        <Th>MÉTODO</Th>
                                        <Th>TOTAL</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {clientData.purchaseHistory.map((purchase, index) => (
                                        <Tr key={index}>
                                            <Td>{purchase.date}</Td>
                                            <Td>{purchase.saleId}</Td>
                                            <Td>{purchase.items}</Td>
                                            <Td>{purchase.method}</Td>
                                            <Td>{purchase.total}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>

                        {/* Análisis de Compras */}
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
                                    Análisis de Compras
                                </Heading>
                                <VStack align="stretch" spacing={3}>
                                    <Box>
                                        <Text fontWeight="bold" mb={2}>
                                            Productos Más Comprados
                                        </Text>
                                        {clientData.topProducts.map((product, index) => (
                                            <HStack key={index} justify="space-between">
                                                <Text>{index + 1}. {product.product}</Text>
                                                <Text>{product.quantity}</Text>
                                            </HStack>
                                        ))}
                                    </Box>
                                    <Box>
                                        <Text fontWeight="bold" mb={2}>
                                            Tendencia de Compras
                                        </Text>
                                        <Text color="gray.500">Gráfico próximamente</Text>
                                    </Box>
                                </VStack>
                            </Box>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>
        </Flex>
    );
};

export default ClientHistory;

import React from 'react';
import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    Button,
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../../components/layout/CollapsibleSidebar';
    import { Navbar } from '../../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';

    const ProfitReport: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();

    // Datos ficticios para las métricas
    const metrics = [
        {
        title: 'Ingresos Totales',
        value: '$15,245,300',
        change: '+12.5% vs mes anterior',
        color: 'green.500',
        },
        {
        title: 'Costos',
        value: '$10,670,000',
        change: '+8.2% vs mes anterior',
        color: 'red.500',
        },
        {
        title: 'Ganancia Bruta',
        value: '$4,575,300',
        change: '+15.3% vs mes anterior',
        color: 'green.500',
        },
        {
        title: 'Margen de Ganancia',
        value: '30.2%',
        change: '+2.1% vs mes anterior',
        color: 'green.500',
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
                <Heading size="lg">Reporte de Ganancias</Heading>
                <Flex gap={4}>
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

            {/* Gráficos */}
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
                    Ganancias vs Ventas
                </Heading>
                <Box bg="gray.100" height="300px" borderRadius="md" />
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
                    Top Productos por Margen
                </Heading>
                <Box bg="gray.100" height="300px" borderRadius="md" />
                </Box>
            </SimpleGrid>
            </Box>
        </Box>
        </Flex>
    );
};

export default ProfitReport;

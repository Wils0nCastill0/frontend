import React from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    SimpleGrid,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Select,
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../../components/layout/CollapsibleSidebar';
    import { Navbar } from '../../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';

    const DailyBalance: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();

    // Datos ficticios para las métricas y tablas
    const metrics = [
        {
        title: 'Ingresos Totales',
        value: '$1,524,300',
        change: '+12.5% vs ayer',
        color: 'green.500',
        },
        {
        title: 'Egresos Totales',
        value: '$845,600',
        change: '+5.2% vs ayer',
        color: 'red.500',
        },
        {
        title: 'Balance Neto',
        value: '$678,700',
        change: '+8.3% vs ayer',
        color: 'green.500',
        },
    ];

    const ingresos = [
        { concepto: 'Ventas en efectivo', metodo: 'Efectivo', monto: '$458,900' },
        { concepto: 'Ventas con débito', metodo: 'Débito', monto: '$625,400' },
    ];

    const egresos = [
        { concepto: 'Pago proveedores', metodo: 'Transferencia', monto: '$425,300' },
        { concepto: 'Gastos operativos', metodo: 'Efectivo', monto: '$158,900' },
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
                <Heading size="lg">Balance Diario</Heading>
                <Select width="200px" placeholder="27 Noviembre 2024">
                <option value="2024-11-26">26 Noviembre 2024</option>
                <option value="2024-11-25">25 Noviembre 2024</option>
                </Select>
            </Flex>

            {/* Métricas principales */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
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

            {/* Tablas de ingresos y egresos */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
                <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                <Heading size="md" mb={4}>
                    Ingresos
                </Heading>
                <Table variant="simple">
                    <Thead>
                    <Tr>
                        <Th>Concepto</Th>
                        <Th>Método</Th>
                        <Th isNumeric>Monto</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {ingresos.map((ingreso, index) => (
                        <Tr key={index}>
                        <Td>{ingreso.concepto}</Td>
                        <Td>{ingreso.metodo}</Td>
                        <Td isNumeric color="green.500">
                            {ingreso.monto}
                        </Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
                </Box>
                <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                <Heading size="md" mb={4}>
                    Egresos
                </Heading>
                <Table variant="simple">
                    <Thead>
                    <Tr>
                        <Th>Concepto</Th>
                        <Th>Método</Th>
                        <Th isNumeric>Monto</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {egresos.map((egreso, index) => (
                        <Tr key={index}>
                        <Td>{egreso.concepto}</Td>
                        <Td>{egreso.metodo}</Td>
                        <Td isNumeric color="red.500">
                            {egreso.monto}
                        </Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
                </Box>
            </SimpleGrid>

            {/* Balance final */}
            <Box
                bg="white"
                shadow="sm"
                borderRadius="md"
                p={6}
                border="1px solid"
                borderColor="gray.200"
                textAlign="center"
            >
                <Text fontWeight="bold" fontSize="lg">
                Balance del Día
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="green.500">
                $678,700
                </Text>
                <Flex justify="center" mt={4} gap={4}>
                <Button colorScheme="blue" variant="outline">
                    PDF
                </Button>
                <Button colorScheme="blue">Excel</Button>
                </Flex>
            </Box>
            </Box>
        </Box>
        </Flex>
    );
};

export default DailyBalance;

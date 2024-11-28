import React, { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Select,
    Input,
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

    const MovementsHistory: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();
    const [selectedDateRange, setSelectedDateRange] = useState('Último mes');
    const [searchInput, setSearchInput] = useState('');

    // Datos ficticios
    const movements = [
        { date: '2024-11-25', description: 'Ingreso de productos', quantity: 100, type: 'Ingreso' },
        { date: '2024-11-26', description: 'Salida por venta', quantity: 50, type: 'Egreso' },
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
            <Heading size="lg" mb={6}>
                Historial de Movimientos
            </Heading>

            {/* Filtros */}
            <Flex gap={4} mb={6}>
                <Select
                placeholder="Fecha"
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                >
                <option value="Último mes">Último mes</option>
                <option value="Últimos 3 meses">Últimos 3 meses</option>
                <option value="Último año">Último año</option>
                </Select>
                <Input
                placeholder="Buscar movimiento..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                />
            </Flex>

            {/* Tabla de Movimientos */}
            <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                <Table variant="striped" colorScheme="gray">
                <Thead>
                    <Tr>
                    <Th>Fecha</Th>
                    <Th>Descripción</Th>
                    <Th isNumeric>Cantidad</Th>
                    <Th>Tipo</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {movements.map((movement, index) => (
                    <Tr key={index}>
                        <Td>{movement.date}</Td>
                        <Td>{movement.description}</Td>
                        <Td isNumeric>{movement.quantity}</Td>
                        <Td>{movement.type}</Td>
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

export default MovementsHistory;

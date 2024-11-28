import React, { useState, useEffect } from 'react';
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
    Text,
    Badge,
    InputGroup,
    InputLeftElement,
    } from '@chakra-ui/react';
    import { Search, Plus } from 'lucide-react';
    import { useNavigate } from 'react-router-dom';

    // Tipos para los clientes
    interface Client {
    rut: string;
    name: string;
    email: string;
    totalPurchases: number;
    lastPurchase: string;
    }

    // Datos ficticios
    const mockClients: Client[] = [
    { rut: '12.345.678-9', name: 'Juan Pérez', email: 'juan@email.com', totalPurchases: 458900, lastPurchase: 'Hace 2 días' },
    { rut: '98.765.432-1', name: 'María González', email: 'maria@email.com', totalPurchases: 325600, lastPurchase: 'Hoy' },
    ];

    const Clients: React.FC = () => {
    const [clients, setClients] = useState<Client[]>(mockClients);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Simulación de obtener datos desde la API
        const fetchClients = async () => {
        // Reemplaza esto con una llamada real a la API
        setClients(mockClients);
        };

        fetchClients();
    }, []);

    const filteredClients = clients.filter((client) => {
        const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) || client.rut.includes(search);
        const matchesType = typeFilter ? client.email.includes(typeFilter) : true; // Filtro ficticio
        const matchesStatus = statusFilter ? client.lastPurchase.includes(statusFilter) : true; // Filtro ficticio
        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <Flex height="100vh">
        {/* Contenido principal */}
        <Box flex="1" ml="240px" p={6}>
            {/* Encabezado */}
            <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg">Clientes</Heading>
            <Button
                colorScheme="blue"
                leftIcon={<Plus />}
                onClick={() => navigate('/new-client')} // Redirige a una página para crear un nuevo cliente
            >
                Nuevo Cliente
            </Button>
            </Flex>

            {/* Filtros */}
            <Flex gap={4} mb={6}>
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                <Search size={20} />
                </InputLeftElement>
                <Input
                placeholder="Buscar por nombre o RUT..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
            <Select placeholder="Tipo" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="frecuente">Frecuente</option>
                <option value="ocasional">Ocasional</option>
            </Select>
            <Select placeholder="Estado" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
            </Select>
            </Flex>

            {/* Tabla de clientes */}
            <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
            <Table variant="striped" colorScheme="gray">
                <Thead>
                <Tr>
                    <Th>RUT</Th>
                    <Th>NOMBRE</Th>
                    <Th>EMAIL</Th>
                    <Th isNumeric>TOTAL COMPRAS</Th>
                    <Th>ÚLTIMA COMPRA</Th>
                </Tr>
                </Thead>
                <Tbody>
                {filteredClients.map((client) => (
                    <Tr key={client.rut}>
                    <Td>{client.rut}</Td>
                    <Td>{client.name}</Td>
                    <Td>{client.email}</Td>
                    <Td isNumeric>${client.totalPurchases.toLocaleString()}</Td>
                    <Td>
                        <Badge colorScheme={client.lastPurchase.includes('Hoy') ? 'green' : 'gray'}>
                        {client.lastPurchase}
                        </Badge>
                    </Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
            <Text mt={4} color="gray.500" fontSize="sm">
                Mostrando 1-10 de {clients.length} clientes
            </Text>
            </Box>
        </Box>
        </Flex>
    );
};

export default Clients;

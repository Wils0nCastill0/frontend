import { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Heading,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    VStack,
    useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar';
import { Navbar } from '../components/layout/Navbar';
import { useDisclosure } from '@chakra-ui/react';
// import { getClients, saveNewClient } from '../services/api'; // API functions

const Clients: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();
    const {
        isOpen: isModalOpen,
        onOpen: openModal,
        onClose: closeModal,
    } = useDisclosure();
    const [searchQuery, setSearchQuery] = useState('');
    const [clients, setClients] = useState<any[]>([]);
    const [filteredClients, setFilteredClients] = useState<any[]>([]);
    const [newClient, setNewClient] = useState({
        rut: '',
        clientType: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        region: '',
        notes: '',
    });
    const navigate = useNavigate();
    const toast = useToast();

    // Fetch clients from API (mocked for now)
    useEffect(() => {
        const fetchClients = async () => {
            // const data = await getClients(); // Call the API function
            // setClients(data);
            // setFilteredClients(data);
        };
        fetchClients();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = clients.filter(
            (client) =>
                client.name.toLowerCase().includes(query) ||
                client.rut.toLowerCase().includes(query)
        );
        setFilteredClients(filtered);
    };

    const handleClientClick = (clientId: number) => {
        navigate(`/clients/${clientId}`); // Redirect to client history page
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewClient((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            // await saveNewClient(newClient); // Call the API to save the client
            toast({
                title: 'Cliente agregado',
                description: 'El cliente se ha agregado correctamente.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            closeModal();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudo agregar el cliente.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
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
                        <Heading size="lg">Clientes</Heading>
                        <Button colorScheme="blue" onClick={openModal}>
                            Nuevo Cliente
                        </Button>
                    </Flex>

                    {/* Barra de búsqueda y filtros */}
                    <HStack spacing={4} mb={4}>
                        <Input
                            placeholder="Buscar por nombre o RUT..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <Select placeholder="Tipo">
                            <option value="regular">Regular</option>
                            <option value="vip">VIP</option>
                        </Select>
                        <Select placeholder="Estado">
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </Select>
                    </HStack>

                    {/* Tabla de clientes */}
                    <Box
                        bg="white"
                        shadow="sm"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="gray.200"
                        p={4}
                    >
                        <Table variant="simple" size="sm">
                            <Thead>
                                <Tr>
                                    <Th>RUT</Th>
                                    <Th>NOMBRE</Th>
                                    <Th>EMAIL</Th>
                                    <Th>TOTAL COMPRAS</Th>
                                    <Th>ÚLTIMA COMPRA</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredClients.map((client) => (
                                    <Tr
                                        key={client.id}
                                        _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                                        onClick={() => handleClientClick(client.id)}
                                    >
                                        <Td>{client.rut}</Td>
                                        <Td>{client.name}</Td>
                                        <Td>{client.email}</Td>
                                        <Td>{client.totalPurchases}</Td>
                                        <Td>{client.lastPurchase}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
            </Box>

            {/* Modal de Nuevo Cliente */}
            <Modal isOpen={isModalOpen} onClose={closeModal} isCentered size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Nuevo Cliente</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            <HStack spacing={4}>
                                <Input name="rut" placeholder="RUT *" onChange={handleInputChange} />
                                <Select
                                    name="clientType"
                                    placeholder="Tipo de Cliente"
                                    onChange={handleInputChange}
                                >
                                    <option value="regular">Regular</option>
                                    <option value="vip">VIP</option>
                                </Select>
                            </HStack>
                            <HStack spacing={4}>
                                <Input
                                    name="firstName"
                                    placeholder="Nombre *"
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name="lastName"
                                    placeholder="Apellidos *"
                                    onChange={handleInputChange}
                                />
                            </HStack>
                            <HStack spacing={4}>
                                <Input name="email" placeholder="Email" onChange={handleInputChange} />
                                <Input name="phone" placeholder="Teléfono" onChange={handleInputChange} />
                            </HStack>
                            <Input
                                name="address"
                                placeholder="Dirección"
                                onChange={handleInputChange}
                            />
                            <HStack spacing={4}>
                                <Input name="city" placeholder="Ciudad" onChange={handleInputChange} />
                                <Input name="region" placeholder="Región" onChange={handleInputChange} />
                            </HStack>
                            <Input name="notes" placeholder="Notas" onChange={handleInputChange} />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" onClick={closeModal}>
                            Cancelar
                        </Button>
                        <Button colorScheme="blue" onClick={handleSave}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default Clients;

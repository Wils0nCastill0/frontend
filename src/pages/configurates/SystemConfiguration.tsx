import {
    Box,
    Flex,
    Heading,
    VStack,
    SimpleGrid,
    Input,
    Text,
    Button,
    Divider,
    HStack,
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
import { useNavigate } from 'react-router-dom';

// Datos ficticios
const companyInfo = {
    name: 'Supermercado San Armando',
    rut: '76.543.210-K',
};

const posConfiguration = {
    printer: 'EPSON TM-T20III',
    ticketFormat: '80mm',
    footerMessage: '¡Gracias por su compra!',
};

const users = [
    { name: 'Juan Pérez', role: 'Administrador' },
];

const backupHistory = [
    { date: '27/11/24 15:30', size: '2.5 GB', status: 'OK' },
    { date: '26/11/24 23:00', size: '2.4 GB', status: 'OK' },
];

const SystemConfiguration: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate();

    const handleEditPOS = () => {
        navigate('  /pos-settings'); // Cambiar esta ruta según la estructura de tu aplicación
    };

    const handleEditBackupSettings = () => {
        navigate('/backup-settings'); // Ruta a la configuración de respaldos
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
                    <Heading size="lg" mb={6}>
                        Configuración del Sistema
                    </Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        {/* Información de la empresa */}
                        <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                            <Heading size="md" mb={4}>
                                Información de la Empresa
                            </Heading>
                            <VStack spacing={4} align="stretch">
                                <HStack>
                                    <Text flex="1">Nombre de la Empresa:</Text>
                                    <Input value={companyInfo.name} readOnly />
                                </HStack>
                                <HStack>
                                    <Text flex="1">RUT:</Text>
                                    <Input value={companyInfo.rut} readOnly />
                                </HStack>
                            </VStack>
                        </Box>

                        {/* Configuración POS */}
                        <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                            <Flex justify="space-between" align="center" mb={4}>
                                <Heading size="md">Configuración POS</Heading>
                                <Button colorScheme="blue" size="sm" onClick={handleEditPOS}>
                                    Editar
                                </Button>
                            </Flex>
                            <VStack spacing={4} align="stretch">
                                <HStack>
                                    <Text flex="1">Impresora predeterminada:</Text>
                                    <Input value={posConfiguration.printer} readOnly />
                                </HStack>
                                <HStack>
                                    <Text flex="1">Formato de ticket:</Text>
                                    <Input value={posConfiguration.ticketFormat} readOnly />
                                </HStack>
                                <HStack>
                                    <Text flex="1">Mensaje de pie de ticket:</Text>
                                    <Input value={posConfiguration.footerMessage} readOnly />
                                </HStack>
                            </VStack>
                        </Box>

                        {/* Usuarios y Permisos */}
                        <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                            <Heading size="md" mb={4}>
                                Usuarios y Permisos
                            </Heading>
                            <VStack spacing={4} align="stretch">
                                {users.map((user, index) => (
                                    <Flex
                                        key={index}
                                        justify="space-between"
                                        align="center"
                                        p={4}
                                        bg="gray.50"
                                        borderRadius="md"
                                        border="1px solid"
                                        borderColor="gray.200"
                                    >
                                        <Text fontWeight="bold">{user.name}</Text>
                                        <Text color="gray.500">{user.role}</Text>
                                        <Button size="sm" colorScheme="blue">
                                            Editar
                                        </Button>
                                    </Flex>
                                ))}
                            </VStack>
                        </Box>

                        {/* Historial de Respaldos */}
                        <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                            <Flex justify="space-between" align="center" mb={4}>
                                <Heading size="md">Historial de Respaldos</Heading>
                                <Button
                                    colorScheme="blue"
                                    size="sm"
                                    onClick={handleEditBackupSettings}
                                >
                                    Configuración de Respaldos
                                </Button>
                            </Flex>
                            <Table variant="simple" size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>Fecha</Th>
                                        <Th>Tamaño</Th>
                                        <Th>Estado</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {backupHistory.map((backup, index) => (
                                        <Tr key={index}>
                                            <Td>{backup.date}</Td>
                                            <Td>{backup.size}</Td>
                                            <Td>
                                                <Text color="green.500" fontWeight="bold">
                                                    {backup.status}
                                                </Text>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    </SimpleGrid>

                    {/* Botón de guardar cambios */}
                    <Divider my={6} />
                    <Button colorScheme="blue" size="lg" width="full">
                        Guardar Cambios
                    </Button>
                </Box>
            </Box>
        </Flex>
    );
};

export default SystemConfiguration;

import { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    VStack,
    SimpleGrid,
    Input,
    Text,
    Button,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useDisclosure,
} from '@chakra-ui/react';
import { CollapsibleSidebar } from '../../components/layout/CollapsibleSidebar';
import { Navbar } from '../../components/layout/Navbar';

// Datos ficticios
const backupHistory = [
    { date: '27/11/24 15:30', size: '2.5 GB', status: 'OK' },
    { date: '26/11/24 23:00', size: '2.4 GB', status: 'OK' },
];

const BackupSettings: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();
    const [frequency, setFrequency] = useState('Diario');
    const [time, setTime] = useState('23:00');
    const [location, setLocation] = useState('/backups/');
    const [retention, setRetention] = useState('Mantener últimos 30 días');

    const handleBackupNow = () => {
        // Acción para realizar respaldo ahora (simulación)
        alert('Iniciando respaldo...');
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
                        <Heading size="lg">Configuración de Respaldos</Heading>
                        <Button colorScheme="blue" onClick={handleBackupNow}>
                            Respaldar Ahora
                        </Button>
                    </Flex>

                    {/* Estado del último respaldo */}
                    <Box
                        bg="white"
                        shadow="sm"
                        borderRadius="md"
                        p={6}
                        border="1px solid"
                        borderColor="gray.200"
                        mb={6}
                    >
                        <Text fontSize="lg" color="green.500" fontWeight="bold" mb={2}>
                            Estado del último respaldo
                        </Text>
                        <Text color="gray.600">Completado exitosamente</Text>
                        <Text color="gray.600">27/11/2024 15:30 - 2.5 GB</Text>
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        {/* Configuración de Respaldo Automático */}
                        <Box
                            bg="white"
                            shadow="sm"
                            borderRadius="md"
                            p={6}
                            border="1px solid"
                            borderColor="gray.200"
                        >
                            <Heading size="md" mb={4}>
                                Configuración de Respaldo Automático
                            </Heading>
                            <VStack spacing={4} align="stretch">
                                <Box>
                                    <Text mb={1}>Frecuencia de Respaldo</Text>
                                    <Select
                                        value={frequency}
                                        onChange={(e) => setFrequency(e.target.value)}
                                    >
                                        <option value="Diario">Diario</option>
                                        <option value="Semanal">Semanal</option>
                                        <option value="Mensual">Mensual</option>
                                    </Select>
                                </Box>
                                <Box>
                                    <Text mb={1}>Hora del Respaldo</Text>
                                    <Select
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    >
                                        <option value="23:00">23:00</option>
                                        <option value="02:00">02:00</option>
                                        <option value="06:00">06:00</option>
                                    </Select>
                                </Box>
                                <Box>
                                    <Text mb={1}>Ubicación de Respaldos</Text>
                                    <Input
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <Text mb={1}>Retención de Respaldos</Text>
                                    <Select
                                        value={retention}
                                        onChange={(e) => setRetention(e.target.value)}
                                    >
                                        <option value="Mantener últimos 30 días">
                                            Mantener últimos 30 días
                                        </option>
                                        <option value="Mantener últimos 60 días">
                                            Mantener últimos 60 días
                                        </option>
                                        <option value="Mantener últimos 90 días">
                                            Mantener últimos 90 días
                                        </option>
                                    </Select>
                                </Box>
                            </VStack>
                        </Box>

                        {/* Historial de Respaldos */}
                        <Box
                            bg="white"
                            shadow="sm"
                            borderRadius="md"
                            p={6}
                            border="1px solid"
                            borderColor="gray.200"
                        >
                            <Heading size="md" mb={4}>
                                Historial de Respaldos
                            </Heading>
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
                </Box>
            </Box>
        </Flex>
    );
};

export default BackupSettings;

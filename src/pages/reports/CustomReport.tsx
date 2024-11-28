import React, { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    VStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Button,
    Text,
    HStack,
    Input,
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../../components/layout/CollapsibleSidebar';
    import { Navbar } from '../../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';

    // Datos ficticios
    const savedReports = [
    { name: 'Ventas por Categoría', updatedAt: 'Hace 2 días' },
    { name: 'Productos más Rentables', updatedAt: 'Hace 5 días' },
    ];

    const CustomReport: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();
    const [selectedSource, setSelectedSource] = useState<string>('Ventas');
    const [selectedFields, setSelectedFields] = useState<string[]>(['Fecha', 'Monto']);

    const handleFieldToggle = (field: string) => {
        if (selectedFields.includes(field)) {
        setSelectedFields(selectedFields.filter((f) => f !== field));
        } else {
        setSelectedFields([...selectedFields, field]);
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
                <Heading size="lg">Reportes Personalizados</Heading>
                <Button colorScheme="blue">Nuevo Reporte</Button>
            </Flex>

            <Flex gap={6}>
                {/* Reportes guardados */}
                <Box flex="1" bg="white" shadow="sm" borderRadius="md" p={4} border="1px solid" borderColor="gray.200">
                <Heading size="md" mb={4}>
                    Reportes Guardados
                </Heading>
                <VStack align="stretch" spacing={4}>
                    {savedReports.map((report, index) => (
                    <Box
                        key={index}
                        p={3}
                        bg="gray.50"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="gray.200"
                        cursor="pointer"
                        _hover={{ bg: 'blue.50' }}
                    >
                        <Text fontWeight="bold">{report.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                        Actualizado {report.updatedAt}
                        </Text>
                    </Box>
                    ))}
                </VStack>
                </Box>

                {/* Configuración de reportes */}
                <Box flex="2" bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                <Tabs variant="enclosed">
                    <TabList>
                    <Tab>Datos</Tab>
                    <Tab>Visualización</Tab>
                    <Tab>Filtros</Tab>
                    </TabList>
                    <TabPanels>
                    {/* Panel de datos */}
                    <TabPanel>
                        <Heading size="md" mb={4}>
                        Seleccionar Fuente de Datos
                        </Heading>
                        <HStack spacing={4} mb={6}>
                        {['Ventas', 'Productos', 'Inventario'].map((source) => (
                            <Button
                            key={source}
                            variant={selectedSource === source ? 'solid' : 'outline'}
                            colorScheme="blue"
                            onClick={() => setSelectedSource(source)}
                            >
                            {source}
                            </Button>
                        ))}
                        </HStack>

                        <Heading size="md" mb={4}>
                        Seleccionar Campos
                        </Heading>
                        <HStack spacing={4}>
                        {['Fecha', 'Monto', 'Cantidad', 'Categoría'].map((field) => (
                            <Button
                            key={field}
                            variant={selectedFields.includes(field) ? 'solid' : 'outline'}
                            colorScheme="blue"
                            onClick={() => handleFieldToggle(field)}
                            >
                            {field}
                            </Button>
                        ))}
                        </HStack>
                    </TabPanel>

                    {/* Panel de visualización */}
                    <TabPanel>
                        <Heading size="md" mb={4}>
                        Configuración de Visualización
                        </Heading>
                        <Text color="gray.600">Opciones de gráficos y tablas próximamente.</Text>
                    </TabPanel>

                    {/* Panel de filtros */}
                    <TabPanel>
                        <Heading size="md" mb={4}>
                        Filtros
                        </Heading>
                        <VStack spacing={4} align="stretch">
                        <HStack>
                            <Text flex="1">Rango de Fecha:</Text>
                            <Input placeholder="Desde" type="date" />
                            <Input placeholder="Hasta" type="date" />
                        </HStack>
                        <HStack>
                            <Text flex="1">Monto Mínimo:</Text>
                            <Input placeholder="$0.00" type="number" />
                        </HStack>
                        </VStack>
                    </TabPanel>
                    </TabPanels>
                </Tabs>
                </Box>
            </Flex>
            </Box>
        </Box>
        </Flex>
    );
};

export default CustomReport;

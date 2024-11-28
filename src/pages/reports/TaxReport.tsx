import React from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../../components/layout/CollapsibleSidebar';
    import { Navbar } from '../../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';

    const TaxReport: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();

    // Datos ficticios para los KPI
    const kpis = [
        { title: 'Ventas Netas', value: '$12,810,336', color: 'black' },
        { title: 'IVA Cobrado (19%)', value: '$2,433,964', color: 'blue.500' },
        { title: 'IVA por Pagar', value: '$1,245,300', color: 'red.500' },
    ];

    // Datos ficticios para el resumen
    const taxDetails = [
        { label: 'Total Ventas (inc. IVA)', value: '$15,244,300' },
        { label: 'Base Imponible', value: '$12,810,336' },
        { label: 'IVA Cobrado (19%)', value: '$2,433,964' },
        { label: 'IVA Pagado en Compras', value: '$1,188,664' },
        { label: 'IVA por Pagar', value: '$1,245,300', color: 'red.500' },
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
                <Heading size="lg">Reporte de Impuestos</Heading>
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
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
                {kpis.map((kpi, index) => (
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
                    {kpi.title}
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color={kpi.color}>
                    {kpi.value}
                    </Text>
                </Box>
                ))}
            </SimpleGrid>

            {/* Tabs */}
            <Tabs variant="soft-rounded" colorScheme="blue">
                <TabList mb={4}>
                <Tab>Resumen</Tab>
                <Tab>Ventas</Tab>
                <Tab>Compras</Tab>
                </TabList>

                <TabPanels>
                {/* Panel Resumen */}
                <TabPanel>
                    <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                    <Heading size="md" mb={4}>
                        Detalle de Impuestos
                    </Heading>
                    <SimpleGrid columns={2} spacingY={2}>
                        {taxDetails.map((detail, index) => (
                        <React.Fragment key={index}>
                            <Text fontWeight="bold">{detail.label}</Text>
                            <Text color={detail.color || 'black'}>{detail.value}</Text>
                        </React.Fragment>
                        ))}
                    </SimpleGrid>
                    </Box>
                </TabPanel>

                {/* Panel Ventas */}
                <TabPanel>
                    <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                    <Heading size="md" mb={4}>
                        Detalle de Ventas
                    </Heading>
                    <Text>Aquí se mostrarán los detalles de las ventas.</Text>
                    </Box>
                </TabPanel>

                {/* Panel Compras */}
                <TabPanel>
                    <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
                    <Heading size="md" mb={4}>
                        Detalle de Compras
                    </Heading>
                    <Text>Aquí se mostrarán los detalles de las compras.</Text>
                    </Box>
                </TabPanel>
                </TabPanels>
            </Tabs>
            </Box>
        </Box>
        </Flex>
    );
};

export default TaxReport;

import {
    Box,
    Heading,
    VStack,
    SimpleGrid,
    Input,
    Text,
    Button,
    HStack,
    Flex,
} from '@chakra-ui/react';

// Datos ficticios para mostrar
const defaultPrinter = {
    name: 'EPSON TM-T20III',
    connection: 'Conectada por USB',
};

const otherPrinters = [
    {
        type: 'Impresora Cocina',
        name: 'EPSON TM-T88VI',
        connection: 'Conectada por Red - 192.168.1.100',
    },
    {
        type: 'Impresora Reportes',
        name: 'HP LaserJet Pro M404n',
        connection: 'Conectada por Red - 192.168.1.101',
    },
];

const POSSettings: React.FC = () => {
    const handleSetDefault = (printerName: string) => {
        console.log(`Estableciendo ${printerName} como predeterminada`);
    };

    const handlePrintTest = (printerName: string) => {
        console.log(`Imprimiendo test en ${printerName}`);
    };

    const handleAddPrinter = () => {
        console.log('Añadiendo nueva impresora');
    };

    return (
        <Box p={6}>
            {/* Encabezado */}
            <Flex justify="space-between" align="center" mb={6}>
                <Heading size="lg">Configuración de Impresoras</Heading>
                <Button colorScheme="blue" onClick={handleAddPrinter}>
                    Añadir Impresora
                </Button>
            </Flex>

            {/* Impresora Predeterminada */}
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
                    Impresora Predeterminada
                </Heading>
                <VStack spacing={4} align="stretch">
                    <Text fontWeight="bold">{defaultPrinter.name}</Text>
                    <Text>{defaultPrinter.connection}</Text>
                    <HStack spacing={4}>
                        <Button
                            colorScheme="blue"
                            onClick={() => handlePrintTest(defaultPrinter.name)}
                        >
                            Imprimir Test
                        </Button>
                        <Button colorScheme="gray">Editar</Button>
                    </HStack>
                </VStack>
            </Box>

            {/* Otras Impresoras */}
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
                    Otras Impresoras
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {otherPrinters.map((printer, index) => (
                        <Box
                            key={index}
                            bg="gray.50"
                            borderRadius="md"
                            p={4}
                            border="1px solid"
                            borderColor="gray.200"
                        >
                            <Text fontWeight="bold">{printer.type}</Text>
                            <Text>{printer.name}</Text>
                            <Text color="gray.500" fontSize="sm">
                                {printer.connection}
                            </Text>
                            <HStack spacing={4} mt={4}>
                                <Button
                                    size="sm"
                                    colorScheme="blue"
                                    onClick={() => handlePrintTest(printer.name)}
                                >
                                    Imprimir Test
                                </Button>
                                <Button
                                    size="sm"
                                    colorScheme="blue"
                                    variant="outline"
                                    onClick={() => handleSetDefault(printer.name)}
                                >
                                    Establecer Default
                                </Button>
                            </HStack>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>

            {/* Configuración de Formato */}
            <Box
                bg="white"
                shadow="sm"
                borderRadius="md"
                p={6}
                border="1px solid"
                borderColor="gray.200"
            >
                <Heading size="md" mb={4}>
                    Configuración de Formato
                </Heading>
                <VStack spacing={4} align="stretch">
                    <HStack>
                        <Text flex="1">Logo del Ticket:</Text>
                        <Input type="file" />
                    </HStack>
                    <HStack>
                        <Text flex="1">Ancho del Papel:</Text>
                        <Input value="80mm" readOnly />
                    </HStack>
                </VStack>
            </Box>
        </Box>
    );
};

export default POSSettings;

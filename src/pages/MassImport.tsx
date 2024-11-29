import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    Divider,
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react';  
    import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar';
    import { Navbar } from '../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';
    import { CheckCircle, Download } from 'lucide-react';

    const MassImport: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();

    const handleDownloadTemplate = () => {
        // Acción ficticia para descargar la plantilla
        console.log('Descargando plantilla...');
    };

    const handleNextStep = () => {
        // Acción ficticia para avanzar al siguiente paso
        console.log('Avanzando al siguiente paso...');
    };

    const handleCancel = () => {
        // Acción ficticia para cancelar la importación
        console.log('Cancelando importación...');
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
            <Heading size="lg" mb={4}>
                Importación Masiva
            </Heading>

            {/* Pasos del proceso */}
            <Flex justify="space-between" mb={6}>
                {['Descargar', 'Completar', 'Importar', 'Verificar'].map((step, index) => (
                <Box
                    key={index}
                    textAlign="center"
                    flex="1"
                    position="relative"
                    color={index === 0 ? 'blue.500' : 'gray.400'}
                >
                    <Text fontSize="lg" fontWeight="bold">
                    {index + 1}
                    </Text>
                    <Text>{step}</Text>
                    {index < 3 && (
                    <Divider
                        orientation="horizontal"
                        position="absolute"
                        top="50%"
                        right="-50%"
                        width="100%"
                        borderColor="gray.200"
                    />
                    )}
                </Box>
                ))}
            </Flex>

            {/* Sección Descargar Plantilla */}
            <Box
                bg="white"
                shadow="sm"
                borderRadius="md"
                p={6}
                mb={6}
                border="1px solid"
                borderColor="gray.200"
            >
                <Heading size="md" mb={4}>
                Descargar Plantilla
                </Heading>
                <Text mb={4}>
                Descarga la plantilla Excel y complétala con la información de tus productos.
                </Text>
                <Button
                leftIcon={<Download size={20} />}
                colorScheme="blue"
                onClick={handleDownloadTemplate}
                >
                Descargar Plantilla
                </Button>
            </Box>

            {/* Instrucciones */}
            <Box bg="gray.50" borderRadius="md" p={6}>
                <Heading size="md" mb={4}>
                Instrucciones
                </Heading>
                <List spacing={3}>
                <ListItem>
                    <ListIcon as={CheckCircle} color="blue.500" />
                    Descarga la plantilla Excel.
                </ListItem>
                <ListItem>
                    <ListIcon as={CheckCircle} color="blue.500" />
                    No modifiques el orden de las columnas.
                </ListItem>
                <ListItem>
                    <ListIcon as={CheckCircle} color="blue.500" />
                    Completa todos los campos requeridos (*).
                </ListItem>
                <ListItem>
                    <ListIcon as={CheckCircle} color="blue.500" />
                    Guarda el archivo en formato .xlsx.
                </ListItem>
                <ListItem>
                    <ListIcon as={CheckCircle} color="blue.500" />
                    Sube el archivo en el siguiente paso.
                </ListItem>
                </List>
            </Box>

            {/* Botones de acción */}
            <Flex justify="flex-end" mt={6}>
                <Button variant="outline" onClick={handleCancel} mr={4}>
                Cancelar
                </Button>
                <Button colorScheme="blue" onClick={handleNextStep}>
                Siguiente
                </Button>
            </Flex>
            </Box>
        </Box>
        </Flex>
    );
};

export default MassImport;

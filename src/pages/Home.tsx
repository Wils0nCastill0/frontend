// src\pages\Home.tsx
import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Button,
    Text,
    Icon,
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar';
    import { Navbar } from '../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';
    import { LayoutDashboard, FileText, Users, Settings, Plus, Clipboard } from 'lucide-react';
    import { useNavigate } from 'react-router-dom'; // Importa el hook de navegación

    const Dashboard: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate(); // Inicializa el hook

    // Datos ficticios para las tarjetas
    const sections = [
        {
        title: 'Ventas',
        description: 'Gestiona tus ventas y transacciones',
        icon: LayoutDashboard,
        path: '/sales', // Ruta para redirigir
        },
        {
        title: 'Reportes',
        description: 'Visualiza estadísticas y análisis',
        icon: FileText,
        path: '/reports', // Ruta para redirigir
        },
        {
        title: 'Usuarios',
        description: 'Administra usuarios y permisos',
        icon: Users,
        path: '/users-permissions', // Ruta para redirigir
        },
        {
        title: 'Configuración',
        description: 'Configura tu sistema',
        icon: Settings,
        path: '/system-configuration', // Ruta para redirigir
        },
    ];

    const quickAccess = [
        {
        title: 'Nueva Venta',
        description: 'Crear una nueva transacción',
        icon: Plus,
        path: '/pos', // Ruta para redirigir
        },
        {
        title: 'Reporte Diario',
        description: 'Ver el resumen del día',
        icon: Clipboard,
        path: '/sales-report', // Ruta para redirigir
        },
        {
        title: 'Inventario',
        description: 'Gestionar productos',
        icon: LayoutDashboard,
        path: '/inventory', // Ruta para redirigir
        },
    ];

    return (
        <Flex height="100vh">
        {/* Barra lateral */}
        <CollapsibleSidebar isOpen={isOpen} onToggle={onToggle} />

        {/* Contenido principal */}
        <Box flex="1" ml={isOpen ? '240px' : '60px'} transition="margin-left 0.3s">
            {/* Barra superior */}
            <Navbar onMenuClick={onToggle} userName={''} />
            <Box p={6}>
            {/* Bienvenida */}
            <Box mb={8}>
                <Heading size="lg" mb={2}>Bienvenido, Usuario de Prueba</Heading>
                <Text color="gray.500">¿Qué te gustaría hacer hoy?</Text>
            </Box>

            {/* Secciones principales */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
                {sections.map((section) => (
                <Box
                    key={section.title}
                    bg="white"
                    p={6}
                    shadow="sm"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                    _hover={{ shadow: 'md', cursor: 'pointer' }}
                    onClick={() => navigate(section.path)} // Redirigir al hacer clic
                >
                    <Flex align="center" mb={4}>
                    <Icon as={section.icon} boxSize={6} mr={4} />
                    <Heading size="md">{section.title}</Heading>
                    </Flex>
                    <Text color="gray.500">{section.description}</Text>
                </Box>
                ))}
            </SimpleGrid>

            {/* Accesos rápidos */}
            <Box>
                <Heading size="md" mb={4}>
                Accesos Rápidos
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                {quickAccess.map((access) => (
                    <Button
                    key={access.title}
                    variant="outline"
                    colorScheme="blue"
                    size="lg"
                    p={6}
                    justifyContent="flex-start"
                    leftIcon={<Icon as={access.icon} boxSize={6} />}
                    onClick={() => navigate(access.path)} // Redirigir al hacer clic
                    >
                    <Box textAlign="left">
                        <Text fontWeight="bold">{access.title}</Text>
                        <Text fontSize="sm" color="gray.500">
                        {access.description}
                        </Text>
                    </Box>
                    </Button>
                ))}
                </SimpleGrid>
            </Box>
            </Box>
        </Box>
        </Flex>
    );
};

export default Dashboard;

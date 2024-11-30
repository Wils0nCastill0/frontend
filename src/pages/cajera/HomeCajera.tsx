// src\pages\Home.tsx
import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    Icon,
    } from '@chakra-ui/react';
    import { CollapsibleSidebar } from '../../components/layout/CollapsibleSidebar';
    import { Navbar } from '../../components/layout/Navbar';
    import { useDisclosure } from '@chakra-ui/react';
    import { Settings, ShoppingCart, Package } from 'lucide-react';
    import { useNavigate } from 'react-router-dom';
    import { useEffect, useState } from 'react'; // Importa React hooks
    
    const Dashboard: React.FC = () => {
        const { isOpen, onToggle } = useDisclosure();
        const navigate = useNavigate();
    
        // Estado para almacenar el nombre del usuario
        const [userName, setUserName] = useState<string>('');
    
        
        // Obtener el nombre del usuario de localStorage
        useEffect(() => {
            const storedName = localStorage.getItem('userName');
            setUserName(storedName || 'Usuario'); // Fallback a "Usuario" si no hay nombre
            }, []); 
    
        // Datos ficticios para las tarjetas
        const sections = [
        {
            title: 'POS',
            description: 'Modulo de Venta',
            icon: ShoppingCart,
            path: '/pos',
        },
        {
            title: 'Inventario',
            description: 'Gestionar productos',
            icon: Package,
            path: '/users-permissions',
        },
        {
            title: 'Configuración',
            description: 'Configura tu sistema',
            icon: Settings,
            path: '/system-configuration',
        },
        ];
    
        return (
        <Flex height="100vh">
            {/* Barra lateral */}
            <CollapsibleSidebar isOpen={isOpen} onToggle={onToggle} />
    
            {/* Contenido principal */}
            <Box flex="1" ml={isOpen ? '240px' : '60px'} transition="margin-left 0.3s">
            {/* Barra superior */}
            <Navbar onMenuClick={onToggle} userName={userName} />
            <Box p={6}>
                {/* Bienvenida */}
                <Box mb={8}>
                <Heading size="lg" mb={2}>
                    Bienvenido, {userName}
                </Heading>
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
            </Box>
            </Box>
        </Flex>
        );
    };
    
  export default Dashboard;
  
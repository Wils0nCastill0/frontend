import {
    Box,
    VStack,
    Icon,
    Text,
    Flex,
    IconButton,
    useColorModeValue,
    } from '@chakra-ui/react';
    import { useLocation, useNavigate } from 'react-router-dom';
    import {
        LayoutDashboard,
        ShoppingCart,
        Package,
        LineChart,
        Settings,
        Menu,
        Home,
        Users,
    } from 'lucide-react';
    import { useSelector } from 'react-redux';
    import { RootState } from '../../store';
    
    interface NavItem {
        name: string;
        icon: React.ComponentType;
        path: string;
        roles?: string[];
    }
    
    interface CollapsibleSidebarProps {
        isOpen: boolean; // Control externo del estado abierto/cerrado
        onToggle: () => void; // Función para alternar el estado
    }
    
    const NavItems: NavItem[] = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'POS', icon: ShoppingCart, path: '/pos' },
        { name: 'Productos', icon: Package, path: '/products' },
        { name: 'Ventas', icon: LineChart, path: '/sales' },
        { name: 'Clientes', icon: Users, path: '/clients' },
        { name: 'Usuarios', icon: Users, path: '/users', roles: ['admin'] },
        { name: 'Configuración', icon: Settings, path: '/settings', roles: ['admin'] },
    ];
    
    export const CollapsibleSidebar = ({ isOpen, onToggle }: CollapsibleSidebarProps) => {
        const location = useLocation();
        const navigate = useNavigate();
        const user = useSelector((state: RootState) => state.auth.user);
    
        const NavItem = ({ item }: { item: NavItem }) => {
        const isActive = location.pathname === item.path;
        const bg = useColorModeValue('gray.100', 'gray.700');
    
        if (item.roles && !item.roles.includes(user?.role || '')) {
            return null;
        }
    
        return (
            <Flex
            align="center"
            p="4"
            mx={isOpen ? '4' : '2'}
            borderRadius="lg"
            role="group"
            cursor="pointer"
            bg={isActive ? bg : 'transparent'}
            _hover={{ bg }}
            onClick={() => navigate(item.path)}
            >
            <Icon
                mr={isOpen ? '4' : '0'}
                fontSize="16"
                as={item.icon}
                color={isActive ? 'blue.500' : undefined}
            />
            {isOpen && <Text color={isActive ? 'blue.500' : undefined}>{item.name}</Text>}
            </Flex>
        );
        };
    
        return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={isOpen ? '240px' : '60px'}
            h="100vh"
            pos="fixed"
            transition="width 0.3s"
        >
            <Flex h="20" alignItems="center" mx="3" justifyContent="space-between">
            <IconButton
                aria-label="Toggle Sidebar"
                icon={<Menu />}
                size="sm"
                onClick={onToggle} // Alternar estado al hacer clic
                bg="transparent"
                _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
            />
            </Flex>
            <VStack spacing={1} align="stretch">
            {NavItems.map((item) => (
                <NavItem key={item.name} item={item} />
            ))}
            </VStack>
        </Box>
        );
    };
    
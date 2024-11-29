// pages/UsersPermissions.tsx
import React, { useState, useEffect } from 'react';
import { authApi } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Flex,
    Heading,
    Input,
    Button,
    Text,
    Badge,
    VStack,
    Divider,
    useToast,
    Spinner
} from '@chakra-ui/react';
import { userApi } from '../services/users';
import { User } from '../types';

const UsersPermissions: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const isAuthenticated = authApi.isAuthenticated();
            const token = authApi.getToken();
            
            console.log('¿Está autenticado?:', isAuthenticated);
            console.log('Token actual:', token);

            if (!isAuthenticated) {
                console.log('No autenticado, redirigiendo a login');
                navigate('/login');
                return false;
            }
            return true;
        };

        if (!checkAuth()) return;

        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            console.log('Headers de la petición:', {
                Authorization: `Bearer ${authApi.getToken()}`
            });

            const data = await userApi.getAll();
            console.log('Datos de usuarios recibidos:', data);
            
            setUsers(data || []);
            if (data?.length > 0 && !selectedUser) {
                setSelectedUser(data[0]);
            }
        } catch (error: any) {
            console.error('Error detallado:', {
                message: error.message,
                response: error.response,
                status: error.response?.status
            });

            if (error.response?.status === 401) {
                console.log('Error 401, redirigiendo a login');
                authApi.logout(); // Limpiar estado de autenticación
                navigate('/login');
                return;
            }

            toast({
                title: 'Error al cargar usuarios',
                description: error.response?.data?.message || error.message || 'Error desconocido',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdateUser = async (userId: string, userData: Partial<User>) => {
        try {
            const updatedUser = await userApi.update(userId, userData);
            setUsers(prevUsers => prevUsers.map(user => 
                user.id === userId ? updatedUser : user
            ));
            setSelectedUser(prev => prev?.id === userId ? updatedUser : prev);

            toast({
                title: 'Usuario actualizado',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error: any) {
            if (error?.response?.status === 401) {
                navigate('/login');
                return;
            }

            toast({
                title: 'Error al actualizar usuario',
                description: error?.response?.data?.message || error?.message || 'Error desconocido',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleDeactivateUser = async (userId: string) => {
        try {
            await userApi.deactivate(userId);
            setUsers(prevUsers => prevUsers.map(user => 
                user.id === userId ? { ...user, active: false } : user
            ));
            
            if (selectedUser?.id === userId) {
                setSelectedUser(prev => prev ? { ...prev, active: false } : null);
            }

            toast({
                title: 'Usuario desactivado',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error: any) {
            if (error?.response?.status === 401) {
                navigate('/login');
                return;
            }

            toast({
                title: 'Error al desactivar usuario',
                description: error?.response?.data?.message || error?.message || 'Error desconocido',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Flex height="100vh" justify="center" align="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <Flex height="100vh" bg="gray.50">
            <Box flex="1" p={6}>
                <Flex justify="space-between" align="center" mb={6}>
                    <Heading size="lg">Gestión de Usuarios y Permisos</Heading>
                </Flex>

                <Flex gap={6}>
                    {/* Lista de usuarios */}
                    <Box flex="1" bg="white" borderRadius="md" p={4} shadow="sm" border="1px solid" borderColor="gray.200">
                        <Input
                            placeholder="Buscar usuario..."
                            mb={4}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <VStack align="stretch" spacing={3}>
                            {filteredUsers.map((user) => (
                                <Flex
                                    key={user.id}
                                    justify="space-between"
                                    align="center"
                                    p={3}
                                    bg={selectedUser?.id === user.id ? 'blue.50' : 'white'}
                                    borderRadius="md"
                                    border="1px solid"
                                    borderColor={selectedUser?.id === user.id ? 'blue.300' : 'gray.200'}
                                    onClick={() => setSelectedUser(user)}
                                    cursor="pointer"
                                >
                                    <Flex align="center" gap={4}>
                                        <Box
                                            bg={user.active ? 'blue.500' : 'gray.300'}
                                            color="white"
                                            width="40px"
                                            height="40px"
                                            borderRadius="full"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            fontWeight="bold"
                                        >
                                            {user.name.split(' ').map((n: string) => n[0]).join('')}
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">{user.name}</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                {user.role}
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Badge colorScheme={user.active ? 'green' : 'red'}>
                                        {user.active ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                </Flex>
                            ))}
                        </VStack>
                    </Box>

                    {/* Detalles de usuario */}
                    {selectedUser && (
                        <Box flex="2" bg="white" borderRadius="md" p={6} shadow="sm" border="1px solid" borderColor="gray.200">
                            <Heading size="md" mb={4}>Detalles de Usuario</Heading>
                            <VStack align="stretch" spacing={2} mb={6}>
                                <Flex justify="space-between">
                                    <Text fontWeight="bold">Nombre</Text>
                                    <Text>{selectedUser.name}</Text>
                                </Flex>
                                <Flex justify="space-between">
                                    <Text fontWeight="bold">Email</Text>
                                    <Text>{selectedUser.email}</Text>
                                </Flex>
                                <Flex justify="space-between">
                                    <Text fontWeight="bold">Rol</Text>
                                    <Text>{selectedUser.role}</Text>
                                </Flex>
                            </VStack>

                            <Divider mb={6} />

                            <Flex justify="space-between" mt={6}>
                                <Button 
                                    colorScheme="blue"
                                    onClick={() => selectedUser.id && handleUpdateUser(selectedUser.id, {
                                        role: selectedUser.role === 'admin' ? 'cashier' : 'admin'
                                    })}
                                >
                                    Cambiar Rol
                                </Button>
                                <Button 
                                    colorScheme="red"
                                    onClick={() => selectedUser.id && handleDeactivateUser(selectedUser.id)}
                                    isDisabled={!selectedUser.active}
                                >
                                    Desactivar Usuario
                                </Button>
                            </Flex>
                        </Box>
                    )}
                </Flex>
            </Box>
        </Flex>
    );
};

export default UsersPermissions;
import React, { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Input,
    Button,
    Text,
    Badge,
    VStack,
    HStack,
    Divider,
    } from '@chakra-ui/react';

    // Datos ficticios
    const mockUsers = [
    {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@empresa.com',
        role: 'Administrador',
        isActive: true,
        permissions: {
        pointOfSale: { view: true, edit: true, delete: true },
        inventory: { view: true, edit: true, delete: false },
        },
    },
    {
        id: 2,
        name: 'María González',
        email: 'maria@empresa.com',
        role: 'Cajero',
        isActive: true,
        permissions: {
        pointOfSale: { view: true, edit: false, delete: false },
        inventory: { view: true, edit: false, delete: false },
        },
    },
    ];

    const UsersPermissions: React.FC = () => {
    const [users, setUsers] = useState(mockUsers);
    const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(mockUsers[0]);

    return (
        <Flex height="100vh" bg="gray.50">
        <Box flex="1" p={6}>
            {/* Título y botón */}
            <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg">Gestión de Usuarios y Permisos</Heading>
            <Button colorScheme="blue">Nuevo Usuario</Button>
            </Flex>

            <Flex gap={6}>
            {/* Lista de usuarios */}
            <Box
                flex="1"
                bg="white"
                borderRadius="md"
                p={4}
                shadow="sm"
                border="1px solid"
                borderColor="gray.200"
            >
                <Input
                placeholder="Buscar usuario..."
                mb={4}
                onChange={(e) => {
                    const value = e.target.value.toLowerCase();
                    setUsers(
                    mockUsers.filter(
                        (user) =>
                        user.name.toLowerCase().includes(value) ||
                        user.email.toLowerCase().includes(value)
                    )
                    );
                }}
                />
                <VStack align="stretch" spacing={3}>
                {users.map((user) => (
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
                        bg={user.isActive ? 'blue.500' : 'gray.300'}
                        color="white"
                        width="40px"
                        height="40px"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="bold"
                        >
                        {user.name.split(' ').map((n) => n[0]).join('')}
                        </Box>
                        <Box>
                        <Text fontWeight="bold">{user.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                            {user.role}
                        </Text>
                        </Box>
                    </Flex>
                    <Badge colorScheme={user.isActive ? 'green' : 'red'}>
                        {user.isActive ? 'Activo' : 'Inactivo'}
                    </Badge>
                    </Flex>
                ))}
                </VStack>
            </Box>

            {/* Detalles de usuario y permisos */}
            {selectedUser && (
                <Box
                flex="2"
                bg="white"
                borderRadius="md"
                p={6}
                shadow="sm"
                border="1px solid"
                borderColor="gray.200"
                >
                <Heading size="md" mb={4}>
                    Detalles de Usuario
                </Heading>
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

                <Heading size="md" mb={4}>
                    Permisos
                </Heading>
                <VStack align="stretch" spacing={4}>
                    {Object.entries(selectedUser.permissions).map(([section, perms]) => (
                    <Box key={section}>
                        <Text fontWeight="bold" mb={2}>
                        {section === 'pointOfSale' ? 'Punto de Venta' : 'Inventario'}
                        </Text>
                        <HStack spacing={3}>
                        <Button colorScheme="blue" variant={perms.view ? 'solid' : 'outline'}>
                            Ver
                        </Button>
                        <Button colorScheme="blue" variant={perms.edit ? 'solid' : 'outline'}>
                            Crear/Editar
                        </Button>
                        <Button
                            colorScheme="blue"
                            variant={perms.delete ? 'solid' : 'outline'}
                            isDisabled={!perms.delete}
                        >
                            Eliminar
                        </Button>
                        </HStack>
                    </Box>
                    ))}
                </VStack>

                <Button mt={6} colorScheme="blue" width="100%">
                    Guardar
                </Button>
                </Box>
            )}
            </Flex>
        </Box>
        </Flex>
    );
};

export default UsersPermissions;

import {
  Box,
  Input,
  Button,
  Avatar,
  Badge,
  Stack,
  Flex,
  Text,
  useToast,
  HStack,
 } from '@chakra-ui/react';
 import { useEffect, useState } from 'react';
 import { userApi } from '../services/users';
 import { User } from '../types';
 
 interface ExtendedUser extends User {
  status: string; 
 }
 
 const UsersPermissions = () => {
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();
 
  useEffect(() => {
    fetchUsers();
  }, []);
 
  const fetchUsers = async () => {
    try {
      const usersData = await userApi.getAll();
      const usersWithStatus = usersData.map((user: User) => ({
        ...user,
        status: 'active'
      }));
      setUsers(usersWithStatus);
    } catch (error) {
      toast({
        title: 'Error loading users',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 'error',
        duration: 3000,
      });
    }
   };
 
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePermissionChange = async (type: string, action: string) => {
    // Implement permission change logic here
  };

  return (
    <Box p={5}>
      <Flex justify="space-between" mb={5}>
        <Text fontSize="xl">Gestión de Usuarios y Permisos</Text>
        <Button colorScheme="blue">Nuevo Usuario</Button>
      </Flex>

      <Input
        placeholder="Buscar usuario..."
        mb={5}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Flex>
        <Box w="300px" borderRight="1px" borderColor="gray.200" pr={4}>
          {filteredUsers.map((user) => (
            <Flex
              key={user.id}
              p={3}
              cursor="pointer"
              _hover={{ bg: 'gray.50' }}
              onClick={() => setSelectedUser(user)}
              align="center"
              mb={2}
              borderRadius="md"
              bg={selectedUser?.id === user.id ? 'gray.100' : 'white'}
            >
              <Avatar
                size="sm"
                name={user.name}
                bg="blue.500"
                color="white"
                mr={3}
              />
              <Box flex={1}>
                <Text fontWeight="medium">{user.name}</Text>
                <Text fontSize="sm" color="gray.600">{user.role}</Text>
              </Box>
              <Badge colorScheme={user.status === 'active' ? 'green' : 'red'}>
                {user.status === 'active' ? 'Activo' : 'Inactivo'}
              </Badge>
            </Flex>
          ))}
        </Box>

        {selectedUser && (
          <Box flex={1} pl={6}>
            <Text fontSize="lg" mb={4}>Detalles de Usuario</Text>
            <Stack spacing={4}>
              <Box>
                <Text fontWeight="medium">Nombre</Text>
                <Text>{selectedUser.name}</Text>
              </Box>
              <Box>
                <Text fontWeight="medium">Email</Text>
                <Text>{selectedUser.email}</Text>
              </Box>
              <Box>
                <Text fontWeight="medium">Rol</Text>
                <Text>{selectedUser.role}</Text>
              </Box>

              <Box>
                <Text fontWeight="medium" mb={2}>Permisos</Text>
                <Stack spacing={3}>
                  <Box>
                    <Text mb={2}>Punto de Venta</Text>
                    <HStack spacing={2}>
                      <Button size="sm">Ver</Button>
                      <Button size="sm">Crear/Editar</Button>
                      <Button size="sm">Eliminar</Button>
                    </HStack>
                  </Box>
                  <Box>
                    <Text mb={2}>Inventario</Text>
                    <HStack spacing={2}>
                      <Button size="sm">Ver</Button>
                      <Button size="sm">Crear/Editar</Button>
                      <Button size="sm" isDisabled>Eliminar</Button>
                    </HStack>
                  </Box>
                </Stack>
              </Box>

              <Button colorScheme="blue" mt={4}>
                Guardar
              </Button>
            </Stack>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default UsersPermissions;
import  { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Input,
  Text,
  useToast,
  Avatar,
  Badge,
  Stack,
} from '@chakra-ui/react';
import UserModal from '../components/user/registerModal';
import { userApi } from '../services/users';
import { User } from '../types';

interface ExtendedUser extends User {
  status: string; // Estado derivado como "Activo" o "Inactivo"
}

const UsersPermissions = () => {
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  // Fetch inicial para obtener usuarios
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await userApi.getAll();
      const usersWithStatus = usersData.map((user: User) => ({
        ...user,
        status: user.active ? 'Activo' : 'Inactivo',
      }));
      setUsers(usersWithStatus);
    } catch (error: any) {
      toast({
        title: 'Error al cargar usuarios',
        description: error.response?.data?.message || 'Error desconocido.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUserCreated = (newUser: User) => {
    const extendedUser: ExtendedUser = {
      ...newUser,
      status: newUser.active ? 'Activo' : 'Inactivo',
    };
    setUsers((prevUsers) => [...prevUsers, extendedUser]);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={5}>
      {/* Título y botón para crear nuevo usuario */}
      <Flex justify="space-between" mb={5}>
        <Text fontSize="xl" fontWeight="bold">
          Gestión de Usuarios y Permisos
        </Text>
        <Button colorScheme="blue" onClick={() => setModalOpen(true)}>
          Nuevo Usuario
        </Button>
      </Flex>

      {/* Input para búsqueda */}
      <Input
        placeholder="Buscar usuario..."
        mb={5}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Flex>
        {/* Lista de usuarios */}
        <Box w="300px" borderRight="1px" borderColor="gray.200" pr={4}>
          <Stack spacing={4}>
            {filteredUsers.map((user) => (
              <Flex
                key={user.id}
                p={4}
                align="center"
                bg={selectedUser?.id === user.id ? 'gray.100' : 'white'}
                borderRadius="md"
                boxShadow="sm"
                cursor="pointer"
                _hover={{ bg: 'gray.50' }}
                onClick={() => setSelectedUser(user)}
              >
                <Avatar name={user.name} mr={4} />
                <Box flex="1">
                  <Text fontWeight="medium">{user.name}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {user.role}
                  </Text>
                </Box>
                <Badge colorScheme={user.status === 'Activo' ? 'green' : 'red'}>
                  {user.status}
                </Badge>
              </Flex>
            ))}
          </Stack>
        </Box>

        {/* Detalles del usuario seleccionado */}
        {selectedUser && (
          <Box flex="1" pl={6}>
            <Text fontSize="lg" mb={4}>
              Detalles de Usuario
            </Text>
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
                <Text fontWeight="medium">Estado</Text>
                <Badge
                  colorScheme={selectedUser.status === 'Activo' ? 'green' : 'red'}
                >
                  {selectedUser.status}
                </Badge>
              </Box>
            </Stack>
          </Box>
        )}
      </Flex>

      {/* Modal para nuevo usuario */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onUserCreated={handleUserCreated}
      />
    </Box>
  );
};

export default UsersPermissions;

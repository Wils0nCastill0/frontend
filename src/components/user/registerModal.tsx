import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import { userApi } from '../../services/users'; // Conecta con el API de usuarios

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: (user: any) => void; // Callback para actualizar la lista de usuarios
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cashier'); // Rol por defecto
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const newUser = await userApi.register({ name, email, password, role });
      toast({
        title: 'Usuario creado',
        description: 'El usuario ha sido registrado exitosamente.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onUserCreated(newUser); // Actualiza la lista de usuarios
      onClose(); // Cierra el modal
    } catch (error: any) {
      toast({
        title: 'Error al registrar usuario',
        description: error.response?.data?.message || 'Error desconocido.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nuevo Usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4} isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              placeholder="Nombre del usuario"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Rol</FormLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Administrador</option>
              <option value="cashier">Cajero</option>
              <option value="inventory_manager">Gestor de Inventario</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3} variant="outline" isDisabled={isLoading}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={isLoading}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;

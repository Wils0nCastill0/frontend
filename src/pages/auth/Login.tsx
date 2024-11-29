import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { authApi } from '../../services/api';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(loginStart()); // Dispatch para iniciar el login
      const response = await authApi.login(email, password); // Llamada al API

      const { user, token } = response;

      // Guardar el token en localStorage
      localStorage.setItem('token', token);

      // Dispatch para éxito del login
      dispatch(
        loginSuccess({
          user,
          token,
        })
      );

      // Redirigir al home
      navigate('/home');
    } catch (error: any) {
      // Manejo de errores
      const errorMessage =
        error.response?.data?.message || error.message || 'Error al iniciar sesión';

      dispatch(loginFailure(errorMessage)); // Dispatch para error
      toast({
        title: 'Error al iniciar sesión',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      px={{ base: '4', lg: '8' }}
    >
      <Container
        maxW="sm"
        py={{ base: '12', md: '24' }}
        px={{ base: '4', sm: '8' }}
        bg="white"
        boxShadow="md"
        borderRadius="lg"
      >
        <Stack spacing="6" textAlign="center" mb="8">
          <Text fontSize="3xl" fontWeight="bold">
            SGC
          </Text>
          <Text color="gray.600" fontSize="md">
            Sistema de Gestión Comercial
          </Text>
        </Stack>
        <Box>
          <form onSubmit={handleSubmit}>
            <VStack spacing="6">
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                width="full"
              >
                Iniciar Sesión
              </Button>
            </VStack>
          </form>
          <Text mt="4" fontSize="sm" textAlign="center">
            <Link color="blue.500" href="/forgot-password">
              ¿Olvidaste tu contraseña?
            </Link>
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

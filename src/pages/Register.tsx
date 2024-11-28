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
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/auth'; // Asegúrate de que la ruta sea correcta

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const role = 'admin'; // Define el rol como admin por defecto

        try {
            await authApi.register({ name, email, password, role });
            toast({
                title: 'Registro exitoso',
                description: 'Tu cuenta ha sido creada. Por favor inicia sesión.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/login'); // Redirige al login después de registrarse
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error && error.message
                    ? error.message
                    : 'Error al registrarse';
            toast({
                title: 'Error al registrarse',
                description: errorMessage,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box minH="100vh" py="12" px={{ base: '4', lg: '8' }} bg="gray.50">
            <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
                <Stack spacing="8">
                    <Stack spacing="6" textAlign="center">
                        <Text fontSize="4xl" fontWeight="bold">
                            SGC
                        </Text>
                        <Text color="gray.600" fontSize="lg">
                            Crear una nueva cuenta
                        </Text>
                    </Stack>
                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg="white"
                        boxShadow={{ base: 'none', sm: 'md' }}
                        borderRadius={{ base: 'none', sm: 'xl' }}
                    >
                        <form onSubmit={handleSubmit}>
                            <VStack spacing="6">
                                <FormControl id="name">
                                    <FormLabel>Nombre</FormLabel>
                                    <Input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </FormControl>
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
                                {/* El campo de rol se elimina porque siempre será admin */}
                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    size="lg"
                                    fontSize="md"
                                    width="full"
                                >
                                    Registrarse
                                </Button>
                            </VStack>
                        </form>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

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
import { authApi } from '../services/api'; // Cambiado a importar desde api.ts

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const userData = {
                name,
                email,
                password,
                role: 'admin' // Role por defecto
            };
    
            console.log('Intentando registro con:', userData);
            
            const response = await authApi.register(userData);
            console.log('Registro exitoso:', response);
    
            toast({
                title: 'Registro exitoso',
                description: 'Tu cuenta ha sido creada. Por favor inicia sesión.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            
            navigate('/login');
        } catch (error: any) {
            console.error('Error detallado:', error);
            
            const errorMessage = error.message || 'Error desconocido en el registro';
            
            toast({
                title: 'Error al registrarse',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }finally {
            setIsLoading(false)
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
                                        isDisabled={isLoading}
                                    />
                                </FormControl>
                                <FormControl id="email">
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        isDisabled={isLoading}
                                    />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Contraseña</FormLabel>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        isDisabled={isLoading}
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    size="lg"
                                    fontSize="md"
                                    width="full"
                                    isLoading={isLoading}
                                    loadingText="Registrando..."
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
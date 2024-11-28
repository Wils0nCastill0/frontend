import React, { useState, ReactNode } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

export const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const errorTextColor = useColorModeValue('gray.500', 'gray.500');

  const handleReload = () => {
    window.location.reload();
  };

  const handleError = (error: Error) => {
    setHasError(true);
    setError(error);
  };

  // Simular `getDerivedStateFromError`
  React.useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      handleError(event.error);
    };

    window.addEventListener('error', handleGlobalError);

    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  if (hasError) {
    return (
      <Container maxW="xl" py={10}>
        <VStack
          spacing={6}
          p={8}
          bg={bgColor}
          boxShadow="lg"
          borderRadius="lg"
          align="center"
        >
          <Box textAlign="center">
            <Heading size="xl" mb={4} color="red.500">
              ¡Ups! Algo salió mal
            </Heading>
            <Text fontSize="lg" color={textColor} mb={6}>
              Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
            </Text>
            {error && (
              <Text fontSize="sm" color={errorTextColor} mb={4}>
                Error: {error.message}
              </Text>
            )}
            <Button leftIcon={<RefreshCcw />} colorScheme="blue" onClick={handleReload}>
              Recargar página
            </Button>
          </Box>
        </VStack>
      </Container>
    );
  }

  return <>{children}</>;
};

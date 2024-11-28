import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { RefreshCw, AlertCircle } from 'lucide-react';
  
  interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
  }
  
  export const ErrorState = ({
    title = 'Ha ocurrido un error',
    message = 'No se pudo cargar la información solicitada. Por favor, intenta nuevamente.',
    onRetry,
  }: ErrorStateProps) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.600', 'gray.400');
  
    return (
      <Box
        p={8}
        bg={bgColor}
        borderRadius="lg"
        shadow="sm"
        w="full"
        maxW="lg"
        mx="auto"
        textAlign="center"
      >
        <VStack spacing={6}>
          <Box
            p={4}
            bg="red.50"
            borderRadius="full"
            color="red.500"
            _dark={{
              bg: 'red.900',
              color: 'red.200',
            }}
          >
            <AlertCircle size={40} />
          </Box>
  
          <VStack spacing={2}>
            <Heading size="lg" color="red.500">
              {title}
            </Heading>
            <Text color={textColor}>{message}</Text>
          </VStack>
  
          {onRetry && (
            <Button
              leftIcon={<RefreshCw size={16} />}
              colorScheme="blue"
              onClick={onRetry}
            >
              Reintentar
            </Button>
          )}
        </VStack>
      </Box>
    );
  };
import {
    Center,
    Spinner,
    Text,
    VStack,
    SpinnerProps,
    Box
  } from '@chakra-ui/react';
  
  interface LoadingSpinnerProps extends SpinnerProps {
    message?: string;
    fullScreen?: boolean;
  }
  
  export const LoadingSpinner = ({ 
    message = 'Cargando...', 
    fullScreen = false,
    size = 'xl',
    ...props 
  }: LoadingSpinnerProps) => {
    const content = (
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size={size}
          {...props}
        />
        {message && (
          <Text color="gray.600" fontSize="lg">
            {message}
          </Text>
        )}
      </VStack>
    );
  
    if (fullScreen) {
      return (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="whiteAlpha.900"
          zIndex={9999}
        >
          <Center height="100vh">
            {content}
          </Center>
        </Box>
      );
    }
  
    return <Center py={8}>{content}</Center>;
  };
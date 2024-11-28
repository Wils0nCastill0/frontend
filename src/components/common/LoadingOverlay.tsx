import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay = ({ message = 'Cargando...' }: LoadingOverlayProps) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.600"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        spacing={4}
        p={6}
        bg="white"
        rounded="md"
        shadow="lg"
        _dark={{
          bg: 'gray.800',
        }}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
        <Text color="gray.600" fontSize="lg" fontWeight="medium">
          {message}
        </Text>
      </VStack>
    </Box>
  );
};
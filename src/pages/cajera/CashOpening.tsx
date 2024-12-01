// src/pages/CashOpening.tsx
import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  HStack,
  useToast,
} from '@chakra-ui/react';

const CashOpening: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState(100000);
  const toast = useToast();


  const handleOpenCash = () => {
    // Aquí se integraría la API para enviar los datos de apertura de caja
    toast({
      title: "Caja abierta exitosamente.",
      description: `Monto inicial: $${initialAmount.toLocaleString()}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };


  return (
    <Flex direction="column" align="center" p={6} bg="gray.50" minH="100vh">
      <Box
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
        w="100%"
        maxW="500px"
        border="1px solid"
        borderColor="gray.200"
      >
        {/* Encabezado */}
        <Heading size="lg" mb={6} textAlign="center">
          Apertura de Caja
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={4} textAlign="center">
          {new Date().toLocaleDateString("es-CL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          - {new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}
        </Text>

        {/* Monto Inicial */}
        <Box mb={6}>
          <Text fontWeight="bold" mb={2}>
            Monto Inicial
          </Text>
          <Input
            type="number"
            value={initialAmount}
            onChange={(e) => setInitialAmount(parseInt(e.target.value) || 0)}
            mb={4}
          />
        </Box>

        {/* Observaciones */}
        <Box mb={6}>
          <Text fontWeight="bold" mb={2}>
            Observaciones
          </Text>
          <Input placeholder="Notas adicionales" />
        </Box>

        {/* Botones */}
        <HStack spacing={4} mt={4}>
          <Button variant="outline" width="50%" onClick={() => console.log("Cancelar")}>
            Cancelar
          </Button>
          <Button colorScheme="blue" width="50%" onClick={handleOpenCash}>
            Abrir Caja
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default CashOpening;

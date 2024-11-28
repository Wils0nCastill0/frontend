// src/components/pos/PaymentModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Box,
  Text,
  Input,
} from '@chakra-ui/react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, total }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('Efectivo');
  const [receivedAmount, setReceivedAmount] = useState<number>(0);

  // Calcular el vuelto solo si el método de pago es "Efectivo"
  const change = paymentMethod === 'Efectivo' && receivedAmount > 0 ? Math.max(receivedAmount - total, 0) : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Procesar Pago</ModalHeader>
        <ModalBody>
          {/* Total a Pagar */}
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Total a Pagar
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              ${total.toLocaleString()}
            </Text>
          </Box>

          {/* Método de Pago */}
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Método de Pago
            </Text>
            <Flex gap={2}>
              {['Efectivo', 'Débito', 'Crédito', 'Transferencia'].map((method) => (
                <Button
                  key={method}
                  size="sm"
                  onClick={() => {
                    setPaymentMethod(method);
                    setReceivedAmount(0); // Reiniciar el monto recibido si cambia el método
                  }}
                  colorScheme={paymentMethod === method ? 'blue' : 'gray'}
                >
                  {method}
                </Button>
              ))}
            </Flex>
          </Box>

          {/* Mostrar monto recibido y vuelto solo para "Efectivo" */}
          {paymentMethod === 'Efectivo' && (
            <>
              <Box mb={4}>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Monto Recibido
                </Text>
                <Input
                  type="number"
                  placeholder="Ingresa el monto recibido"
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(parseFloat(e.target.value) || 0)}
                />
                <Flex mt={2} gap={2}>
                  {[50000, 40000, 30000].map((amount) => (
                    <Button
                      key={amount}
                      size="sm"
                      variant="outline"
                      onClick={() => setReceivedAmount(amount)}
                    >
                      ${amount.toLocaleString()}
                    </Button>
                  ))}
                </Flex>
              </Box>
              <Box bg="green.100" p={4} borderRadius="md">
                <Flex justify="space-between">
                  <Text>Vuelto:</Text>
                  <Text fontSize="lg" fontWeight="bold" color="green.600">
                    ${change.toLocaleString()}
                  </Text>
                </Flex>
              </Box>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar (ESC)
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              alert('Pago procesado'); // Cambiar por integración de API
              onClose();
            }}
          >
            Confirmar Pago
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

import  { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  Input,
} from '@chakra-ui/react';
import ReceiptPreviewModal from '../../pages/ReceiptPreviewModal';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, total }) => {
  const [paymentMethod] = useState<string>('Efectivo');
  const [receivedAmount, setReceivedAmount] = useState<number>(0);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const change = paymentMethod === 'Efectivo' ? Math.max(receivedAmount - total, 0) : 0;

  const receiptData = {
    storeName: 'SUPERMERCADO SAN ARMANDO',
    storeRut: '76.543.210-K',
    storeAddress: 'Calle Principal #123, Vicuña',
    receiptNumber: '1234',
    date: new Date().toLocaleString(),
    cashier: 'Juan Pérez',
    items: [
      { quantity: 2, name: 'Coca Cola 2L', price: 5000 },
      { quantity: 3, name: 'Pan Molde', price: 5970 },
      { quantity: 1, name: 'Leche 1L', price: 1290 },
    ],
    subtotal: 12260,
    tax: 2329,
    total: total,
    paid: receivedAmount,
    change: change,
    footerMessage: '¡Gracias por su compra!',
  };

  const handleConfirmPayment = () => {
    onClose(); // Cerrar el modal de pago
    setIsReceiptOpen(true); // Abrir la vista previa de boleta
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Procesar Pago</ModalHeader>
          <ModalBody>
            <Box>
              <Text>Total a Pagar: ${total.toLocaleString()}</Text>
              {paymentMethod === 'Efectivo' && (
                <>
                  <Input
                    placeholder="Monto recibido"
                    value={receivedAmount}
                    onChange={(e) => setReceivedAmount(parseFloat(e.target.value) || 0)}
                  />
                  <Text>Vuelto: ${change.toLocaleString()}</Text>
                </>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleConfirmPayment}>
              Confirmar Pago
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Vista Previa de la Boleta */}
      <ReceiptPreviewModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        receiptData={receiptData}
      />
    </>
  );
};

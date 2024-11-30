import { useState } from 'react';
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
  Select,
} from '@chakra-ui/react';
import ReceiptPreviewModal from '../../pages/ReceiptPreviewModal';
import { useCart } from '../../hooks/useCart';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => Promise<void>; // Agregar esta propiedad
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onComplete }) => {
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>('Efectivo');
  const [receivedAmount, setReceivedAmount] = useState<number>(0);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.19);
  const totalWithVAT = subtotal + tax;
  const change = paymentMethod === 'Efectivo' ? Math.max(receivedAmount - totalWithVAT, 0) : 0;

  const receiptData = {
    storeName: 'SUPERMERCADO SAN ARMANDO',
    storeRut: '76.543.210-K',
    storeAddress: 'Calle Principal #123, Vicuña',
    receiptNumber: '1234',
    date: new Date().toLocaleString(),
    cashier: 'Juan Pérez',
    items: cartItems.map(item => ({
      quantity: item.quantity,
      name: item.product.name,
      price: item.product.price
    })),
    subtotal: subtotal,
    tax: tax,
    total: totalWithVAT,
    paid: receivedAmount,
    change: change,
    footerMessage: '¡Gracias por su compra!',
  };

  const handleConfirmPayment = async () => {
    await onComplete();
    setIsReceiptOpen(true); // Open receipt preview after payment
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Procesar Pago</ModalHeader>
          <ModalBody>
            <Box>
              <Text>Total a Pagar: ${totalWithVAT.toLocaleString()}</Text>
              <Select
                placeholder="Seleccionar método de pago"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                mb={4}
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Debito">Débito</option>
                <option value="Credito">Crédito</option>
              </Select>
              {paymentMethod === 'Efectivo' && (
                <>
                  <Input
                    placeholder="Monto recibido"
                    value={receivedAmount}
                    onChange={(e) => setReceivedAmount(parseFloat(e.target.value) || 0)}
                  />
                  <Text>Vuelto: ${Math.round(change).toLocaleString()}</Text>
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

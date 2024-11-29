// src/components/pos/ReceiptPreviewModal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Button,
  VStack,
  Divider,
} from '@chakra-ui/react';

interface ReceiptPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData: {
    storeName: string;
    storeRut: string;
    storeAddress: string;
    receiptNumber: string;
    date: string;
    cashier: string;
    items: { quantity: number; name: string; price: number }[];
    subtotal: number;
    tax: number;
    total: number;
    paid: number;
    change: number;
    footerMessage: string;
  };
}

const ReceiptPreviewModal: React.FC<ReceiptPreviewModalProps> = ({
  isOpen,
  onClose,
  receiptData,
}) => {
  const handlePrint = () => {
    console.log('Printing receipt...');
    // Aquí puedes integrar lógica para impresión, por ejemplo, utilizando `window.print()`
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Vista Previa Boleta</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign="center" mb={4}>
            <Text fontWeight="bold" fontSize="lg">{receiptData.storeName}</Text>
            <Text fontSize="sm">RUT: {receiptData.storeRut}</Text>
            <Text fontSize="sm">{receiptData.storeAddress}</Text>
            <Divider my={2} />
            <Text fontWeight="bold">BOLETA ELECTRÓNICA Nº {receiptData.receiptNumber}</Text>
            <Text fontSize="sm">Fecha: {receiptData.date}</Text>
            <Text fontSize="sm">Caja: {receiptData.cashier}</Text>
          </Box>
          <VStack align="stretch" spacing={2}>
            {receiptData.items.map((item, index) => (
              <Box key={index} display="flex" justifyContent="space-between">
                <Text>
                  {item.quantity}x {item.name}
                </Text>
                <Text>${item.price.toLocaleString()}</Text>
              </Box>
            ))}
          </VStack>
          <Divider my={2} />
          <Box display="flex" justifyContent="space-between">
            <Text>Subtotal</Text>
            <Text>${receiptData.subtotal.toLocaleString()}</Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text>IVA (19%)</Text>
            <Text>${receiptData.tax.toLocaleString()}</Text>
          </Box>
          <Box display="flex" justifyContent="space-between" fontWeight="bold">
            <Text>TOTAL</Text>
            <Text>${receiptData.total.toLocaleString()}</Text>
          </Box>
          <Divider my={2} />
          <Box display="flex" justifyContent="space-between">
            <Text>Efectivo</Text>
            <Text>${receiptData.paid.toLocaleString()}</Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text>Vuelto</Text>
            <Text>${receiptData.change.toLocaleString()}</Text>
          </Box>
          <Divider my={2} />
          <Text textAlign="center" fontSize="sm">{receiptData.footerMessage}</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button colorScheme="blue" onClick={handlePrint} ml={3}>
            Imprimir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReceiptPreviewModal;

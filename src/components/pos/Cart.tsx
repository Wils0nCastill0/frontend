import { Box, VStack, Divider, Text, Button } from '@chakra-ui/react';
import { CartItem } from '../../types';

interface CartProps {
  cartItems: CartItem[];
  total: number;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ cartItems, total, onCheckout }) => {
  return (
    <Box bg="white" rounded="lg" shadow="sm" p={4}>
      <VStack spacing={4} align="stretch">
        {cartItems.map((item) => (
          <Box
            key={item.productId}
            p={4}
            borderWidth="1px"
            rounded="lg"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>
              {item.product.name} x {item.quantity}
            </Text>
            <Text>${item.subtotal}</Text>
          </Box>
        ))}
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold">Total</Text>
          <Text fontWeight="bold">${total}</Text>
        </Box>
        <Button colorScheme="green" size="lg" width="full" onClick={onCheckout} disabled={cartItems.length === 0}>
          Pagar
        </Button>
      </VStack>
    </Box>
  );
};

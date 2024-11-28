import {
  Box,
  VStack,
  Text,
  Badge,
  IconButton,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getStockColor = (stock: number): string => {
    const minimumStock = product.minimumStock || 0; // Valor predeterminado
    if (stock <= 0) return 'red';
    if (stock <= minimumStock) return 'yellow';
    return 'green';
  };

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      _hover={{ shadow: 'md' }}
      transition="all 0.2s"
    >
      <Box p={4}>
        <VStack align="stretch" spacing={2}>
          <Box position="relative">
            <Box
              bg="gray.100"
              h="140px"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _dark={{ bg: 'gray.700' }}
            >
              <Text
                fontSize="5xl"
                color="gray.400"
                _dark={{ color: 'gray.500' }}
              >
                {product.name[0]}
              </Text>
            </Box>
            <Badge
              position="absolute"
              top={2}
              right={2}
              colorScheme={getStockColor(product.stock)}
            >
              Stock: {product.stock}
            </Badge>
          </Box>

          <VStack align="stretch" spacing={1}>
            <Text
              fontWeight="semibold"
              fontSize="md"
              noOfLines={2}
              height="40px"
            >
              {product.name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              SKU: {product.sku}
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="blue.500">
              {formatCurrency(product.price)}
            </Text>
          </VStack>

          <Tooltip
            label={
              product.stock <= 0
                ? 'Sin stock disponible'
                : 'Agregar al carrito'
            }
          >
            <IconButton
              aria-label="Agregar al carrito"
              icon={<Plus size={20} />}
              colorScheme="blue"
              width="100%" // Compatible con Chakra UI
              onClick={onAddToCart}
              isDisabled={product.stock <= 0}
            />
          </Tooltip>
        </VStack>
      </Box>
    </Box>
  );
};

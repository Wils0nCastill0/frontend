import { Box, VStack, Text, Button } from '@chakra-ui/react';
import { Product } from '../../types';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, onAddToCart }) => {
  return (
    <Box bg="white" rounded="lg" shadow="sm" p={4} overflowY="auto">
      <VStack spacing={4}>
        {products.map((product) => (
          <Box
            key={product.id}
            p={4}
            borderWidth="1px"
            rounded="lg"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontWeight="bold">{product.name}</Text>
            <Text>${product.price}</Text>
            <Button size="sm" colorScheme="blue" onClick={() => onAddToCart(product)}>
              Agregar
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

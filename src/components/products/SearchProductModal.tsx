// src/components/pos/SearchProductModal.tsx
import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { Product } from '../../types/index';

interface SearchProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

const SearchProductModal: React.FC<SearchProductModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  products = [],
}) => {
  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  // Filtro de productos basado en la búsqueda
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.includes(searchQuery)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Buscar Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Buscar por nombre o código..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            mb={4}
          />
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>CÓDIGO</Th>
                <Th>PRODUCTO</Th>
                <Th isNumeric>STOCK</Th>
                <Th isNumeric>PRECIO</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredProducts.map((product) => (
                <Tr
                  key={product.id}
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  onClick={() => onSelectProduct(product)}
                >
                  <Td>{product.id}</Td>
                  <Td>{product.name}</Td>
                  <Td isNumeric>{product.stock}</Td>
                  <Td isNumeric>${Math.round(product.price)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchProductModal;

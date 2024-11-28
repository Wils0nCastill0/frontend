import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { productsApi } from '../services/api';
import ProductModal from '../components/products/ProductModal';
import { DeleteAlert } from '../components/common/DeleteAlert';
import { Product } from '../types';

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteAlert = useDisclosure();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsApi.getAll();
      const mappedProducts: Product[] = response.map((product) => ({
        ...product,
        id: product.id || '',
        isActive: product.isActive ?? true,
        createdAt: product.createdAt ?? new Date().toISOString(),
        updatedAt: product.updatedAt ?? new Date().toISOString(),
      }));
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleNewProduct = () => {
    setSelectedProduct(null); // Limpiar el producto seleccionado
    onOpen(); // Abrir el modal
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product); // Establecer el producto seleccionado
    onOpen(); // Abrir el modal
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await productsApi.delete(selectedProduct.id);
        fetchProducts();
        deleteAlert.onClose();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Productos</Heading>
        <Button
          leftIcon={<Plus />}
          colorScheme="blue"
          onClick={handleNewProduct} // Llamar a la función al hacer clic
        >
          Nuevo Producto
        </Button>
      </Flex>

      <Box mb={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search size={20} />
          </InputLeftElement>
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Box>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>SKU</Th>
            <Th>Nombre</Th>
            <Th>Categoría</Th>
            <Th isNumeric>Precio</Th>
            <Th isNumeric>Stock</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredProducts.map((product) => (
            <Tr key={product.id}>
              <Td>{product.sku}</Td>
              <Td>{product.name}</Td>
              <Td>{product.category}</Td>
              <Td isNumeric>${product.price.toFixed(2)}</Td>
              <Td isNumeric>
                <Badge colorScheme={product.stock > 5 ? 'green' : 'red'}>
                  {product.stock}
                </Badge>
              </Td>
              <Td>
                <IconButton
                  aria-label="Edit product"
                  icon={<Edit2 size={16} />}
                  size="sm"
                  mr={2}
                  onClick={() => handleEdit(product)}
                />
                <IconButton
                  aria-label="Delete product"
                  icon={<Trash2 size={16} />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => {
                    setSelectedProduct(product);
                    deleteAlert.onOpen();
                  }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal para nuevo producto o edición */}
      {isOpen && (
        <ProductModal
          isOpen={isOpen}
          onClose={onClose}
          product={selectedProduct}
          onSuccess={fetchProducts}
        />
      )}

      {/* Alerta para eliminar producto */}
      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        onClose={deleteAlert.onClose}
        onConfirm={handleDelete}
        title="Eliminar Producto"
        message="¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer."
      />
    </Box>
  );
};

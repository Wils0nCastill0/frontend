import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Grid,
  GridItem,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Product, productsApi } from '../../services/api';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: (product: Product) => void; // Prop para notificar creación
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onProductCreated }) => {
  const [formData, setFormData] = useState({
    sku: '',
    barcode: '',
    name: '',
    category: '',
    brand: '',
    purchasePrice: 0,
    salePrice: 0,
    initialStock: 0,
    minStock: 0,
    tax: '',
    status: 'activo',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'purchasePrice' || name === 'salePrice' || name === 'initialStock' || name === 'minStock'
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const newProduct = await productsApi.create({
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        price: formData.salePrice,
        stock: formData.initialStock,
         // Valor predeterminado
      });
      toast({
        title: 'Producto creado',
        description: 'El producto ha sido creado exitosamente.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onProductCreated(newProduct); // Notificar al componente padre
      onClose(); // Cerrar el modal
    } catch (error: any) {
      if (error.response?.data) {
        toast({
          title: 'Error al crear producto',
          description: error.response.data.message || 'Error desconocido.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error('Error inesperado:', error);
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      align="center"
      justify="center"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex="1000"
    >
      <Box
        bg="white"
        p={6}
        borderRadius="md"
        shadow="lg"
        width={{ base: '95%', md: '700px' }}
      >
        {/* Encabezado */}
        <Heading size="md" mb={6}>
          Agregar Producto
        </Heading>

        {/* Formulario */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <Text mb={2}>Código *</Text>
            <Input name="sku" value={formData.sku} onChange={handleChange} placeholder="Código" />
          </GridItem>
          <GridItem>
            <Text mb={2}>Código de Barras</Text>
            <Input name="barcode" value={formData.barcode} onChange={handleChange} placeholder="Código de Barras" />
          </GridItem>
          <GridItem colSpan={2}>
            <Text mb={2}>Nombre del Producto *</Text>
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre del Producto" />
          </GridItem>
          <GridItem>
            <Text mb={2}>Categoría *</Text>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Seleccionar Categoría"
            >
              <option value="bebidas">Bebidas</option>
              <option value="panadería">Panadería</option>
              <option value="lácteos">Lácteos</option>
            </Select>
          </GridItem>
          <GridItem>
            <Text mb={2}>Marca</Text>
            <Select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Seleccionar Marca"
            >
              <option value="marca1">Marca 1</option>
              <option value="marca2">Marca 2</option>
            </Select>
          </GridItem>
          <GridItem>
            <Text mb={2}>Precio de Compra *</Text>
            <Input
              name="purchasePrice"
              type="number"
              value={formData.purchasePrice}
              onChange={handleChange}
              placeholder="$"
            />
          </GridItem>
          <GridItem>
            <Text mb={2}>Precio de Venta *</Text>
            <Input
              name="salePrice"
              type="number"
              value={formData.salePrice}
              onChange={handleChange}
              placeholder="$"
            />
          </GridItem>
          <GridItem>
            <Text mb={2}>Stock Inicial</Text>
            <Input
              name="initialStock"
              type="number"
              value={formData.initialStock}
              onChange={handleChange}
              placeholder="0"
            />
          </GridItem>
          <GridItem>
            <Text mb={2}>Stock Mínimo</Text>
            <Input
              name="minStock"
              type="number"
              value={formData.minStock}
              onChange={handleChange}
              placeholder="0"
            />
          </GridItem>
          <GridItem>
            <Text mb={2}>Impuesto</Text>
            <Select name="tax" value={formData.tax} onChange={handleChange} placeholder="Seleccionar Impuesto">
              <option value="iva19">IVA 19%</option>
              <option value="iva10">IVA 10%</option>
            </Select>
          </GridItem>
          <GridItem>
            <Text mb={2}>Estado</Text>
            <Select name="status" value={formData.status} onChange={handleChange} placeholder="Activo">
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </Select>
          </GridItem>
        </Grid>

        {/* Botones */}
        <Flex justify="flex-end" mt={6}>
          <Button variant="outline" mr={4} onClick={onClose} isDisabled={loading}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={loading} loadingText="Guardando...">
            Guardar
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductModal;

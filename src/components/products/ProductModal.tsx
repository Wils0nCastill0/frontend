import React from 'react';
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
} from '@chakra-ui/react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
          Nuevo Producto
        </Heading>

        {/* Formulario */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <Text mb={2}>Código *</Text>
            <Input placeholder="Código" />
          </GridItem>
          <GridItem>
            <Text mb={2}>Código de Barras</Text>
            <Input placeholder="Código de Barras" />
          </GridItem>
          <GridItem colSpan={2}>
            <Text mb={2}>Nombre del Producto *</Text>
            <Input placeholder="Nombre del Producto" />
          </GridItem>
          <GridItem>
            <Text mb={2}>Categoría *</Text>
            <Select placeholder="Seleccionar Categoría">
              <option value="bebidas">Bebidas</option>
              <option value="panadería">Panadería</option>
              <option value="lácteos">Lácteos</option>
            </Select>
          </GridItem>
          <GridItem>
            <Text mb={2}>Marca</Text>
            <Select placeholder="Seleccionar Marca">
              <option value="marca1">Marca 1</option>
              <option value="marca2">Marca 2</option>
            </Select>
          </GridItem>
          <GridItem>
            <Text mb={2}>Precio de Compra *</Text>
            <Input placeholder="$" type="number" />
          </GridItem>
          <GridItem>
            <Text mb={2}>Precio de Venta *</Text>
            <Input placeholder="$" type="number" />
          </GridItem>
          <GridItem>
            <Text mb={2}>Stock Inicial</Text>
            <Input placeholder="0" type="number" />
          </GridItem>
          <GridItem>
            <Text mb={2}>Stock Mínimo</Text>
            <Input placeholder="0" type="number" />
          </GridItem>
          <GridItem>
            <Text mb={2}>Impuesto</Text>
            <Select placeholder="Seleccionar Impuesto">
              <option value="iva19">IVA 19%</option>
              <option value="iva10">IVA 10%</option>
            </Select>
          </GridItem>
          <GridItem>
            <Text mb={2}>Estado</Text>
            <Select placeholder="Activo">
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </Select>
          </GridItem>
        </Grid>

        {/* Botones */}
        <Flex justify="flex-end" mt={6}>
          <Button variant="outline" mr={4} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue">Guardar</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductModal;

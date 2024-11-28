import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Text,
    Grid,
    GridItem,
    Box,
    Divider,
    VStack,
    HStack,
    Button,
    useToast,
  } from '@chakra-ui/react';
  import { Sale } from '../../types';
  import { format } from 'date-fns';
  import { es } from 'date-fns/locale';
  import { Printer, Download } from 'lucide-react';
  
  interface SaleDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    sale: Sale | null;
  }
  
  export const SaleDetailsModal = ({ isOpen, onClose, sale }: SaleDetailsModalProps) => {
    const toast = useToast();
  
    if (!sale) return null;
  
    const handlePrint = () => {
      window.print();
    };
  
    const handleDownload = () => {
      // Aquí iría la lógica para descargar el PDF
      toast({
        title: "Próximamente",
        description: "La descarga de PDF estará disponible pronto",
        status: "info",
        duration: 3000,
      });
    };
  
    const StatusBadge = ({ status }: { status: string }) => {
      const statusProps = {
        completed: { colorScheme: 'green', text: 'Completada' },
        pending: { colorScheme: 'yellow', text: 'Pendiente' },
        cancelled: { colorScheme: 'red', text: 'Cancelada' },
      }[status];
  
      return (
        <Badge colorScheme={statusProps?.colorScheme} variant="subtle">
          {statusProps?.text}
        </Badge>
      );
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles de Venta</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody pb={6}>
            <VStack spacing={6} align="stretch">
              {/* Información General */}
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <Text fontWeight="bold">ID Venta:</Text>
                      <Text>{sale.id}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Fecha:</Text>
                      <Text>
                        {format(new Date(sale.createdAt), 'PPpp', { locale: es })}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Estado:</Text>
                      <StatusBadge status={sale.status} />
                    </HStack>
                  </VStack>
                </GridItem>
                
                <GridItem>
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <Text fontWeight="bold">Vendedor:</Text>
                      <Text>{sale.user?.name || 'N/A'}</Text>
                    </HStack>
                    {sale.notes && (
                      <HStack alignItems="start">
                        <Text fontWeight="bold">Notas:</Text>
                        <Text>{sale.notes}</Text>
                      </HStack>
                    )}
                  </VStack>
                </GridItem>
              </Grid>
  
              <Divider />
  
              {/* Detalle de Productos */}
              <Box>
                <Text fontWeight="bold" mb={2}>Productos</Text>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Producto</Th>
                      <Th isNumeric>Cantidad</Th>
                      <Th isNumeric>Precio Unit.</Th>
                      <Th isNumeric>Subtotal</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {sale.items.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.product?.name || 'Producto no disponible'}</Td>
                        <Td isNumeric>{item.quantity}</Td>
                        <Td isNumeric>${item.unitPrice.toFixed(2)}</Td>
                        <Td isNumeric>${item.subtotal.toFixed(2)}</Td>
                      </Tr>
                    ))}
                    <Tr>
                      <Td colSpan={3} textAlign="right" fontWeight="bold">
                        Total:
                      </Td>
                      <Td isNumeric fontWeight="bold">
                        ${sale.total.toFixed(2)}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
  
              <Divider />
  
              {/* Acciones */}
              <HStack spacing={4} justify="flex-end">
                <Button
                  leftIcon={<Printer size={16} />}
                  onClick={handlePrint}
                  variant="ghost"
                >
                  Imprimir
                </Button>
                <Button
                  leftIcon={<Download size={16} />}
                  onClick={handleDownload}
                  colorScheme="blue"
                >
                  Descargar PDF
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
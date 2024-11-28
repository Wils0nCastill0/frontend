import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    TableContainer,
    Text,
    Tooltip,
  } from '@chakra-ui/react';
  import { MoreVertical, FileText, Ban } from 'lucide-react';
  import { Sale } from '../../types';
  import { format } from 'date-fns';
  import { es } from 'date-fns/locale';
  
  interface SaleTableProps {
    sales: Sale[];
    onViewDetails: (sale: Sale) => void;
    onCancelSale: (sale: Sale) => void;
  }
  
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
  
  export const SaleTable = ({ sales, onViewDetails, onCancelSale }: SaleTableProps) => {
    return (
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Fecha</Th>
              <Th>Cliente</Th>
              <Th isNumeric>Total</Th>
              <Th>Estado</Th>
              <Th>Items</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sales.map((sale) => (
              <Tr key={sale.id}>
                <Td>{sale.id.slice(0, 8)}</Td>
                <Td>
                  <Tooltip 
                    label={format(new Date(sale.createdAt), 'PPpp', { locale: es })}
                    placement="top"
                  >
                    <Text>
                      {format(new Date(sale.createdAt), 'dd/MM/yyyy HH:mm')}
                    </Text>
                  </Tooltip>
                </Td>
                <Td>{sale.user?.name || 'N/A'}</Td>
                <Td isNumeric>${sale.total.toFixed(2)}</Td>
                <Td>
                  <StatusBadge status={sale.status} />
                </Td>
                <Td isNumeric>
                  {sale.items.reduce((acc, item) => acc + item.quantity, 0)}
                </Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<MoreVertical size={16} />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem 
                        icon={<FileText size={16} />}
                        onClick={() => onViewDetails(sale)}
                      >
                        Ver detalles
                      </MenuItem>
                      {sale.status === 'completed' && (
                        <MenuItem 
                          icon={<Ban size={16} />}
                          onClick={() => onCancelSale(sale)}
                          color="red.500"
                        >
                          Cancelar venta
                        </MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateFilters, clearFilters } from '../../store/slices/saleSlice';
import { RefreshCw } from 'lucide-react';

export const SaleFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.sales.filters);

  const handleFilterChange = (field: string, value: string) => {
    dispatch(updateFilters({ [field]: value || null }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <Box bg="white" p={4} borderRadius="md" shadow="sm">
      <Flex gap={4} flexWrap="wrap">
        <FormControl minW="200px">
          <FormLabel>Fecha Inicio</FormLabel>
          <Input
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
          />
        </FormControl>

        <FormControl minW="200px">
          <FormLabel>Fecha Fin</FormLabel>
          <Input
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
          />
        </FormControl>

        <FormControl minW="200px">
          <FormLabel>Estado</FormLabel>
          <Select
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">Todos</option>
            <option value="completed">Completada</option>
            <option value="pending">Pendiente</option>
            <option value="cancelled">Cancelada</option>
          </Select>
        </FormControl>

        {/* Botón de Limpiar Filtros */}
        <Box display="flex" alignItems="flex-end" minW="200px">
          <Button
            leftIcon={<RefreshCw size={16} />}
            variant="ghost"
            onClick={handleClearFilters}
          >
            Limpiar filtros
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

// src/pages/HourlySales.tsx
import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar';
import { Navbar } from '../components/layout/Navbar';
import { useDisclosure } from '@chakra-ui/react';

// Datos ficticios
const mockHourlyStats = {
  peakHour: '12:00 - 13:00',
  transactions: 145,
  avgSales: 125400,
  avgTicket: 12540,
  vsYesterdaySales: 8.5,
  vsYesterdayTicket: 5.2,
};

const mockChartData = {
  labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
  datasets: [
    {
      label: 'Hoy',
      data: [50000, 80000, 120000, 125400, 110000, 95000],
      borderColor: '#3182CE',
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Ayer',
      data: [48000, 75000, 115000, 122000, 105000, 92000],
      borderColor: '#A0AEC0',
      borderDash: [5, 5],
      fill: false,
      tension: 0.4,
    },
  ],
};

const mockTableData = [
  { hour: '12:00 - 13:00', transactions: 145, sales: 1824300, avgTicket: 12582, vsYesterday: 8.5 },
  { hour: '11:00 - 12:00', transactions: 132, sales: 1654800, avgTicket: 12537, vsYesterday: -2.1 },
];

const HourlySales: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [userName] = useState<string>('Usuario de Prueba'); // Estado para el nombre del usuario

  return (
    <Flex height="100vh">
      {/* Barra lateral desplegable */}
      <CollapsibleSidebar isOpen={isOpen} onToggle={onToggle} />

      {/* Contenido principal */}
      <Box flex="1" ml={isOpen ? '240px' : '60px'} transition="margin-left 0.3s">
        {/* Barra superior */}
        <Navbar onMenuClick={onToggle} userName={userName} />
        <Box p={6}>
          {/* Header */}
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg">Ventas por Hora</Heading>
            <Select width="200px" placeholder="27 Noviembre 2024">
              {/* Opciones de filtro */}
              <option value="2024-11-26">26 Noviembre 2024</option>
              <option value="2024-11-25">25 Noviembre 2024</option>
            </Select>
          </Flex>

          {/* Estadísticas principales */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
            <StatCard
              label="Hora Pico"
              value={mockHourlyStats.peakHour}
              description={`${mockHourlyStats.transactions} transacciones`}
            />
            <StatCard
              label="Venta Promedio por Hora"
              value={`$${mockHourlyStats.avgSales.toLocaleString()}`}
              description={`↑ ${mockHourlyStats.vsYesterdaySales}% vs ayer`}
              positive
            />
            <StatCard
              label="Ticket Promedio por Hora"
              value={`$${mockHourlyStats.avgTicket.toLocaleString()}`}
              description={`↑ ${mockHourlyStats.vsYesterdayTicket}% vs ayer`}
              positive
            />
          </SimpleGrid>

          {/* Gráfico de ventas por hora */}
          <Box
            bg="white"
            shadow="sm"
            borderRadius="md"
            p={6}
            mb={6}
            border="1px solid"
            borderColor="gray.200"
            height="300px" // Ajusta la altura del gráfico
          >
            <Heading size="md" mb={4}>
              Ventas por Hora
            </Heading>
            <Box height="200px">
              <Line
                data={mockChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'top' },
                  },
                  scales: {
                    x: { grid: { display: false } },
                    y: { grid: { display: true } },
                  },
                }}
              />
            </Box>
          </Box>

          {/* Tabla con las métricas de ventas por hora */}
          <Box bg="white" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.200">
            <Heading size="md" mb={4}>
              Ventas por Hora
            </Heading>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Hora</Th>
                  <Th isNumeric>Transacciones</Th>
                  <Th isNumeric>Ventas</Th>
                  <Th isNumeric>Ticket Promedio</Th>
                  <Th isNumeric>Vs Ayer</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockTableData.map((row, index) => (
                  <Tr key={index}>
                    <Td>{row.hour}</Td>
                    <Td isNumeric>{row.transactions}</Td>
                    <Td isNumeric>${row.sales.toLocaleString()}</Td>
                    <Td isNumeric>${row.avgTicket.toLocaleString()}</Td>
                    <Td isNumeric color={row.vsYesterday > 0 ? 'green.500' : 'red.500'}>
                      {row.vsYesterday > 0
                        ? `↑ ${row.vsYesterday}%`
                        : `↓ ${Math.abs(row.vsYesterday)}%`}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  description: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, description, positive }) => {
  return (
    <Box bg="white" shadow="sm" borderRadius="md" p={4} border="1px solid" borderColor="gray.200">
      <Stat>
        <StatLabel fontWeight="bold">{label}</StatLabel>
        <StatNumber fontSize="2xl">{value}</StatNumber>
        <StatHelpText color={positive ? 'green.500' : 'red.500'}>{description}</StatHelpText>
      </Stat>
    </Box>
  );
};

export default HourlySales;

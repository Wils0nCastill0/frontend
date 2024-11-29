import {
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  Heading,
  Flex,
  Text,
  IconButton,
  Select,
  VStack,
  Badge,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registro de componentes de chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Datos ficticios
const fakeStats = {
  totalRevenue: 1524300,
  averageTicket: 12450,
  totalTransactions: 1245,
  grossMargin: 32.4,
  dailySalesData: {
    currentMonth: [100, 200, 300, 400, 500, 600, 700],
    lastMonth: [90, 180, 270, 360, 450, 540, 630],
  },
  topProducts: [
    { name: 'Coca Cola 2L', quantity: 245 },
    { name: 'Pan Molde', quantity: 180 },
    { name: 'Leche', quantity: 156 },
  ],
  criticalStock: ['Coca Cola 2L (5 unid)', 'Pan Integral (3 unid)'],
};

export const Dashboard = () => {
  const [stats, setStats] = useState(fakeStats);

  // Fetch stats (mocked for now)
  useEffect(() => {
    const fetchStatsFromAPI = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStats(fakeStats);
    };

    fetchStatsFromAPI();
  }, []);

  const lineChartData = {
    labels: stats.dailySalesData.currentMonth.map((_, index) => `Día ${index + 1}`),
    datasets: [
      {
        label: 'Mes Actual',
        data: stats.dailySalesData.currentMonth,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Mes Anterior',
        data: stats.dailySalesData.lastMonth,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: stats.topProducts.map((product) => product.name),
    datasets: [
      {
        label: 'Unidades Vendidas',
        data: stats.topProducts.map((product) => product.quantity),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Flex direction="column" height="100vh" bg="gray.50">
      {/* Header */}
      <Flex
        as="header"
        bg="white"
        px="6"
        py="4"
        borderBottom="1px"
        borderColor="gray.200"
        justify="space-between"
        align="center"
      >
        <Text fontSize="lg" fontWeight="bold">
          SGI
        </Text>
        <Flex align="center">
          <Select placeholder="Último mes" size="sm" mr="4" />
          <Text mr="4">Usuario de Prueba</Text>
          <IconButton
            aria-label="Cerrar sesión"
            icon={<FiLogOut />}
            colorScheme="red"
            variant="ghost"
          />
        </Flex>
      </Flex>

      {/* Main Content */}
      <Flex flex="1">
        <Box flex="1" p="6">
          <Heading mb="6">Dashboard</Heading>

          {/* Statistics */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6} mb={6}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Ventas Totales</StatLabel>
                  <StatNumber>${stats.totalRevenue.toLocaleString()}</StatNumber>
                  <StatHelpText>↑ 12.5% vs mes anterior</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Ticket Promedio</StatLabel>
                  <StatNumber>${stats.averageTicket.toLocaleString()}</StatNumber>
                  <StatHelpText>↑ 5.2% vs mes anterior</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Total Transacciones</StatLabel>
                  <StatNumber>{stats.totalTransactions}</StatNumber>
                  <StatHelpText>↓ 3.1% vs mes anterior</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Margen Bruto</StatLabel>
                  <StatNumber>{stats.grossMargin}%</StatNumber>
                  <StatHelpText>↑ 2.1% vs mes anterior</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </Grid>

          {/* Charts and Lists */}
          <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6}>
            <Card>
              <CardBody>
                <Heading size="md" mb="4">
                  Ventas Diarias vs Mes Anterior
                </Heading>
                <Line data={lineChartData} />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Heading size="md" mb="4">
                  Stock Crítico
                </Heading>
                <VStack align="start" spacing={3}>
                  {stats.criticalStock.map((item, index) => (
                    <Badge key={index} colorScheme="red" variant="subtle" p="2">
                      {item}
                    </Badge>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </Grid>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mt={6}>
            <Card>
              <CardBody>
                <Heading size="md" mb="4">
                  Top Productos
                </Heading>
                <Bar data={barChartData} />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Heading size="md" mb="4">
                  Ventas por Hora
                </Heading>
                <Text color="gray.500">Próximamente...</Text>
              </CardBody>
            </Card>
          </Grid>
        </Box>
      </Flex>
    </Flex>
  );
};

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
} from '@chakra-ui/react';
import {
  FiHome,
  FiShoppingCart,
  FiBarChart,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Importar Link
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const fakeStats = {
  dailySales: 25,
  totalRevenue: 1524300,
  averageTicket: 12450,
  totalTransactions: 1245,
  grossMargin: 32.4,
  dailySalesData: {
    currentMonth: [100, 200, 300, 400, 500],
    lastMonth: [90, 180, 270, 360, 450],
  },
  hourlySalesData: {
    hours: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM'],
    sales: [50, 75, 100, 150, 200],
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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
      },
      {
        label: 'Mes Anterior',
        data: stats.dailySalesData.lastMonth,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  };

  const barChartData = {
    labels: stats.hourlySalesData.hours,
    datasets: [
      {
        label: 'Ventas por Hora',
        data: stats.hourlySalesData.sales,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
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
            onClick={handleLogout}
            colorScheme="red"
            variant="ghost"
          />
        </Flex>
      </Flex>

      <Flex flex="1">
        {/* Sidebar */}
        <Box as="nav" bg="white" w="64" py="6" px="4" borderRight="1px" borderColor="gray.200">
          <Text fontSize="lg" fontWeight="bold" mb="6">
            SGI
          </Text>
          <Box as="ul" listStyleType="none" m="0" p="0">
            <Box as="li" mb="4">
              <Link to="/dashboard">
                <Flex align="center">
                  <FiHome />
                  <Text ml="2">Dashboard</Text>
                </Flex>
              </Link>
            </Box>
            <Box as="li" mb="4">
              <Link to="/pos">
                <Flex align="center">
                  <FiShoppingCart />
                  <Text ml="2">Punto de Venta</Text>
                </Flex>
              </Link>
            </Box>
            <Box as="li" mb="4">
              <Link to="/top-selling-products">
                <Flex align="center">
                  <FiBarChart />
                  <Text ml="2">Productos</Text>
                </Flex>
              </Link>
            </Box>
            <Box as="li" mb="4">
              <Link to="/hourly-sales">
                <Flex align="center">
                  <FiSettings />
                  <Text ml="2">Ventas</Text>
                </Flex>
              </Link>
            </Box>
            <Box as="li" mb="4">
              <Link to="/reports">
                <Flex align="center">
                  <FiSettings />
                  <Text ml="2">Reportes</Text>
                </Flex>
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Main Content */}
        <Box flex="1" p="6">
          <Heading mb="6">Dashboard</Heading>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={6}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Ventas Totales</StatLabel>
                  <StatNumber>${stats.totalRevenue.toLocaleString()}</StatNumber>
                  <StatHelpText>↑ 12.5% vs mes anterior</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </Grid>

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
                  Ventas por Hora
                </Heading>
                <Bar data={barChartData} />
              </CardBody>
            </Card>
          </Grid>
        </Box>
      </Flex>
    </Flex>
  );
};

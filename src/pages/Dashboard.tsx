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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar';
import { useDisclosure } from '@chakra-ui/react';
import { Navbar } from '../components/layout/Navbar';
import { authApi } from '../services/auth';
import { productsApi } from '../services/api';

export const Dashboard = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    averageTicket: 0,
    totalTransactions: 0,
    grossMargin: 0,
    dailySalesData: { currentMonth: [], lastMonth: [] },
    topProducts: [],
    criticalStock: [],
  });
  const [userName, setUserName] = useState('Usuario');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await authApi.getUser();
        setUserName(user.name);

        const salesStats = await productsApi.getSalesStats();
        const topProducts = await productsApi.getTopProducts();
        const criticalStock = await productsApi.getCriticalStock();

        setStats({
          totalRevenue: salesStats.totalRevenue,
          averageTicket: salesStats.averageTicket,
          totalTransactions: salesStats.totalTransactions,
          grossMargin: salesStats.grossMargin,
          dailySalesData: salesStats.dailySalesData,
          topProducts,
          criticalStock,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Flex height="100vh">
      <CollapsibleSidebar isOpen={isOpen} onToggle={onToggle} />
      <Box flex="1" ml={isOpen ? '240px' : '60px'} transition="margin-left 0.3s" bg="gray.50">
        <Navbar onMenuClick={onToggle} userName={userName} />
        <Box p="6">
          <Heading mb="6">Dashboard</Heading>
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
          </Grid>
        </Box>
      </Box>
    </Flex>
  );
};

// src/pages/HourlySales.tsx
import React, { useState } from 'react';
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
  Card,
  CardHeader,
  CardBody,
  Container,
} from '@chakra-ui/react';
import ChartComponent from '../components/ChartComponent';

const HourlySales: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('option1');

  const mockTableData = [
    { hour: '10:00 AM', transactions: 50, sales: 500, avgTicket: 10, vsYesterday: 5 },
    { hour: '11:00 AM', transactions: 75, sales: 750, avgTicket: 10, vsYesterday: 10 },
  ];

  return (
    <Container 
      maxW="container.xl" 
      py={5} 
      bg="white" // Asegura fondo blanco
      minH="100vh" // Altura mínima para cubrir toda la pantalla
    >
      <Flex 
        direction="column" 
        gap={6}
        bg="white" // Fondo blanco explícito
      >
        {/* Header Section */}
        <Card>
          <CardBody>
            <Flex justify="space-between" align="center">
              <Heading size="lg">Hourly Sales</Heading>
              <Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                width="200px"
              >
                <option value="option1">Today</option>
                <option value="option2">Yesterday</option>
              </Select>
            </Flex>
          </CardBody>
        </Card>

        {/* Stats Section */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Sales</StatLabel>
                <StatNumber>345</StatNumber>
                <StatHelpText>Feb 12 - Feb 18</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Revenue</StatLabel>
                <StatNumber>$2,345</StatNumber>
                <StatHelpText>Feb 12 - Feb 18</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Average Ticket</StatLabel>
                <StatNumber>$45</StatNumber>
                <StatHelpText>+5% from yesterday</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Transactions</StatLabel>
                <StatNumber>127</StatNumber>
                <StatHelpText>+12% from yesterday</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Chart Section */}
        <Card bg="white"> {/* Fondo blanco explícito */}
          <CardHeader bg="white">
            <Heading size="md">Sales Trend</Heading>
          </CardHeader>
          <CardBody bg="white">
            <Box height="400px" bg="white">
              <ChartComponent />
            </Box>
          </CardBody>
        </Card>

        {/* Table Section */}
        <Card bg="white">
          <CardHeader bg="white">
            <Heading size="md">Detailed Sales Data</Heading>
          </CardHeader>
          <CardBody bg="white">
            <Table variant="simple" size="sm" bg="white">
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
                    <Td isNumeric>${row.avgTicket}</Td>
                    <Td isNumeric>{row.vsYesterday}%</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Flex>
    </Container>
  );
};

export default HourlySales;

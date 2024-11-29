import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Divider,
} from '@chakra-ui/react';

// Datos ficticios
const initialCashSummary = {
  bills: [
    { denomination: 20000, count: 0, total: 100000 },
    { denomination: 10000, count: 0, total: 150000 },
    { denomination: 5000, count: 0, total: 75000 },
    { denomination: 2000, count: 0, total: 24000 },
  ],
  coins: [
    { denomination: 1000, count: 0, total: 15000 },
    { denomination: 500, count: 0, total: 5000 },
  ],
  expectedTotal: 508900,
};

const initialSalesSummary = {
  cashSales: 358900,
  debitSales: 245600,
  creditSales: 189500,
  transferSales: 125000,
  cashOpening: 100000,
  cashIn: 358900,
  cashOut: -100000,
};

const CashClosing: React.FC = () => {
  const [cashSummary, setCashSummary] = useState(initialCashSummary);
  const [salesSummary] = useState(initialSalesSummary);

  const handleCountChange = (denomination: number, value: string) => {
    setCashSummary((prev) => ({
      ...prev,
      bills: prev.bills.map((bill) =>
        bill.denomination === denomination
          ? { ...bill, count: Number(value), total: Number(value) * bill.denomination }
          : bill
      ),
      coins: prev.coins.map((coin) =>
        coin.denomination === denomination
          ? { ...coin, count: Number(value), total: Number(value) * coin.denomination }
          : coin
      ),
    }));
  };

  const calculateTotalCash = () => {
    const billsTotal = cashSummary.bills.reduce((acc, bill) => acc + bill.total, 0);
    const coinsTotal = cashSummary.coins.reduce((acc, coin) => acc + coin.total, 0);
    return billsTotal + coinsTotal;
  };

  const totalCash = calculateTotalCash();

  const handleConfirmClose = () => {
    console.log('Cierre de caja confirmado', { cashSummary, salesSummary });
    // Aquí podrías realizar una solicitud a la API para guardar los datos
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>
        Cierre de Caja #1
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* Conteo de Efectivo */}
        <Box
          bg="white"
          shadow="sm"
          borderRadius="md"
          p={6}
          border="1px solid"
          borderColor="gray.200"
        >
          <Heading size="md" mb={4}>
            Conteo de Efectivo
          </Heading>
          <Divider mb={4} />
          <VStack align="stretch" spacing={4}>
            <Heading size="sm">Billetes</Heading>
            {cashSummary.bills.map((bill) => (
              <HStack key={bill.denomination}>
                <Text>${bill.denomination.toLocaleString()} x</Text>
                <Input
                  type="number"
                  value={bill.count}
                  onChange={(e) => handleCountChange(bill.denomination, e.target.value)}
                />
                <Text>${bill.total.toLocaleString()}</Text>
              </HStack>
            ))}

            <Heading size="sm" mt={4}>
              Monedas
            </Heading>
            {cashSummary.coins.map((coin) => (
              <HStack key={coin.denomination}>
                <Text>${coin.denomination.toLocaleString()} x</Text>
                <Input
                  type="number"
                  value={coin.count}
                  onChange={(e) => handleCountChange(coin.denomination, e.target.value)}
                />
                <Text>${coin.total.toLocaleString()}</Text>
              </HStack>
            ))}

            <Divider />
            <Text fontWeight="bold" fontSize="lg" textAlign="right">
              Total Contado: ${totalCash.toLocaleString()}
            </Text>
          </VStack>
        </Box>

        {/* Resumen de Ventas */}
        <Box
          bg="white"
          shadow="sm"
          borderRadius="md"
          p={6}
          border="1px solid"
          borderColor="gray.200"
        >
          <Heading size="md" mb={4}>
            Resumen de Ventas
          </Heading>
          <Divider mb={4} />
          <VStack align="stretch" spacing={4}>
            <Text>
              Ventas en Efectivo{' '}
              <span style={{ float: 'right' }}>${salesSummary.cashSales.toLocaleString()}</span>
            </Text>
            <Text>
              Ventas con Débito{' '}
              <span style={{ float: 'right' }}>${salesSummary.debitSales.toLocaleString()}</span>
            </Text>
            <Text>
              Ventas con Crédito{' '}
              <span style={{ float: 'right' }}>${salesSummary.creditSales.toLocaleString()}</span>
            </Text>
            <Text>
              Ventas por Transferencia{' '}
              <span style={{ float: 'right' }}>${salesSummary.transferSales.toLocaleString()}</span>
            </Text>
            <Divider />
            <Text>
              Apertura de Caja{' '}
              <span style={{ float: 'right' }}>${salesSummary.cashOpening.toLocaleString()}</span>
            </Text>
            <Text>
              Ingresos de Efectivo{' '}
              <span style={{ float: 'right', color: 'green' }}>
                +${salesSummary.cashIn.toLocaleString()}
              </span>
            </Text>
            <Text>
              Retiros de Caja{' '}
              <span style={{ float: 'right', color: 'red' }}>
                ${salesSummary.cashOut.toLocaleString()}
              </span>
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>

      {/* Botones */}
      <Flex justify="space-between" mt={6}>
        <Button variant="outline">Cancelar</Button>
        <Button colorScheme="blue" onClick={handleConfirmClose}>
          Confirmar Cierre
        </Button>
      </Flex>
    </Box>
  );
};

export default CashClosing;

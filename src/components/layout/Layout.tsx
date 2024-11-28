import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { CollapsibleSidebar } from './CollapsibleSidebar';
import { Navbar } from './Navbar';

export const Layout = () => {
  const { isOpen, onToggle } = useDisclosure(); // Estado para manejar la apertura del sidebar

  return (
    <Flex h="100vh">
      {/* Barra lateral reutilizable */}
      <CollapsibleSidebar isOpen={isOpen} onToggle={onToggle} />

      {/* Contenido Principal */}
      <Box
        flex="1"
        ml={isOpen ? '240px' : '60px'} // Ajuste dinámico del margen izquierdo
        transition="margin-left 0.3s"
      >
        {/* Pasar la función onToggle al Navbar como onMenuClick */}
        <Navbar onMenuClick={onToggle} />
        <Box p={4}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

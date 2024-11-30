import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';

// Pages
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { POS } from '../pages/POS';
import { Sales } from '../pages/Sales';
import TopSellingProducts from '../pages/TopSellingProducts';
import HourlySales from '../pages/HourlySales';
import Home  from '../pages/Home';
import Reports from '../pages/Reports';
import Inventory from '../pages/Inventory';
import MassImport from '../pages/MassImport';
import Clients from '../pages/Clients';
import UsersPermissions from '../pages/UsersPermissions';
import ProfitReport from '../pages/reports/ProfitReport';
import TaxReport from '../pages/reports/TaxReport';
import CustomReport from '../pages/reports/CustomReport';
import SalesReport from '../pages/reports/SalesReport';
import InventoryReport from '../pages/reports/InventoryReport';
import MovementsHistory from '../pages/reports/MovementsHistory';
import DailyBalance from '../pages/reports/DailyBalance';
import SalesByCategory from '../pages/reports/SalesByCategory';
import SalesByProduct from '../pages/reports/SalesByProduct';
import SystemConfiguration from '../pages/configurates/SystemConfiguration';
import POSSettings from '../pages/configurates/POSSettings';
import BackupSettings from '../pages/configurates/BackupSettings';
import ClientHistory from '../pages/ClientHistory';
import ProductDetails from '../pages/ProductDetails';
import CashClosing from '../pages/cajera/CashClosing';
import CashOpening from '../pages/cajera/CashOpening';
import ProductModal from '../components/products/ProductModal';
import { Product } from '../types/index';
import HomeCajera from '../pages/cajera/HomeCajera'



// Rutas protegidas
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('authToken'); // Verifica el token
  return token ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta inicial redirige a register */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rutas públicas */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/top-selling-products" element={<TopSellingProducts />} />
      <Route path="/hourly-sales" element={<HourlySales />} />
      <Route path="/home" element={<Home />} />
      <Route
  path="/product-modal"
  element={
    <ProductModal
      isOpen={true} // Aquí decides si el modal estará abierto inicialmente
      onClose={() => console.log('Cerrar modal')} // Una función para manejar el cierre
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onProductCreated={function (_product: Product): void {
        throw new Error('Function not implemented.');
      } }    />
  }
/>

      <Route path="/reports" element={<Reports />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/mass-import" element={<MassImport />} />
      <Route path="/clients" element={< Clients />}/>
      <Route path="/users-permissions" element={< UsersPermissions />}/>
      <Route path="/reports/profit" element={<ProfitReport />} />
      <Route path="/reports/tax-report" element={<TaxReport />} />
      <Route path="/custom-report" element={<CustomReport />} />
      <Route path="/sales-report" element={<SalesReport />} />
      <Route path="/inventory-report" element={<InventoryReport />} />
      <Route path="/movements-history" element={<MovementsHistory />} />
      <Route path="/daily-balance" element={<DailyBalance />} />
      <Route path="/sales-by-category" element={<SalesByCategory />} />
      <Route path="/sales-by-product" element={<SalesByProduct />} />
      <Route path="/system-configuration" element={<SystemConfiguration />} />
      <Route path="/pos-settings" element={<POSSettings />} />
      <Route path="/backup-settings" element={<BackupSettings />} />
      <Route path="/clients/:id" element={<ClientHistory />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      <Route path="/cash-closing" element={<CashClosing />} />
      <Route path= '/cash-opening' element={<CashOpening  />} />
      <Route path="/pos" element={<POS />} />
      <Route path="/home-cajera" element={<HomeCajera />} />





      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        
        
        <Route path="/sales" element={<Sales />} />
        
      </Route>

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

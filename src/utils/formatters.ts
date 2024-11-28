import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// Formato de moneda
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(amount);
};

// Formato de número con decimales
export const formatNumber = (number: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
};

// Formatos de fecha
export const formatDate = (date: string | Date, formatStr: string = 'dd/MM/yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: es });
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: es });
};

export const formatDateTimeFull = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'PPpp', { locale: es });
};

// Formato de porcentaje
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${formatNumber(value, decimals)}%`;
};

// Formato de stock
export const formatStock = (stock: number, minimumStock?: number): {
  text: string;
  color: string;
} => {
  if (stock <= 0) {
    return { text: 'Sin stock', color: 'red.500' };
  }
  
  if (minimumStock && stock <= minimumStock) {
    return { text: 'Stock bajo', color: 'yellow.500' };
  }
  
  return { text: 'En stock', color: 'green.500' };
};

// Formato de estado de venta
export const formatSaleStatus = (status: string): {
  text: string;
  color: string;
} => {
  const statusMap = {
    completed: { text: 'Completada', color: 'green.500' },
    pending: { text: 'Pendiente', color: 'yellow.500' },
    cancelled: { text: 'Cancelada', color: 'red.500' }
  };

  return statusMap[status as keyof typeof statusMap] || { text: status, color: 'gray.500' };
};

// Truncar texto
export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

// Formato de SKU
export const formatSKU = (sku: string): string => {
  return sku.toUpperCase().trim();
};

// Formato de teléfono
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]}`;
  }
  return phone;
};

// Formato de RUT chileno
export const formatRUT = (rut: string): string => {
  const actual = rut.replace(/[^0-9kK]/g, '');
  if (actual.length <= 1) return actual;

  let result = actual.slice(-4, -1) + '-' + actual.substr(actual.length - 1);
  for (let i = 4; i < actual.length; i += 3) {
    result = actual.slice(-3 - i, -i) + '.' + result;
  }
  return result;
};
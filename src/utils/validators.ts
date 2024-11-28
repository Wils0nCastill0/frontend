// Validación de email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validación de contraseña
export const isValidPassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una mayúscula');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una minúscula');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Debe contener al menos un número');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validación de RUT chileno
export const isValidRUT = (rut: string): boolean => {
  if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) return false;

  const rutLimpio = rut.replace(/[^0-9kK]/g, '');
  const dv = rutLimpio.slice(-1).toUpperCase();
  const rutNumerico = parseInt(rutLimpio.slice(0, -1), 10);

  let suma = 0;
  let multiplicador = 2;

  const rutReverso = rutNumerico.toString().split('').reverse();

  for (let i = 0; i < rutReverso.length; i++) {
    suma += parseInt(rutReverso[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado =
    dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  return dv === dvCalculado;
};

// Validación de teléfono
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?56?\s?9?\s?[0-9]{8}$/;
  return phoneRegex.test(phone);
};

// Validación de SKU
export const isValidSKU = (sku: string): boolean => {
  const skuRegex = /^[A-Za-z0-9-]{3,20}$/;
  return skuRegex.test(sku);
};

// Validación de precio
export const isValidPrice = (price: number): boolean => {
  return price > 0 && price <= 99999999;
};

// Validación de stock
export const isValidStock = (stock: number): boolean => {
  return Number.isInteger(stock) && stock >= 0;
};

// Validación de cantidad en venta
export const isValidSaleQuantity = (
  quantity: number,
  availableStock: number
): boolean => {
  return (
    Number.isInteger(quantity) &&
    quantity > 0 &&
    quantity <= availableStock
  );
};

// Validación de descuento
export const isValidDiscount = (discount: number): boolean => {
  return discount >= 0 && discount <= 100;
};

// Validación de nombre de producto
export const isValidProductName = (name: string): boolean => {
  return name.trim().length >= 3 && name.trim().length <= 100;
};

// Validador genérico de rangos numéricos
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

// Validador de fecha futura
export const isFutureDate = (date: Date): boolean => {
  return date.getTime() > new Date().getTime();
};

// Validador de fecha pasada
export const isPastDate = (date: Date): boolean => {
  return date.getTime() < new Date().getTime();
};

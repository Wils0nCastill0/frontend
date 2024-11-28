import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CartItem as ApiCartItem } from '../../types'; // Asegúrate de importar `Product` y renombrar `CartItem` si es necesario

// Declaración del tipo `CartItem` para uso local
export interface CartItem extends ApiCartItem {
  product: Product;
  subtotal: number;
}

// Declaración del estado inicial del carrito
export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// Crear slice de Redux
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.subtotal = existingItem.quantity * existingItem.unitPrice;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
        item.subtotal = item.quantity * item.unitPrice;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Exportar acciones y reducer
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

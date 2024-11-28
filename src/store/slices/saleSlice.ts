import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sale } from '../../types';

interface SaleState {
  items: Sale[];
  currentSale: Sale | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    startDate: string | null;
    endDate: string | null;
    status: string | null;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: SaleState = {
  items: [],
  currentSale: null,
  isLoading: false,
  error: null,
  filters: {
    startDate: null,
    endDate: null,
    status: null,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const saleSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    fetchSalesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSalesSuccess: (
      state,
      action: PayloadAction<{ sales: Sale[]; total: number }>
    ) => {
      state.isLoading = false;
      state.items = action.payload.sales;
      state.pagination.total = action.payload.total;
      state.error = null;
    },
    fetchSalesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrentSale: (state, action: PayloadAction<Sale | null>) => {
      state.currentSale = action.payload;
    },
    updateFilters: (
      state,
      action: PayloadAction<Partial<SaleState['filters']>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset page when filters change
    },
    updatePagination: (
      state,
      action: PayloadAction<Partial<SaleState['pagination']>>
    ) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination = initialState.pagination;
    },
  },
});

export const {
  fetchSalesStart,
  fetchSalesSuccess,
  fetchSalesFailure,
  setCurrentSale,
  updateFilters,
  updatePagination,
  clearFilters,
} = saleSlice.actions;

export default saleSlice.reducer;
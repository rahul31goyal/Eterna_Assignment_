/**
 * UI slice for Redux store
 * Manages sorting, filters, and UI interaction states
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SortConfig, TokenFilters, TokenStatus } from '@/types';

export interface UIState {
  sortConfig: SortConfig;
  filters: TokenFilters;
  activeTab: TokenStatus;
  isModalOpen: boolean;
  isFilterOpen: boolean;
}

const initialState: UIState = {
  sortConfig: {
    field: 'marketCap',
    direction: 'desc',
  },
  filters: {},
  activeTab: 'new',
  isModalOpen: false,
  isFilterOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
    toggleSortDirection: (state) => {
      state.sortConfig.direction = state.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    },
    setFilters: (state, action: PayloadAction<TokenFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setActiveTab: (state, action: PayloadAction<TokenStatus>) => {
      state.activeTab = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    toggleFilter: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },
  },
});

export const {
  setSortConfig,
  toggleSortDirection,
  setFilters,
  clearFilters,
  setActiveTab,
  toggleModal,
  toggleFilter,
} = uiSlice.actions;

export default uiSlice.reducer;

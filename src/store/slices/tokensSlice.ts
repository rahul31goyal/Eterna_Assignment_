/**
 * Tokens slice for Redux store
 * Manages price updates and token selection state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceUpdate } from '@/types';

interface TokensState {
  priceUpdates: Record<string, PriceUpdate>;
  selectedTokenId: string | null;
}

const initialState: TokensState = {
  priceUpdates: {},
  selectedTokenId: null,
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<PriceUpdate>) => {
      state.priceUpdates[action.payload.id] = action.payload;
    },
    selectToken: (state, action: PayloadAction<string | null>) => {
      state.selectedTokenId = action.payload;
    },
    clearPriceUpdate: (state, action: PayloadAction<string>) => {
      delete state.priceUpdates[action.payload];
    },
  },
});

export const { updatePrice, selectToken, clearPriceUpdate } = tokensSlice.actions;
export default tokensSlice.reducer;

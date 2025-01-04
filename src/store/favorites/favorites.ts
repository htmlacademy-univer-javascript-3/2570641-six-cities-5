import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.ts';
import { FavoritesData } from '@/types/state.ts';
import { Offer, Offers } from '@/types/offer.ts';

const initialState: FavoritesData = {
  favorites: [],
};

export const favoritesData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    updateFavorites: (state, action: PayloadAction<Offers>) => {
      state.favorites = action.payload;
    },
    setFavoriteStatus: (state, action: PayloadAction<Offer>) => {
      const offer = state.favorites?.find((currentOffer) => currentOffer.id === action.payload.id);
      if (offer){
        offer.isFavorite = action.payload.isFavorite;
      }
    }
  },
});

export const { updateFavorites, setFavoriteStatus } = favoritesData.actions;

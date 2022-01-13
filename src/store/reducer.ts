import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { State } from '../types/state';
import { loadHotels, setAuthorizationStatus, setDataLoaded, setLoading, setSearchParams, updateFavorites } from './action';

const initialState: State = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  isLoading: false,
  hotels: [],
  city: '',
  startDate: '',
  daysNumber: 0,
  favorites: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setDataLoaded, (state) => {
      state.isDataLoaded = true;
      state.isLoading = false;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadHotels, (state, action) => {
      state.hotels = action.payload;
    })
    .addCase(setSearchParams, (state, action) => {
      state.city = action.payload.city;
      state.startDate = action.payload.startDate;
      state.daysNumber = action.payload.daysNumber;
    })
    .addCase(updateFavorites, (state, action) => {
      const hotel = action.payload;
      const favoriteStatus = hotel.isFavorite;

      const hotelId = state.hotels.findIndex((item) => item.id === hotel.id);
      if (hotelId > -1) {
        state.hotels[hotelId].isFavorite = !favoriteStatus;
      }

      if (favoriteStatus) {
        const favoriteIndex = state.favorites.findIndex(({id}) => id === hotel.id);
        state.favorites.splice(favoriteIndex, 1);
      } else {
        state.favorites.push(Object.assign({}, hotel, {isFavorite: true}));
      }
    });
});

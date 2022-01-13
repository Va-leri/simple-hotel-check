import { State } from '../types/state';

export const getIsLoading = (state: State) => state.isLoading;

export const getIsDataLoaded = (state: State) => state.isDataLoaded;

export const getAuthorizationStatus = (state: State) => state.authorizationStatus;

export const getHotels = (state: State) => state.hotels;

export const getCity = (state: State) => state.city;

export const getStartDate = (state: State) => state.startDate;

export const getDaysNumber = (state: State) => state.daysNumber;

export const getFavorites = (state: State) => state.favorites;

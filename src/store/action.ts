import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { ActionType } from '../types/actions';
import { Offer, Offers } from '../types/offers';
import { SearchParameters } from '../types/search-parameters';

export const setLoading = createAction<boolean>(ActionType.SetLoading);
export const setDataLoaded = createAction(ActionType.SetDataLoaded);
export const setAuthorizationStatus = createAction<AuthorizationStatus>(ActionType.SetAuthorizationStatus);
export const loadHotels = createAction<Offers>(ActionType.LoadHotels);
export const setSearchParams = createAction<SearchParameters>(ActionType.SetSearchParams);
export const updateFavorites = createAction<Offer>(ActionType.UpdateFavorites);


export const redirectToRout = createAction<AppRoute>(ActionType.RedirectToRout);

import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { loadHotels, redirectToRout, setAuthorizationStatus, setDataLoaded, setLoading, setSearchParams, updateFavorites } from '../store/action';
import { Extra } from './extra';
import { State } from './state';

export enum ActionType {
  SetLoading = 'data/setLoading',
  SetDataLoaded = 'data/setDataLoaded',
  SetAuthorizationStatus = 'user/setAuthorizationStatus',
  LoadHotels = 'data/loadHotels',
  SetSearchParams = 'data/setSearchParams',
  UpdateFavorites = 'data/updateFavorites',
  RedirectToRout = 'service/redirectToRout',
}

export type Actions =
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setDataLoaded>
  | ReturnType<typeof setAuthorizationStatus>
  | ReturnType<typeof loadHotels>
  | ReturnType<typeof setSearchParams>
  | ReturnType<typeof updateFavorites>
  | ReturnType<typeof redirectToRout>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, Extra, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

import dayjs from 'dayjs';
import { SearchParameters } from './types/search-parameters';
import { formatDate } from './utils/common';

export enum AppRoute {
  Main = '/',
  Login = '/login',
}

export enum PlaceCardParent {
  Results = 'results',
  Favorites = 'favorites',
}

export enum SortingType {
  Rating = 'rating',
  Price = 'price',
}

export enum SortingOrder {
  Asc = 'from low to high',
  Desc = 'from high to low',
}

export const MAX_RATING = 5;

export enum AuthorizationStatus {
  Auth = 'Authorized',
  NoAuth = 'Unauthorized',
  Unknown = 'Unknown',
}

export const LOGIN_BASE_URL = 'https://8.react.pages.academy/six-cities';

export const HOTELS_BASE_URL = 'https://engine.hotellook.com/api/v2';

export enum LoginAPIRoute {
  Login = '/login',
  Logout = '/logout',
}

export enum HotelsApiRoute {
  Price = '/cache.json',
}

export const DATE_FORMAT = 'YYYY-MM-DD';

export const CLIENT_DATE_FORMAT = 'D MMMM YYYY';

const today = dayjs();

export const HotelsInitialParams: SearchParameters = {
  city: 'Москва',
  startDate: formatDate(today, DATE_FORMAT),
  daysNumber: 1,
};

export enum ValidationMessage {
  Password = 'Пароль не должен содержать кириллические символы',
}

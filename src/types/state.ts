import { AuthorizationStatus } from '../const';
import { Offers } from './offers';

export type State = {
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  isLoading: boolean,
  hotels: Offers,
  city: string,
  startDate: string,
  daysNumber: number,
  favorites: Offers,
}

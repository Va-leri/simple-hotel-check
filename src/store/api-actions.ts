import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { adaptHotelsToClient } from '../adapter/adapter';
import { LoginAPIRoute, AppRoute, AuthorizationStatus, HotelsApiRoute, HotelsInitialParams, DATE_FORMAT, CLIENT_DATE_FORMAT, ErrorMessage } from '../const';
import { dropToken, saveToken } from '../services/token';
import { ThunkActionResult } from '../types/actions';
import { AuthData, AuthInfoFromServer } from '../types/auth-data';
import { OffersFromServer } from '../types/offers';
import { QueryParameters } from '../types/query-parameters';
import { SearchParameters } from '../types/search-parameters';
import { formatDate } from '../utils/common';
import { loadHotels, redirectToRout, setAuthorizationStatus, setLoading, setSearchParams } from './action';

export const checkAuthAction = (): ThunkActionResult => async (dispatch, _getState, extra) => {
  const {loginApi} = extra;
  try {
    await loginApi.get(LoginAPIRoute.Login);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
};

export const loginAction = (authData: AuthData): ThunkActionResult => async (dispatch, _getState, extra) => {
  const {loginApi} = extra;

  dispatch(setLoading(true));

  try {
    const { data } = await loginApi.post<AuthInfoFromServer>(LoginAPIRoute.Login, authData);

    dispatch(setLoading(false));
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(redirectToRout(AppRoute.Main));
  } catch {
    dispatch(setLoading(false));
    toast.info(ErrorMessage.Axios);
  }
};

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, extra) => {
    const {loginApi} = extra;
    await loginApi.delete(LoginAPIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(redirectToRout(AppRoute.Login));
  };

export const fetchHotelsAction = ({city, startDate, daysNumber}: SearchParameters = HotelsInitialParams): ThunkActionResult =>
  async (dispatch, _getState, extra) => {
    const {hotelsApi} = extra;

    const queryParams: QueryParameters = {
      location: city,
      checkIn: formatDate(dayjs(startDate), DATE_FORMAT),
      checkOut: formatDate(dayjs(startDate).add(daysNumber, 'day'), DATE_FORMAT),
    };

    dispatch(setLoading(true));

    try {
      const {data} = await hotelsApi.get<OffersFromServer>(HotelsApiRoute.Price, {
        params: {
          ...hotelsApi.defaults.params,
          ...queryParams,
        }});

      const formattedDate = formatDate(startDate, CLIENT_DATE_FORMAT);

      dispatch(loadHotels(adaptHotelsToClient(data, {city, startDate, daysNumber})));
      dispatch(setSearchParams({city, startDate: formattedDate, daysNumber}));
      dispatch(setLoading(false));
    } catch {
      toast.info(ErrorMessage.HotelsServer);
    }
  };

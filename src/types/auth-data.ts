import { Token } from '../services/token';

export type AuthData = {
  email: string,
  password: string,
};

export type AuthInfoFromServer = {
  'avatar_url': string,
  'id': number,
  'is_pro': boolean,
  'name': string,
  'email': string,
  'token': Token,
}

import './login-main.scss';
import './login-form.scss';
import { FormEvent, useRef, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorizationStatus, getIsLoading } from '../../store/selectors';
import { AppRoute, AuthorizationStatus, ErrorMessage } from '../../const';
import Preloader from '../preloader/preloader';
import { loginAction } from '../../store/api-actions';
import { redirectToRout } from '../../store/action';
import { toast } from 'react-toastify';


function LoginScreen(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isLoading = useSelector(getIsLoading);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Preloader />;
  }

  // if (true) {
  //   return <Preloader />;
  // }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    dispatch(redirectToRout(AppRoute.Main));
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current && passwordRef.current) {
      const authData = {
        email: loginRef.current.value,
        password: passwordRef.current.value,
      };

      dispatch(loginAction(authData));
    }
  };

  const onPasswordKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    const value = evt.key;

    if (value.search(/[а-яА-ЯёЁ]/g) >=0) {
      evt.preventDefault();
      toast.warning(ErrorMessage.PasswordValidation);
    }
  };

  return (
    <main className="login-main">
      <form className="login-main__form login-form" action="" method="post" onSubmit={handleSubmit}>
        <legend className="login-form__legend">Simple Hotel Check</legend>
        <label className="login-form__label" htmlFor="login-field">Логин</label>
        <input className="login-form__input" ref={loginRef} type="email" name="login" id="login-field" disabled={isLoading} required />
        <label className="login-form__label" htmlFor="password-field">Пароль</label>
        <input className="login-form__input" ref={passwordRef} type="password" name="password" id="password-field" disabled={isLoading} minLength={8} onKeyPress={onPasswordKeyPress} required />
        <button className="login-form__btn" type="submit">Войти</button>
      </form>
    </main>
  );
}

export default LoginScreen;

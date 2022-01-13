import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import browserHistory from './browser-history';
import App from './components/app/app';
import { AuthorizationStatus} from './const';
import { createHotelsApi } from './services/hotels-api';
import { createLoginApi } from './services/login-api';
import { setAuthorizationStatus } from './store/action';
import { checkAuthAction } from './store/api-actions';
import { redirect } from './store/middlewares/redirect';
import { reducer } from './store/reducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginApi = createLoginApi(() => store.dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth)));

const hotelsApi = createHotelsApi();

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        loginApi,
        hotelsApi,
      },
    },
  }).concat(redirect),
});

store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
        <ToastContainer />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

import '../../scss/style.scss';
import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';
import LoginScreen from '../login-screen/login-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  return (
    <Switch>
      <PrivateRoute
        exact
        path={AppRoute.Main}
        render={() => <MainScreen />}
      />
      <Route path={AppRoute.Login} exact>
        <LoginScreen />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;


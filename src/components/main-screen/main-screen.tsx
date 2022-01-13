import './main-screen.scss';
import './breadcrumbs.scss';
import Favorites from '../favorites/favorites';
import SearchForm from '../search-form/search-form';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Preloader from '../preloader/preloader';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/selectors';
import { AuthorizationStatus } from '../../const';
import { MouseEvent, useEffect } from 'react';
import { fetchHotelsAction, logoutAction } from '../../store/api-actions';
import Main from '../main/main';

function MainScreen(): JSX.Element {
  const dispatch = useDispatch();

  const authorizationStatus = useSelector(getAuthorizationStatus);


  useEffect(() => {
    dispatch(fetchHotelsAction());
  }, []);

  const onLogoutBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Preloader />;
  }

  return (
    <div className="main-screen" >
      <header className="main-screen__header">
        <h1 className="main-screen__title">Simple Hotel Check</h1>
        <div className="main-screen__user-info">
          <button className="main-screen__logout-btn" type="button" onClick={onLogoutBtnClick}>
            <span className="main-screen__logout-txt">Выйти</span>
            <svg width="18" height="18">
              <use xlinkHref="#logout"></use>
            </svg>
          </button>
        </div>
      </header>
      <div className="main-screen__wrapper">
        <aside className="main-screen__aside">
          <SearchForm />
          <Favorites />
        </aside>
        <Main />
      </div>
    </div>
  );
}

export default MainScreen;

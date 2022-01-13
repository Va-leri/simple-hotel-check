import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './not-found.scss';

function NotFoundScreen(): JSX.Element {
  return (
    <main className="not-found">
      <div className="not-found__container">
        <p className="not-found__code">404</p>
        <p className="not-found__text">Страница не найдена</p>
        <Link to={AppRoute.Main} className="not-found__link">
          Вернуться на Главную
        </Link>
      </div>
    </main>
  );
}

export default NotFoundScreen;

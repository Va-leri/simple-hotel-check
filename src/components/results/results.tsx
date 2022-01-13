import './results.scss';
import Placecard from '../placecard/placecard';
import { PlaceCardParent } from '../../const';
import { getFavorites, getHotels, getIsLoading } from '../../store/selectors';
import { useSelector } from 'react-redux';
import Preloader from '../preloader/preloader';

function Results(): JSX.Element {
  const hotels = useSelector(getHotels);
  const favorites = useSelector(getFavorites);
  const isLoading = useSelector(getIsLoading);

  const areFavorites = Boolean(favorites.length);

  const areResults = !!hotels.length;

  const getWordForFavorites = (number: number) => {
    const digit = number % 10;
    switch (digit) {
      case 1:
        return 'отель';
      case 2:
      case 3:
      case 4:
        return 'отеля';
      default:
        return 'отелей';
    }
  };

  if (isLoading) {
    return (
      <div className="results main__results main__results--loading">
        <Preloader />
      </div>
    );
  }

  return (
    <div className="results main__results">
      {
        areFavorites &&
        <p className="results__statistics">
          Добавлено в Избранное: <b className='results__statistics-value'>{favorites.length}</b> {getWordForFavorites(favorites.length)}
        </p>
      }

      {
        areResults &&
        <ul className="results__list">
          {
            hotels.map((hotel) =>
              <Placecard hotel={hotel} parentSection={PlaceCardParent.Results} key={hotel.id} />)
          }
        </ul>
      }
      {
        !areResults &&
        <div className="results__empty">
          <p className="results__empty-text">По Вашему запросу ничего не найдено.</p>
          <p className="results__empty-text">Измените параметры поиска и попробуйте еще раз.</p>
        </div>
      }
    </div>
  );
}

export default Results;

import './placecard.scss';
import './rating.scss';
import { MAX_RATING, PlaceCardParent } from '../../const';
import { Offer } from '../../types/offers';
import { useDispatch, useSelector } from 'react-redux';
import { getDaysNumber, getStartDate } from '../../store/selectors';
import { MouseEvent } from 'react';
import { updateFavorites } from '../../store/action';

type PlacecardProps = {
  hotel: Offer,
  parentSection: PlaceCardParent,
}

const getWordForDaysNumber = (number: number) => {
  const digit = number % 10;
  switch (digit) {
    case (1):
      return 'день';
    case ( 2 || 3 || 4):
      return 'дня';
    default:
      return 'дней';
  }
};

function Placecard({ hotel: offer, parentSection }: PlacecardProps): JSX.Element {
  const dispatch = useDispatch();

  const {
    isFavorite,
    price,
    stars,
    title,
    startDate,
    daysNumber,
  } = offer;

  const onBookmarkBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    dispatch(updateFavorites(offer));
  };

  return (
    <li className={`placecard ${parentSection === PlaceCardParent.Results ? 'placecard--results' : ''}`}>
      <h3 className="placecard__name">
        {title}
      </h3>
      <button className={`placecard__bookmark-btn ${isFavorite ? 'placecard__bookmark-btn--active' : ''} btn`} type="button" onClick={onBookmarkBtnClick}>
        <svg className="placecard__bookmark-icon" width="21" height="18">
          <use xlinkHref="#heart"></use>
        </svg>
        <span className="visually-hidden">В избранное</span>
      </button>
      <div className={`placecard__dates ${parentSection === PlaceCardParent.Favorites ? 'placecard__dates--favorites' : ''}`}>
        <p className="placecard__date-from">{startDate}</p>
        <p className="placecard__days">{`${daysNumber} ${getWordForDaysNumber(daysNumber)}`}</p>
      </div>
      <div className="placecard__rating rating">
        <div className="placecard__stars rating__stars">
          <span style={{ width: `${stars * 100 / MAX_RATING}%` }}></span>
          <span className="visually-hidden">Звёзды</span>
        </div>
      </div>
      <div className={`placecard__price ${parentSection === PlaceCardParent.Favorites ? 'placecard__price--favorites' : ''}`}>
        <span className="placecard__price-text">Цена: </span>
        <span className="placecard__price-value">{price} ₽</span>
      </div>

    </li>
  );
}

export default Placecard;

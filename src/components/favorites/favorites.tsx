import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PlaceCardParent, SortingOrder, SortingType } from '../../const';
import { getFavorites } from '../../store/selectors';
import { Offers } from '../../types/offers';
import { Sorting } from '../../types/sorting';
import Placecard from '../placecard/placecard';
import './favorites.scss';


const initialSorting: Sorting = {
  type: SortingType.Rating,
  order: SortingOrder.Asc,
};

function Favorites(): JSX.Element {
  const favorites = useSelector(getFavorites);
  const areFavorites = !!favorites.length;

  const [sorting, setSorting] = useState(initialSorting);

  const onSortingClick = (sortingType: SortingType) => {
    if (sortingType === sorting.type) {
      sorting.order === SortingOrder.Asc ?
        setSorting({
          ...sorting,
          order: SortingOrder.Desc,
        }) :
        setSorting({
          ...sorting,
          order: SortingOrder.Asc,
        });
    } else {
      setSorting({
        ...sorting,
        type: sortingType,
      });
    }
  };

  const sortFavorites = (currentSorting: Sorting): Offers => {
    switch (true) {
      case (sorting.type === SortingType.Price && sorting.order === SortingOrder.Asc):
        return favorites.slice().sort((prev, next) => prev.price - next.price);

      case (sorting.type === SortingType.Price && sorting.order === SortingOrder.Desc):
        return favorites.slice().sort((prev, next) => next.price - prev.price);

      case (sorting.type === SortingType.Rating && sorting.order === SortingOrder.Asc):
        return favorites.slice().sort((prev, next) => prev.stars - next.stars);

      case (sorting.type === SortingType.Rating && sorting.order === SortingOrder.Desc):
        return favorites.slice().sort((prev, next) => next.stars - prev.stars);

      default:
        return favorites;
    }
  };

  const sortedFavorites = sortFavorites(sorting);

  return (
    <section className="main-screen__section favorites">
      <h2 className="favorites__title">Избранное</h2>
      {
        favorites.length > 1 &&
        <div className="favorites__menu">
          <input className="visually-hidden favorites__sort-option" type="radio" id="rating-radio" name="sort-type" value={SortingType.Rating} defaultChecked={sorting.type === SortingType.Rating} onClick={(evt) => {
            onSortingClick(SortingType.Rating);
          }}
          />
          <label className={`favorites__sort-label ${sorting.order === SortingOrder.Asc ? 'favorites__sort-label--asc' : 'favorites__sort-label--desc'}`} htmlFor="rating-radio">Рейтинг</label>
          <input className="visually-hidden favorites__sort-option" type="radio" id="price-radio" name="sort-type" value={SortingType.Price} defaultChecked={sorting.type === SortingType.Price}  onClick={(evt) => {
            onSortingClick(SortingType.Price);
          }}
          />
          <label  className={`favorites__sort-label ${sorting.order === SortingOrder.Asc ? 'favorites__sort-label--asc' : 'favorites__sort-label--desc'}`} htmlFor="price-radio">Цена</label>
        </div>
      }
      {
        areFavorites &&
        <ul className="favorites__results">
          {
            sortedFavorites.map((hotel) =>
              <Placecard hotel={hotel} parentSection={PlaceCardParent.Favorites} key={hotel.id} />)
          }
        </ul>
      }

      {
        !areFavorites &&
        <p className="favorites__empty">Вы пока ничего не добавили в Избранное</p>
      }
    </section>
  );
}

export default Favorites;

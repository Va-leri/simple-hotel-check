import './main.scss';

import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { getCity, getStartDate } from '../../store/selectors';
import Results from '../results/results';

function Main ():JSX.Element {
  const city = useSelector(getCity);
  const startDate = useSelector(getStartDate);

  return (
    <main className="main-screen__section main-screen__main main">
      <h2 className="visually-hidden">Результаты поиска</h2>
      <ul className="breadcrumbs">
        <li className="breadcrumbs__hotels">Отели</li>
        <li className="breadcrumbs__city">{city}</li>
        <li className="breadcrumbs__date">{startDate}</li>
      </ul>
      <div className="carousel">
        <Carousel showArrows={false} infiniteLoop centerMode centerSlidePercentage={27.35} emulateTouch showThumbs={false} showIndicators={false} showStatus={false}>
          <img src='../img/hotel-photo-1.jpg' alt='Фото отеля 1' />
          <img src='../img/hotel-photo-2.jpg' alt='Фото отеля 2' />
          <img src='../img/hotel-photo-3.jpg' alt='Фото отеля 3' />
          <img src='../img/hotel-photo-4.jpg' alt='Фото отеля 4' />
        </Carousel>
      </div>
      <Results />
    </main>
  );
}

export default Main;

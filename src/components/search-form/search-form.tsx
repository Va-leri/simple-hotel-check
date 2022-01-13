import dayjs from 'dayjs';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DATE_FORMAT } from '../../const';
import { fetchHotelsAction } from '../../store/api-actions';
import { getIsLoading } from '../../store/selectors';
import { SearchParameters } from '../../types/search-parameters';
import './search-form.scss';

const initialSearchParameters: SearchParameters = {
  city: '',
  startDate:'',
  daysNumber: 0,
};

enum SearchFormFields {
  City = 'location',
  StartDate = 'date-from',
  DaysNumber = 'days',
}


function SearchForm(): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);

  const [searchParameters, setSearchParameters] = useState(initialSearchParameters);
  const [isDisabled, setIsDisabled] = useState(true);

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    let value = evt.target.value;
    const field = evt.target.name;

    switch (field) {
      case SearchFormFields.City:
        if (value.search(/[0-9]/g) >=0) {
          return;
        }

        setSearchParameters({
          ...searchParameters,
          city: value,
        });

        setIsDisabled(!searchParameters.daysNumber || !searchParameters.startDate || !value.length);
        break;

      case SearchFormFields.StartDate:
        if (dayjs(value) < dayjs()) {
          value = dayjs().format(DATE_FORMAT);
        }

        setSearchParameters({
          ...searchParameters,
          startDate: value,
        });

        setIsDisabled(!searchParameters.city || !searchParameters.daysNumber || !value.length);
        break;

      case SearchFormFields.DaysNumber:
        if (!Number(value)) {
          return;
        }

        setSearchParameters({
          ...searchParameters,
          daysNumber: Number(value),
        });

        setIsDisabled(!searchParameters.city || !searchParameters.startDate || !value.length);
        break;

      default:
        setSearchParameters(initialSearchParameters);
        setIsDisabled(true);
    }
  };

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(fetchHotelsAction(searchParameters));
  };

  return (
    <form className="main-screen__section search-form" action="" method="get" onSubmit={onFormSubmit}>
      <label className="search-form__label" htmlFor="location-field">Локация</label>
      <input className="search-form__input" type="text" name="location" id="location-field" value={searchParameters.city} onChange={onInputChange} disabled={isLoading} required />
      <label className="search-form__label" htmlFor="date-from-field">Дата заселения</label>
      <input className="search-form__input" type="date" name="date-from" id="date-from-field" value={searchParameters.startDate} onChange={onInputChange} disabled={isLoading} required />
      <label className="search-form__label" htmlFor="days-field">Количество дней</label>
      <input className="search-form__input" type="text" name="days" id="days-field" value={searchParameters.daysNumber || ''} onChange={onInputChange} disabled={isLoading} required />
      <button className="search-form__btn" type="submit" disabled={isDisabled || isLoading}>Найти</button>
    </form>
  );
}

export default SearchForm;

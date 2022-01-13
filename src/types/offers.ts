import { SearchParameters } from './search-parameters';

export type Offer = SearchParameters & {
  city: string,
  id: string,
  isFavorite: boolean,
  price: number,
  stars: number,
  title: string,
} | Record<string, never>;

export type Offers = Offer[];

export type OfferFromServer = {
  location: {
      country: string;
      geo: {
          lon: number;
          lat: number;
      };
      state: null;
      name: string;
  };
  priceAvg: number;
  pricePercentile: {
      '3': number;
      '10': number;
      '35': number;
      '50': number;
      '75': number;
      '99': number;
  };
  hotelName: string;
  stars: number;
  locationId: number;
  hotelId: number;
  priceFrom: number;
};

export type OffersFromServer = OfferFromServer[];

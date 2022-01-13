import { datatype, lorem, system, address } from 'faker';
import { MAX_RATING } from './const';
import { Offer, Offers } from './types/offer';

export const makeOffer = (): Offer => ({
  city: address.city(),
  id: datatype.number(),
  images: Array(1).fill(null).map(() => system.filePath()),
  isFavorite: datatype.boolean(),
  price: datatype.number(),
  rating: datatype.number(MAX_RATING),
  title: lorem.words(4),
  dateFrom: datatype.datetime().toDateString(),
  dateTo: datatype.datetime().toDateString(),
});

export const makeOffers = (number: number): Offers =>
  Array(number).fill(null).map(() => makeOffer());

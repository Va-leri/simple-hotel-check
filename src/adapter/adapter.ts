import { OfferFromServer, Offer, OffersFromServer, Offers } from '../types/offers';
import { SearchParameters } from '../types/search-parameters';

export const adaptHotelToClient = ({location, hotelId, priceFrom, stars, hotelName}: OfferFromServer, {startDate, daysNumber}: SearchParameters): Offer =>({
  city: location.name,
  id: `${hotelId}_${startDate}_${daysNumber}`,
  isFavorite: false,
  price: Number(priceFrom.toFixed()),
  stars: stars,
  title: hotelName,
  startDate: startDate,
  daysNumber: daysNumber,
});

export const adaptHotelsToClient = (data: OffersFromServer, searchParams: SearchParameters): Offers => data.map((item) => adaptHotelToClient(item, searchParams));

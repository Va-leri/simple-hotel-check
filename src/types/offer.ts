export type Offer = {
  id: number,
  city: string,
  images: string[],
  price: number,
  rating: number,
  title: string,
  dateFrom: string,
  dateTo: string,
  isFavorite: boolean
};

export type Offers = Offer[];

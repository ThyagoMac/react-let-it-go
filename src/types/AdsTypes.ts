export type AdsType = {
  id: string;
  title: string;
  price: number;
  priceNegotiable: boolean;
  state: string;
  text: string;
  src: string;
  category?: string;
  desc?: string;
  others?: AdsListType;
  dateCreated?: Date;
  views?: number;
  images?: string[];
};

export type AdsListType = AdsType[];

export type AddAdType = {
  title: string;
  category: string;
  price: number;
  priceNegotiable: boolean;
  desc: string;
  images?: string[];
};
export type AddAdErrorType = {
  mainErr?: string;
  title: string;
  category: string;
  price: string;
  priceNegotiable: string;
  desc: string;
  images?: string;
};

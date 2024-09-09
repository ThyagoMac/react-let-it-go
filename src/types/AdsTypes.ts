export type AdsType = {
  id: string;
  title: string;
  price: number;
  priceNegotiable: boolean;
  state: string;
  text: string;
  src: string;
  others?: AdsListType;
  dateCreated?: Date;
  views?: number;
  images?: string[];
};

export type AdsListType = AdsType[];

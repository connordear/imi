export interface Phrase {
  id: number;
  ja: string;
  en: string;
  rating: UserRating;
}

export enum UserRating {
  Unrated = 0,
  Bad = 1,
  Ok = 2,
  Good = 3,
}

export interface Setting {
  key: string;
  label: string;
  value: string | number | boolean;
}

export interface Phrase {
  ja: string;
  en: string;
  rating: PhraseRating;
}

export enum PhraseRating {
  Unrated = 0,
  Bad = 1,
  Ok = 2,
  Good = 3,
}

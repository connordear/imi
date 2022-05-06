import { atom, DefaultValue, selectorFamily } from "recoil";
import { Phrase, UserRating } from "../types";
import { localStorageEffect } from "./utils";
var randomPhrases = require("../assets/random_phrases.json");

const guardRecoilDefaultValue = (
  candidate: unknown
): candidate is DefaultValue => {
  if (candidate instanceof DefaultValue) return true;
  return false;
};

export const phrasesAtom = atom<Phrase[]>({
  key: "phrases",
  default:
    randomPhrases?.map((phrase: Phrase, i: number) => ({
      ...phrase,
      id: i,
      rating: UserRating.Unrated,
    })) || [],
  effects: [localStorageEffect("phrases")],
});

export const phraseIndexAtom = atom({
  key: "phraseIndex",
  default: 0,
  effects: [localStorageEffect("phraseIndex")],
});

// Get a phrase by id
export const phraseSelector = selectorFamily<Phrase, number>({
  key: "phraseSelector",
  get:
    (id: number) =>
    ({ get }) => {
      const phrases = get(phrasesAtom);
      return phrases[id];
    },
  set:
    (id: number) =>
    ({ set, get }, newValue: Phrase | DefaultValue) => {
      if (guardRecoilDefaultValue(newValue)) return;
      const phrases = get(phrasesAtom);
      set(
        phrasesAtom,
        phrases.map((phrase: Phrase) => (phrase.id === id ? newValue : phrase))
      );
    },
});

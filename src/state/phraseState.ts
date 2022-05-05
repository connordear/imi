import { atom } from "recoil";
import { Phrase, PhraseRating } from "../types";

var randomPhrases = require("../assets/random_phrases.json");

export const phrasesAtom = atom<Phrase[]>({
  key: "phrases",
  default: randomPhrases.map((phrase: Phrase) => ({
    ...phrase,
    rating: PhraseRating.Unrated,
  })),
});

export const phraseIndexAtom = atom({
  key: "phraseIndex",
  default: 0,
});

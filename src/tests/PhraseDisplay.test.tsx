import { UserRating } from "../types";
import { getNextIndex } from "../components/PhraseDisplay";

const testPhrases = [
  {
    id: 0,
    en: "a",
    ja: "a",
    rating: UserRating.Bad,
  },
  {
    id: 1,
    en: "a",
    ja: "a",
    rating: UserRating.Good,
  },
  {
    id: 2,
    en: "a",
    ja: "a",
    rating: UserRating.Unrated,
  },
  {
    id: 3,
    en: "a",
    ja: "a",
    rating: UserRating.Good,
  },
  {
    id: 4,
    en: "a",
    ja: "a",
    rating: UserRating.Good,
  },
  {
    id: 5,
    en: "a",
    ja: "a",
    rating: UserRating.Bad,
  },
];

const testPhrasesAll3Star = [
  {
    id: 0,
    en: "a",
    ja: "a",
    rating: UserRating.Good,
  },
  {
    id: 1,
    en: "a",
    ja: "a",
    rating: UserRating.Good,
  },
  {
    id: 2,
    en: "a",
    ja: "a",
    rating: UserRating.Good,
  },
];

const testPhrasesFirstAndLastIs3Star = [
  {
    id: 0,
    en: "a",
    ja: "a",
    rating: UserRating.Good,
  },
  {
    id: 1,
    en: "a",
    ja: "a",
    rating: UserRating.Bad,
  },
  {
    id: 2,
    en: "a",
    ja: "a",
    rating: UserRating.Good,
  },
];

it("returns index + 1 when called before end of array", () =>
  expect(getNextIndex(testPhrases, 0, false, true)).toBe(1));

it("returns index - 1 when called before beginning of array", () =>
  expect(getNextIndex(testPhrases, 4, false, false)).toBe(3));

it("returns 0 when called on the last element of the array", () =>
  expect(getNextIndex(testPhrases, testPhrases.length - 1, false, true)).toBe(
    0
  ));

it("returns the last index when called in reverse on the first element", () =>
  expect(getNextIndex(testPhrases, 0, false, false)).toBe(
    testPhrases.length - 1
  ));

// Now test when we skip 3 stars
it("returns i=2 when called on the currentIdx = 0, but phrases[1] is 3-stars", () =>
  expect(getNextIndex(testPhrases, 0, true, true)).toBe(2));

it("returns the next element if all phrases are 3 stars", () =>
  expect(getNextIndex(testPhrasesAll3Star, 0, true, true)).toBe(1));
it("returns correct index when it needs to loop back to the start but both start and end are 3 stars", () =>
  expect(getNextIndex(testPhrasesFirstAndLastIs3Star, 2, true, true)).toBe(1));
it("returns correct index when it needs to loop back to the end but both start and end are 3 stars", () =>
  expect(getNextIndex(testPhrasesFirstAndLastIs3Star, 0, true, false)).toBe(1));

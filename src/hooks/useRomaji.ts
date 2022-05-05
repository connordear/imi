import { toRomaji as toRomajiWanaKana } from "wanakana";

const romajiDict = new Map<string, string>();
romajiDict.set("は", "wa");

/**
 * @param jp
 * @returns romaji
 * @description convert a single japanese word to romaji
 */
export const useRomaji = (jp: string) => {
  if (romajiDict.has(jp)) {
    return romajiDict.get(jp);
  } else {
    return toRomajiWanaKana(jp);
  }
};

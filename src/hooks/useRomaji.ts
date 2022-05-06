import { toRomaji as toRomajiWanaKana } from "wanakana";

// Use this to override some of default romaji translations
const romajiDict = new Map<string, string>();
romajiDict.set("は", "wa");
romajiDict.set("には", "niwa");
romajiDict.set("出身", "shusshin");
romajiDict.set("日本", "nihon");

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

import { useQuery } from "react-query";
import translate from "translate";

translate.engine = "deepl";
translate.key = process.env.REACT_APP_DEEPL;

// Override some translations
const jpToEnDict = new Map();
jpToEnDict.set("出身", "place where one is born");
jpToEnDict.set("は", "is");
jpToEnDict.set("あります", "has");
jpToEnDict.set("ありますか", "you have?");
jpToEnDict.set("に", "(position article)");
jpToEnDict.set("にほん", "Japan");
jpToEnDict.set("すんでいますか", "you live?");
jpToEnDict.set("いきたいですか", "do you want to go?");
jpToEnDict.set("いったことが", "been to");
jpToEnDict.set("ごねん", "5 years");
jpToEnDict.set("いきましたか", "did you go?");
jpToEnDict.set("いきました", "went");
jpToEnDict.set("いきますか", "are you going?");
export function useTranslationQuery(japanese = "") {
  return useQuery(["jp", japanese], async () => {
    if (jpToEnDict.has(japanese)) {
      return new Promise((resolve) => resolve(jpToEnDict.get(japanese)));
    }
    const data = await translate(japanese, { to: "en", from: "ja" });
    return data;
  });
}

import { useQuery } from "react-query";
import translate from "translate";

translate.engine = "deepl";
translate.key = process.env.REACT_APP_DEEPL;

// Override some translations
const jpToEnDict = new Map();
jpToEnDict.set("出身", "place where one is born");
jpToEnDict.set("は", "is");

export function useTranslationQuery(japanese = "") {
  return useQuery(["jp", japanese], async () => {
    if (jpToEnDict.has(japanese)) {
      return new Promise((resolve) => resolve(jpToEnDict.get(japanese)));
    }
    const data = await translate(japanese, { to: "en", from: "ja" });
    return data;
  });
}

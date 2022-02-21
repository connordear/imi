import { useQuery } from "react-query";
import translate from "translate";

translate.engine = "deepl";
translate.key = process.env.REACT_APP_DEEPL;

export function useTranslationQuery(japanese = "") {
  return useQuery(["jp", japanese], async () => {
    const data = await translate(japanese, { to: "en", from: "ja" });
    return data;
  });
}

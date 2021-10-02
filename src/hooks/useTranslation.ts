import axios from "axios";
import { useQuery } from "react-query";
import { JishoResponse } from "../types";

export function useTranslationQuery(japanese = "") {
  return useQuery(["jp", japanese], async () => {
    const data = await axios.get<JishoResponse>(
      `https://jisho.org/api/v1/search/words?keyword=${japanese}`
    );
    return data.data.data[0];
  });
}

import axios from "axios";
import { useQuery } from "react-query";

const useTranslation = async (japanese: string = "") => {
  const { data } = await axios.get<string[]>(
    `https://jisho.org:5000/api/v1/search/words?keyword=${japanese}`
  );
  return data;
};
interface JishoSection {
  antonyms: string[];
  english_definitions: string[];
}

interface JishoBase {
  senses: JishoSection[];
  slug: string;
}

interface JishoResponse {
  data: JishoBase[];
}

export function useTranslationQuery(japanese = "") {
  return useQuery(["jp", japanese], async () => {
    const data = await axios.get<JishoResponse>(
      `https://jisho.org/api/v1/search/words?keyword=${japanese}`
    );
    return data.data.data[0].senses[0].english_definitions;
  });
}

import { toRomaji as toRomajiWanaKana } from "wanakana";

export const useRomaji = () => {
  const toRomaji = (jp: string) => {
    if (jp === "は") return "wa";
    return toRomajiWanaKana(jp);
  };
  return { toRomaji };
};

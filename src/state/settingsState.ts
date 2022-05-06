import { atom, DefaultValue, selectorFamily } from "recoil";
import { Setting } from "../types";
import { localStorageEffect } from "./utils";

export const HIDE_ENGLISH = "hide_english";
export const HIDE_ROMAJI = "hide_romaji";
export const SKIP_IF_GOOD = "skip_if_good";

const guardRecoilDefaultValue = (
  candidate: unknown
): candidate is DefaultValue => {
  if (candidate instanceof DefaultValue) return true;
  return false;
};

export const settingsAtom = atom({
  key: "settings",
  default: [
    { key: HIDE_ENGLISH, label: "Hide English", value: false },
    { key: HIDE_ROMAJI, label: "Hide Romaji", value: false },
    { key: SKIP_IF_GOOD, label: "Skip 3 Starred Cards", value: false },
  ] as Setting[],
  effects: [localStorageEffect("settings")],
});

export const settingSelector = selectorFamily<Setting, string>({
  key: "settingSelector",
  get:
    (key: string) =>
    ({ get }) => {
      const settings = get(settingsAtom);
      return (
        settings.find((s) => s.key === key) || { key: "", value: "", label: "" }
      );
    },
  set:
    (key: string) =>
    ({ set, get }, newValue) => {
      if (guardRecoilDefaultValue(newValue)) return;
      const settings = get(settingsAtom);
      set(
        settingsAtom,
        settings.map((s) => (s.key === key ? newValue : s))
      );
    },
});

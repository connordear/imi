import React, { FC, useEffect, useState } from "react";
import { useRomaji } from "../hooks/useRomaji";
import { useTranslationQuery } from "../hooks/useTranslation";
import autorenew from "../assets/autorenew.png";
interface BreakdownProps {
  japanese: string;
}
export const Breakdown: FC<BreakdownProps> = ({ japanese }) => {
  const { data: response } = useTranslationQuery(japanese);
  const { toRomaji } = useRomaji();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (response && response.senses.length > 0) {
      setActiveIndex(0);
    }
  }, [response]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p className={"breakdown-en"}>{toRomaji(japanese)}</p>
      <p className={"breakdown-jp"}>{japanese}</p>
      <div className={"breakdown-en"}>
        {response &&
          response.senses[
            activeIndex % response.senses.length
          ]?.english_definitions.map((en) => <p key={en}>{en}</p>)}
      </div>
      <button
        style={{
          display: response && response.senses.length > 1 ? "auto" : "none",
        }}
        className={"icon-btn"}
        onClick={() => setActiveIndex((prev) => prev + 1)}
      >
        <img src={autorenew} className={"btn-icon"} />
      </button>
    </div>
  );
};

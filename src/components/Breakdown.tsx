import React, { FC } from "react";
import { useRomaji } from "../hooks/useRomaji";
import { useTranslationQuery } from "../hooks/useTranslation";
interface BreakdownProps {
  japanese: string;
}
export const Breakdown: FC<BreakdownProps> = ({ japanese }) => {
  const { data: response } = useTranslationQuery(japanese);
  const { toRomaji } = useRomaji();

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
        {response && <p key={response}>{response}</p>}
      </div>
    </div>
  );
};

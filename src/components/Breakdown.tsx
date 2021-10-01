import React, { FC, useEffect } from "react";
import { toRomaji } from "wanakana";
import { useTranslationQuery } from "../hooks/useTranslation";
interface BreakdownProps {
  japanese: string;
}
export const Breakdown: FC<BreakdownProps> = ({ japanese }) => {
  const { data } = useTranslationQuery(japanese);
  useEffect(() => {
    console.log(data);
  }, [data]);
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
      <p className={"breakdown-en"}>
        {data?.map((en) => (
          <p key={en}>{en}</p>
        ))}
      </p>
    </div>
  );
};

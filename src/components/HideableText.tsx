import React from "react";
import { Grid } from "semantic-ui-react";

interface HideableTextProps {
  isHidden: boolean;
  text?: string;
  children?: React.ReactNode;
}
export const HideableText = ({
  isHidden,
  text,
  children,
}: HideableTextProps) => {
  return isHidden ? (
    <Grid.Column className="ui reveal fade" textAlign={"center"}>
      <div className={"hidden content"} style={{ marginTop: 1 }}>
        {!!text ? <p>{text}</p> : children}
      </div>
      <div
        className={"visible content"}
        style={{
          backgroundColor: "#616161",
          height: "2em",
          minHeight: "100%",
          width: "100%",
        }}
      >
        &nbsp;
      </div>
    </Grid.Column>
  ) : (
    <Grid.Column textAlign={"center"}>
      {!!text ? <p>{text}</p> : children}
    </Grid.Column>
  );
};
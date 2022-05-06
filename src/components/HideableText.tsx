import React from "react";
import { Container, Grid } from "semantic-ui-react";

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
      <div
        className={"hidden content"}
        style={{ marginTop: 1, paddingLeft: 5, paddingRight: 5 }}
      >
        {!!text ? <p>{text}</p> : children}
      </div>
      <div
        className={"visible content"}
        style={{
          backgroundColor: "#d6d4d0",
          height: "2em",
          minHeight: "100%",
          width: "85%",
          marginLeft: "7.5%",
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

import React, { FC } from "react";
import { Container, Grid, Icon } from "semantic-ui-react";
import { useRomaji } from "../hooks/useRomaji";
import { useTranslationQuery } from "../hooks/useTranslation";
interface BreakdownProps {
  japanese: string;
}
export const Breakdown: FC<BreakdownProps> = ({ japanese }) => {
  const { data: response, isLoading: responseIsLoading } =
    useTranslationQuery(japanese);
  const romaji = useRomaji(japanese);

  return (
    <div>
      <Grid centered columns={1}>
        <Grid.Row textAlign={"center"}>{romaji}</Grid.Row>
        <Grid.Row>
          <p className={"breakdown-jp"}>{japanese}</p>
        </Grid.Row>
        <Grid.Row>
          <div className={"breakdown-en"}>
            {response && <p key={response}>{response}</p>}
            {responseIsLoading && <Icon name={"spinner"} loading />}
          </div>
        </Grid.Row>
      </Grid>
    </div>
  );
};

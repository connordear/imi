import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { Container, Grid, Icon, Loader } from "semantic-ui-react";
import { useRomaji } from "../hooks/useRomaji";
import { useTranslationQuery } from "../hooks/useTranslation";
import {
  HIDE_ENGLISH,
  HIDE_ROMAJI,
  settingSelector,
} from "../state/settingsState";
import { HideableText } from "./HideableText";
interface BreakdownProps {
  japanese: string;
}
export const Breakdown: FC<BreakdownProps> = ({ japanese }) => {
  const { data: response, isLoading: responseIsLoading } =
    useTranslationQuery(japanese);
  const romaji = useRomaji(japanese);
  const hideEnglish = useRecoilValue(settingSelector(HIDE_ENGLISH));
  const hideRomaji = useRecoilValue(settingSelector(HIDE_ROMAJI));
  return (
    <div>
      <Grid centered columns={1}>
        <Grid.Row textAlign={"center"}>
          <HideableText isHidden={!!hideRomaji.value}>{romaji}</HideableText>
        </Grid.Row>
        <Grid.Row>
          <p className={"breakdown-jp"}>{japanese}</p>
        </Grid.Row>
        <Grid.Row>
          {response && (
            <HideableText isHidden={!!hideEnglish.value}>
              {response}
            </HideableText>
          )}
          {responseIsLoading && <Loader size="mini" active inline />}
        </Grid.Row>
      </Grid>
    </div>
  );
};

import React from "react";
import { useRecoilValue } from "recoil";
import { Container, Header, Rating, Segment } from "semantic-ui-react";
import { phraseSelector } from "../state/phraseState";
import { HIDE_ENGLISH, settingSelector } from "../state/settingsState";

interface PhraseSummaryProps {
  phraseId: number;
  isSelected: boolean;
}
export const PhraseSummary = ({
  phraseId,
  isSelected = false,
}: PhraseSummaryProps) => {
  const phrase = useRecoilValue(phraseSelector(phraseId));
  const hideEnglish = useRecoilValue(settingSelector(HIDE_ENGLISH));
  return (
    <Header
      as="h4"
      style={{
        color: isSelected ? "white" : "grey",
      }}
    >
      <Header.Content>
        {phrase.ja}
        {!hideEnglish && (
          <Header.Subheader
            style={{
              color: isSelected ? "white" : "grey",
              marginBottom: 10,
            }}
          >
            {phrase.en}
          </Header.Subheader>
        )}
        <Rating disabled rating={phrase.rating} maxRating={3} size={"tiny"} />
      </Header.Content>
    </Header>
  );
};

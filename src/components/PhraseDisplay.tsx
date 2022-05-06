import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Segment, Grid, Button, Divider } from "semantic-ui-react";
import { phraseIndexAtom, phrasesAtom } from "../state/phraseState";
import {
  HIDE_ENGLISH,
  settingSelector,
  SKIP_IF_GOOD,
} from "../state/settingsState";
import { Phrase } from "../types";
import { Breakdown } from "./Breakdown";
import { HideableText } from "./HideableText";
import { PhraseRating } from "./PhraseRating";

export const getNextIndex = (
  phrases: Phrase[],
  currentIndex: number,
  skipIf3Stars: boolean,
  isForward: boolean
) => {
  const modifier = isForward ? 1 : -1;

  // If we are don't care about skipping 3 stars, or ALL phrases are 3 stars, just return the next index
  if (!skipIf3Stars || phrases.every((phrase) => phrase.rating === 3)) {
    // we add the length in the case that we are at the start of the list and going backwards
    return (currentIndex + modifier + phrases.length) % phrases.length;
  }

  // skip 3 stars (we know there is at least one phrase here not 3 stars)
  let nextIndex = (currentIndex + modifier + phrases.length) % phrases.length;
  while (phrases[nextIndex].rating === 3) {
    nextIndex = (nextIndex + modifier + phrases.length) % phrases.length;
  }
  return nextIndex;
};

export const PhraseDisplay = () => {
  const [phraseIdx, setPhraseIdx] = useRecoilState(phraseIndexAtom);

  const hideEnglish = useRecoilValue(settingSelector(HIDE_ENGLISH));
  const skipIfGood = useRecoilValue(settingSelector(SKIP_IF_GOOD));

  const phrases = useRecoilValue(phrasesAtom);
  const jp = phrases[phraseIdx]?.ja || "";
  const en = phrases[phraseIdx]?.en || "";

  const nextPhrase = useCallback(() => {
    setPhraseIdx(getNextIndex(phrases, phraseIdx, !!skipIfGood.value, true));
  }, [phrases, phraseIdx, skipIfGood]);

  const prevPhrase = useCallback(() => {
    setPhraseIdx(getNextIndex(phrases, phraseIdx, !!skipIfGood.value, false));
  }, [phrases, phraseIdx, skipIfGood]);

  return (
    <Segment>
      <Grid columns={1} centered>
        <Grid.Row>
          <Grid columns={3} centered verticalAlign={"middle"}>
            <Grid.Column textAlign={"right"}>
              <Button onClick={prevPhrase}>Previous</Button>
            </Grid.Column>
            <HideableText text={en} isHidden={!!hideEnglish.value} />
            <Grid.Column textAlign={"left"}>
              <Button onClick={nextPhrase}>Next</Button>
            </Grid.Column>
          </Grid>
        </Grid.Row>
        <Grid.Row>
          <p className={"breakdown-jp"}>{jp}</p>
        </Grid.Row>
        {/* Breakdown */}
        <Divider />
        <Grid.Row>
          <Grid.Column textAlign={"center"}>
            <Grid centered>
              <Grid.Row>
                <div
                  style={{
                    display: "flex",
                    gap: "25px",
                    justifyContent: "center",
                    alignItems: "top",
                  }}
                >
                  {jp.split(/\s*[\s,。]\s*/).map((s: string, i: number) => (
                    <Breakdown key={`${s}-${i}`} japanese={s} />
                  ))}
                </div>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>

        <Divider />
        {/* Rating */}
        <Grid.Row>
          <PhraseRating phraseId={phraseIdx} />
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

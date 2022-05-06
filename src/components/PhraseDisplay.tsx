import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useRecoilState, useRecoilValue } from "recoil";
import { Segment, Grid, Button, Divider, Icon } from "semantic-ui-react";
import {
  phraseIndexAtom,
  phrasesAtom,
  phraseSelector,
} from "../state/phraseState";
import {
  HIDE_ENGLISH,
  settingSelector,
  SKIP_IF_GOOD,
} from "../state/settingsState";
import { Phrase, UserRating } from "../types";
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
  if (
    !skipIf3Stars ||
    phrases.every((phrase) => phrase.rating === UserRating.Good)
  ) {
    // we add the length in the case that we are at the start of the list and going backwards
    return (currentIndex + modifier + phrases.length) % phrases.length;
  }

  // skip 3 stars (we know there is at least one phrase here not 3 stars)
  let nextIndex = (currentIndex + modifier + phrases.length) % phrases.length;
  while (phrases[nextIndex].rating === UserRating.Good) {
    nextIndex = (nextIndex + modifier + phrases.length) % phrases.length;
  }
  return nextIndex;
};

export const PhraseDisplay = () => {
  const [phraseIdx, setPhraseIdx] = useRecoilState(phraseIndexAtom);
  const [phrase, setPhrase] = useRecoilState(phraseSelector(phraseIdx));

  const hideEnglish = useRecoilValue(settingSelector(HIDE_ENGLISH));
  const skipIfGood = useRecoilValue(settingSelector(SKIP_IF_GOOD));

  const phrases = useRecoilValue(phrasesAtom);
  const jp = phrases[phraseIdx]?.ja || "";
  const en = phrases[phraseIdx]?.en || "";

  const nextPhrase = () => {
    setPhraseIdx(getNextIndex(phrases, phraseIdx, !!skipIfGood.value, true));
  };

  const prevPhrase = () => {
    setPhraseIdx(getNextIndex(phrases, phraseIdx, !!skipIfGood.value, false));
  };

  useHotkeys("left", prevPhrase, [phraseIdx, phrases, skipIfGood]);
  useHotkeys("right", nextPhrase, [phraseIdx, phrases, skipIfGood]);
  useHotkeys(
    "0",
    () => {
      setPhrase((phrase) => ({ ...phrase, rating: UserRating.Unrated }));
    },
    [phrase]
  );
  useHotkeys(
    "1",
    () => {
      setPhrase((phrase) => ({ ...phrase, rating: UserRating.Bad }));
    },
    [phrase]
  );
  useHotkeys(
    "2",
    () => {
      setPhrase((phrase) => ({ ...phrase, rating: UserRating.Ok }));
    },
    [phrase]
  );
  useHotkeys(
    "3",
    () => {
      setPhrase((phrase) => ({ ...phrase, rating: UserRating.Good }));
    },
    [phrase]
  );

  return (
    <Segment>
      <Grid columns={1} centered>
        <Grid.Row only="computer tablet">
          <Grid columns={3} stackable centered verticalAlign={"middle"}>
            <Grid.Column textAlign={"right"}>
              <Button onClick={prevPhrase} icon labelPosition="left">
                <Icon name={"arrow left"} />
                Previous
              </Button>
            </Grid.Column>
            <HideableText text={en} isHidden={!!hideEnglish.value} />
            <Grid.Column textAlign={"left"}>
              <Button onClick={nextPhrase} icon labelPosition="right">
                Next
                <Icon name={"arrow right"} />
              </Button>
            </Grid.Column>
          </Grid>
        </Grid.Row>

        <Grid.Row only="mobile" columns={2} centered>
          <Grid.Column textAlign="right">
            <Button onClick={prevPhrase} icon labelPosition="left">
              <Icon name={"arrow left"} />
              Previous
            </Button>
          </Grid.Column>
          <Grid.Column textAlign="left">
            <Button onClick={nextPhrase} icon labelPosition="right">
              Next
              <Icon name={"arrow right"} />
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row only="mobile">
          <HideableText text={en} isHidden={!!hideEnglish.value} />
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

import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Segment, Grid, Button, Divider } from "semantic-ui-react";
import { phraseIndexAtom, phrasesAtom } from "../state/phraseState";
import { Breakdown } from "./Breakdown";

export const PhraseDisplay = () => {
  const [phraseIdx, setPhraseIdx] = useRecoilState(phraseIndexAtom);
  const randomPhrases = useRecoilValue(phrasesAtom);
  const jp = randomPhrases[phraseIdx]?.ja || "";
  const en = randomPhrases[phraseIdx]?.en || "";
  return (
    <Segment>
      <Grid columns={1} centered>
        <Grid.Row>
          <Grid columns={3} centered verticalAlign={"middle"}>
            <Grid.Column textAlign={"right"}>
              <Button
                onClick={() =>
                  setPhraseIdx((prev) => (prev - 1) % randomPhrases.length)
                }
                disabled={phraseIdx === 0}
              >
                Previous
              </Button>
            </Grid.Column>
            <Grid.Column textAlign={"center"}>{en}</Grid.Column>
            <Grid.Column textAlign={"left"}>
              <Button
                onClick={() =>
                  setPhraseIdx((prev) => (prev + 1) % randomPhrases.length)
                }
                disabled={phraseIdx === randomPhrases.length - 1}
              >
                Next
              </Button>
            </Grid.Column>
          </Grid>
        </Grid.Row>
        <Grid.Column textAlign={"center"}>
          <p className={"breakdown-jp"}>{jp}</p>
          <Divider />
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
      </Grid>
    </Segment>
  );
};

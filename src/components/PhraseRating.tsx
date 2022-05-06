import React from "react";
import { useRecoilState } from "recoil";
import { Rating } from "semantic-ui-react";
import { phraseSelector } from "../state/phraseState";
import { UserRating } from "../types";

interface PhraseRatingProps {
  phraseId: number;
}

export const PhraseRating = ({ phraseId }: PhraseRatingProps) => {
  const [phrase, setPhrase] = useRecoilState(phraseSelector(phraseId));
  return (
    <Rating
      rating={phrase.rating}
      maxRating={3}
      onRate={(e, data) =>
        setPhrase({ ...phrase, rating: data.rating as UserRating })
      }
      size={"massive"}
    />
  );
};

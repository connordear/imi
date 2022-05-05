import React, { useState } from "react";
import { Breakdown } from "./components/Breakdown";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Rail,
  Segment,
} from "semantic-ui-react";
var randomPhrases = require("./assets/random_phrases.json");

function App() {
  const [jp, setJp] = useState("こんにちわ。げんきですか");
  const [en, setEn] = useState("Hello. How are you?");

  const selectRandomPhrase = () => {
    const randomIndex = Math.floor(Math.random() * randomPhrases.length);
    setJp(randomPhrases[randomIndex].jp);
    setEn(randomPhrases[randomIndex].en);
  };

  return (
    <>
      <Container style={{ marginTop: "3em" }}>
        <Header textAlign={"center"} size={"huge"}>
          imi
        </Header>
        <Segment>
          <Grid columns={1} centered>
            <Grid.Row>
              <Grid columns={3} centered verticalAlign={"middle"}>
                <Grid.Column textAlign={"right"}>
                  <Button onClick={selectRandomPhrase}>Previous</Button>
                </Grid.Column>
                <Grid.Column textAlign={"center"}>{en}</Grid.Column>
                <Grid.Column textAlign={"left"}>
                  <Button onClick={selectRandomPhrase}>Next</Button>
                </Grid.Column>
              </Grid>
            </Grid.Row>
            <Grid.Column textAlign={"center"}>
              <p className={"breakdown-jp"}>{jp}</p>
              <Divider />
              <Grid centered style={{ marginTop: "2em" }}>
                <Grid.Row>
                  <div
                    style={{
                      display: "flex",
                      gap: "25px",
                    }}
                  >
                    {jp.split(/\s*[\s,。]\s*/).map((s, i) => (
                      <Breakdown key={`${s}-${i}`} japanese={s} />
                    ))}
                  </div>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
      <footer style={{ position: "fixed", bottom: 5, width: "100%" }}>
        <div>
          <h5 style={{ textAlign: "center" }}>
            This site uses an API provided by{" "}
            <a href={"https://www.deepl.com/"}>https://www.deepl.com/</a>
          </h5>
          <h5 style={{ textAlign: "center" }}>
            Have a suggestion? Open an issue on my&nbsp;
            <a href={"https://github.com/connordear/imi"}>GitHub project.</a>
          </h5>
        </div>
      </footer>
    </>
  );
}

export default App;

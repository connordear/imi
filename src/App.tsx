import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "semantic-ui-css/semantic.min.css";
import {
  Container,
  Grid,
  Header,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Image,
  Button,
} from "semantic-ui-react";
import { PhraseDisplay } from "./components/PhraseDisplay";
import { phraseIndexAtom, phrasesAtom } from "./state/phraseState";

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const phrases = useRecoilValue(phrasesAtom);
  const [selectedPhraseIndex, setSelectedPhraseIndex] =
    useRecoilState(phraseIndexAtom);
  return (
    <Grid columns={1}>
      <Grid.Column style={{ paddingBottom: 0 }}>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={() => setIsSidebarVisible(false)}
            vertical
            visible={isSidebarVisible}
            width="thin"
          >
            {phrases.map((phrase, i) => (
              <Menu.Item
                key={i}
                as="a"
                onClick={() => {
                  setSelectedPhraseIndex(i);
                  setIsSidebarVisible(false);
                }}
              >
                <Header
                  as="h4"
                  style={{
                    color: selectedPhraseIndex === i ? "white" : "grey",
                  }}
                >
                  <Header.Content>
                    {phrase.ja}
                    <Header.Subheader
                      style={{
                        color: selectedPhraseIndex === i ? "white" : "grey",
                      }}
                    >
                      {phrase.en}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Menu.Item>
            ))}
          </Sidebar>

          <Sidebar.Pusher
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "100vh",
            }}
            dimmed={isSidebarVisible}
          >
            <Container>
              <Button
                icon={<Icon name="sidebar" />}
                onClick={() => setIsSidebarVisible(true)}
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                }}
              />
              <Header textAlign={"center"} size={"huge"}>
                imi
              </Header>
              <PhraseDisplay />
            </Container>
            <Segment
              inverted
              style={{ width: "100%", marginBottom: 0, borderRadius: 0 }}
            >
              <div>
                <h5 style={{ textAlign: "center" }}>
                  This site uses an API provided by{" "}
                  <a href={"https://www.deepl.com/"}>https://www.deepl.com/</a>
                </h5>
                <h5 style={{ textAlign: "center" }}>
                  Have a suggestion? Open an issue on my&nbsp;
                  <a href={"https://github.com/connordear/imi"}>
                    GitHub project.
                  </a>
                </h5>
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
}

export default App;

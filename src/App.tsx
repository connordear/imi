import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import "semantic-ui-css/semantic.min.css";
import {
  Container,
  Grid,
  Header,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Button,
} from "semantic-ui-react";
import { PhraseDisplay } from "./components/PhraseDisplay";
import { PhraseSummary } from "./components/PhraseSummary";
import { SettingsSidebar } from "./components/SettingsSidebar";
import { phraseIndexAtom, phrasesAtom } from "./state/phraseState";
import { Phrase } from "./types";

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const phrases = useRecoilValue(phrasesAtom);
  const [selectedPhraseIndex, setSelectedPhraseIndex] =
    useRecoilState(phraseIndexAtom);
  return (
    <Grid columns={1}>
      <Grid.Column style={{ paddingBottom: 0, backgroundColor: "#efefef" }}>
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
            {phrases.map((phrase: Phrase, i: number) => (
              <Menu.Item
                key={i}
                as="a"
                onClick={() => {
                  setSelectedPhraseIndex(i);
                }}
                style={{
                  opacity: phrase.rating >= 3 ? 0.5 : 1,
                }}
              >
                <PhraseSummary
                  phraseId={i}
                  isSelected={selectedPhraseIndex === i}
                />
              </Menu.Item>
            ))}
          </Sidebar>
          <SettingsSidebar
            isVisible={isSettingsVisible}
            setIsVisible={setIsSettingsVisible}
          />
          <Sidebar.Pusher
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "100vh",
            }}
            dimmed={isSidebarVisible || isSettingsVisible}
          >
            <Container style={{ marginTop: 20 }}>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Row columns={3}>
                  <Grid.Column textAlign="left">
                    <Button
                      icon={<Icon name="sidebar" />}
                      onClick={() => setIsSidebarVisible(true)}
                      style={{}}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Header
                      textAlign={"center"}
                      size={"huge"}
                      style={{ fontSize: "3em" }}
                    >
                      imi
                    </Header>
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <Button
                      icon={<Icon name="settings" />}
                      onClick={() => setIsSettingsVisible(true)}
                      style={{}}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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

import React from "react";
import { useSetRecoilState } from "recoil";
import {
  Modal,
  Button,
  Header,
  Sidebar,
  Segment,
  Form,
  Checkbox,
  Menu,
  Container,
} from "semantic-ui-react";
import { phrasesAtom } from "../state/phraseState";
import {
  HIDE_ENGLISH,
  HIDE_ROMAJI,
  SKIP_IF_GOOD,
} from "../state/settingsState";
import { SettingChanger } from "./SettingChanger";

interface SettingsSidebarProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}
export const SettingsSidebar = ({
  isVisible,
  setIsVisible,
}: SettingsSidebarProps) => {
  const setPhrases = useSetRecoilState(phrasesAtom);
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      inverted
      onHide={() => setIsVisible(false)}
      vertical
      visible={isVisible}
      direction={"right"}
    >
      <Menu.Item>
        <SettingChanger settingKey={HIDE_ENGLISH} />
      </Menu.Item>
      <Menu.Item>
        <SettingChanger settingKey={HIDE_ROMAJI} />
      </Menu.Item>
      <Menu.Item>
        <SettingChanger settingKey={SKIP_IF_GOOD} />
      </Menu.Item>
      <Menu.Item>
        <Container textAlign="center">
          <Button
            inverted
            onClick={() => {
              setPhrases((phrases) =>
                phrases.map((p) => ({ ...p, rating: 0 }))
              );
            }}
          >
            Reset Ratings
          </Button>
        </Container>
      </Menu.Item>
    </Sidebar>
  );
};

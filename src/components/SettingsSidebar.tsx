import React from "react";
import {
  Modal,
  Button,
  Header,
  Sidebar,
  Segment,
  Form,
  Checkbox,
  Menu,
} from "semantic-ui-react";
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
    </Sidebar>
  );
};

import React from "react";
import { useRecoilState } from "recoil";
import {
  Checkbox,
  Container,
  Form,
  Grid,
  Header,
  Input,
  Label,
  Segment,
} from "semantic-ui-react";
import { settingSelector } from "../state/settingsState";

interface SettingChangerProps {
  settingKey: string;
}
export const SettingChanger = ({ settingKey }: SettingChangerProps) => {
  const [setting, setSetting] = useRecoilState(settingSelector(settingKey));
  if (!setting) return <>Bad Setting Key</>;

  switch (typeof setting.value) {
    case "boolean":
      return (
        <Segment inverted>
          <Grid columns={2} verticalAlign={"middle"}>
            <Grid.Row>
              <Grid.Column>
                <p>{setting.label}</p>
              </Grid.Column>
              <Grid.Column>
                <Checkbox
                  toggle
                  checked={setting.value}
                  inline
                  onClick={() =>
                    setSetting({ ...setting, value: !setting.value })
                  }
                  style={{ backgroundColor: "grey", borderRadius: 10 }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    default:
      return <>Bad Setting Type</>;
  }
};

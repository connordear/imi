import React, { useState } from "react";
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
import { Phrase } from "./components/Phrase";

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
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
            <Menu.Item as="a">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="gamepad" />
              Games
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="camera" />
              Channels
            </Menu.Item>
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
              <Phrase />
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

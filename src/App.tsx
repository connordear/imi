import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Header } from "semantic-ui-react";
import { Phrase } from "./components/Phrase";

function App() {
  return (
    <>
      <Container style={{ marginTop: "3em" }}>
        <Header textAlign={"center"} size={"huge"}>
          imi
        </Header>
        <Phrase />
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

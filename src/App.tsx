import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Breakdown } from "./components/Breakdown";
import TextareaAutosize from "react-textarea-autosize";
function App() {
  const [jp, setJp] = useState("こんにちわ。げんきですか");
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <h1>imi</h1>
        <TextareaAutosize
          style={{ fontSize: 24, padding: 10 }}
          value={jp}
          placeholder={"Enter a Japanese phrase here."}
          onChange={(e) => setJp(e.currentTarget.value)}
        />
        <div
          style={{
            display: "flex",
            gap: "25px",
          }}
        >
          {jp.split(/\s*[\s,。]\s*/).map((s) => (
            <Breakdown japanese={s} />
          ))}
        </div>
      </div>
      <footer style={{ position: "fixed", bottom: 5, width: "100%" }}>
        <div>
          <h5 style={{ textAlign: "center" }}>
            This site uses an API provided by{" "}
            <a href={"https://jisho.org/"}>https://jisho.org/</a>
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

import React, { useState } from "react";
import "./App.css";
import { Breakdown } from "./components/Breakdown";
import TextareaAutosize from "react-textarea-autosize";
import autorenew from "./assets/autorenew.png";
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <h1>imi</h1>
        <p>{en}</p>
        <TextareaAutosize
          style={{ fontSize: 24, padding: 10 }}
          value={jp}
          placeholder={"Enter a Japanese phrase here."}
          onChange={(e) => setJp(e.currentTarget.value)}
        />
        <button className={"icon-btn"} onClick={selectRandomPhrase}>
          <img src={autorenew} className={"btn-icon"} />
        </button>
        <div
          style={{
            display: "flex",
            gap: "25px",
          }}
        >
          {jp.split(/\s*[\s,。]\s*/).map((s) => (
            <Breakdown key={s} japanese={s} />
          ))}
        </div>
      </div>
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

import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Breakdown } from "./components/Breakdown";
import TextareaAutosize from "react-textarea-autosize";
function App() {
  const [jp, setJp] = useState("こんにちわ。げんきですか");
  return (
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
        onChange={(e) => setJp(e.currentTarget.value)}
      />
      <div
        style={{
          display: "flex",
          gap: "25px",
        }}
      >
        {jp.split(/\s*[\s,]\s*/).map((s) => (
          <Breakdown japanese={s} />
        ))}
      </div>
    </div>
  );
}

export default App;

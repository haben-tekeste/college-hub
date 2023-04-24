import axios from "axios";

import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const postHandler = () => {
    console.log("hello world")
    axios.post("http://localhost:3300/question", {prompt}).then(result => {
      setResponse(result.data.response);
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div className="App">
      <h1>Ask GPT</h1>
      <input type="text" onChange={(e) => setPrompt(e.target.value)} />
      <button onClick={postHandler}>Ask</button>
      <div className="answer">
        <p>{response.trim()}</p>
      </div>
    </div>
  );
}

export default App;

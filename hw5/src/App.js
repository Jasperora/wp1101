import React, { useState } from "react";
import "./App.css";
import Buttons from "./Containers/Buttons";

function App() {
  const [clicked, setClicked] = useState([false, false, false, false]);
  const [message, setMessage] = useState("");
  const [numArr, setNumArr] = useState(["0"]);
  const [num, setNum] = useState(0);
  const [second, setSecond] = useState(false);
  const [m, setM] = useState(false);
  const [finished, setFinished] = useState(false);
  const addNum = (a) => {
    setNumArr((prev) => [...prev, a]);
  };

  return (
    <div className="App">
      <div>
        <h1>{numArr}</h1>
        <h1>{message}</h1>
      </div>
      <Buttons
        function1={[clicked, setClicked]}
        function2={[numArr, setNumArr]}
        function3={[num, setNum]}
        function4={[second, setSecond]}
        function5={[m, setM]}
        function6={[finished, setFinished]}
        setMessage={() => setMessage()}
        addNum={(a) => addNum(a)}
      />
    </div>
  );
}

export default App;

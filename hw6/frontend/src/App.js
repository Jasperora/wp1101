import React, { useState } from "react";
import { startGame, guess, restart } from "./axios";
import "./App.css";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");

  const getValueInput = () => {
    let inputValue = document.getElementById("input").value;
    return inputValue;
  };

  const handleGuess = async () => {
    //get number and send it to backend
    const response = await guess(number);
    if (response === "Equal") setHasWon(true);
    else {
      setStatus(response);
      setNumber("");
    }
  };
  const startMenu = (
    <div>
      <button
        onClick={async () => {
          setHasStarted(true);
          await startGame();
        }}
      >
        start game
      </button>
    </div>
  );
  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input // Get the value from input
        type="text"
        name="input"
        id="input"
        onChange={() => {
          setNumber(getValueInput());
        }}
        value={number}
      ></input>
      <button onClick={handleGuess} disabled={!number}>
        guess!
      </button>
      <p>{status}</p>
    </>
  );
  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button // Handle restart for backend and frontend
        onClick={async () => {
          setHasStarted(true);
          setHasWon(false);
          setStatus("");
          setNumber("");
          await restart();
        }}
      >
        restart
      </button>
    </>
  );
  const game = <div>{hasWon ? winningMode : gameMode}</div>;
  return <div className="App App-header">{hasStarted ? game : startMenu}</div>;
}

export default App;

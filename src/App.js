import './App.css';
import Quordle from './components/Quordle';
import KeyBoard from './components/KeyBoard';
import GameOver from './components/GameOver';
import React, { useState, createContext, useEffect } from 'react';
import { generateWordSet, wordle } from './utils/wordle';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(wordle);
  const [complete, setComplete] = useState([0, 0, 0, 0]);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    gameWon: false,
  });
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWords, setCorrectWords] = useState(['', '', '', '']);
  const onselectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];

    for (let i = 0; i < newBoard.length; i++) {
      if (complete[i] === 0) {
        newBoard[i][currAttempt.attempt][currAttempt.letterPos] = keyVal;
      }
    }

    setBoard(newBoard);
    setCurrAttempt({
      ...currAttempt,
      letterPos: currAttempt.letterPos + 1,
    });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];

    for (let i = 0; i < newBoard.length; i++) {
      if (complete[i] === 0) {
        newBoard[i][currAttempt.attempt][currAttempt.letterPos - 1] = '';
      }
    }

    setBoard(newBoard);
    setCurrAttempt({
      ...currAttempt,
      letterPos: currAttempt.letterPos - 1,
    });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    let currWord = '';
    let j = 0;
    while (j < 4) {
      if (complete[j] === 0) break;
      j++;
    }
    for (let i = 0; i < 5; i++) {
      currWord += board[j][currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert('Not a valid Word!');
    }
    for (let i = 0; i < 4; i++) {
      if (currWord === correctWords[i]) {
        complete[i] = 1;
      }
    }
    let flag = 1;
    for (let i = 0; i < 4; i++) {
      if (complete[i] === 0) {
        flag = 0;
      }
    }

    if (flag) {
      setGameOver({ gameOver: true, gameWon: true });
    } else if (currAttempt.attempt >= 7) {
      setGameOver({ gameOver: true, gameWon: false });
    }
  };

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWords(words.todaysWords);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <>
          <div className="md:hidden">Please open in Desktop!</div>
          <div className="lg:w-1/2 md:flex flex-col hidden">
            <p>Quordle</p>
            <AppContext.Provider
              value={{
                board,
                setBoard,
                complete,
                setComplete,
                currAttempt,
                setCurrAttempt,
                onselectLetter,
                onDelete,
                onEnter,
                correctWords,
                disabledLetters,
                setDisabledLetters,
                gameOver,
              }}
            >
              <div className="flex justify-center">
                <Quordle />
              </div>
              {gameOver.gameOver ? <GameOver /> : <KeyBoard />}
            </AppContext.Provider>
          </div>
        </>
      </header>
    </div>
  );
}

export default App;

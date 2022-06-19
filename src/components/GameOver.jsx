import React, { useContext } from 'react';
import { AppContext } from '../App';

function GameOver() {
  const { gameOver, currAttempt, correctWords } = useContext(AppContext);

  if (gameOver.gameWon) {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-3xl">You guessed all words correctly!</div>
        <div className="text-2xl self-center">
          Correct Words:
          {correctWords.map((word, i) => (
            <span
              key={i}
              className="bg-gray-400 px-2 py-1 m-2 place-content-center text-xl rounded"
            >
              {word}
            </span>
          ))}
        </div>
        <div className="text-2xl">
          You completed in total {currAttempt.attempt} attempts.
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="text-3xl">You lost!</div>
      <div className="text-2xl self-center">
        Correct Words:
        {correctWords.map((word, i) => (
          <span
            key={i}
            className="bg-gray-400 px-2 py-1 m-2 place-content-center text-xl rounded"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

export default GameOver;

import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';

function Letter({ letter, i, j, k }) {
  const { correctWords, currAttempt, complete, setDisabledLetters } =
    useContext(AppContext);
  const correct = correctWords[i][k] === letter;
  const almost = !correct && letter !== '' && correctWords[i].includes(letter);
  const letterState =
    currAttempt.attempt > j &&
    (correct ? 'correct' : almost ? 'almost' : !complete[i] ? 'wrong' : '');

  useEffect(() => {
    if (letter !== '' && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div
      className={`rounded text-lg h-10 font-medium border border-1 text-white p-1 m-0.5 

    ${letterState === 'correct' && 'bg-green-500'}
    ${letterState === 'almost' && 'bg-yellow-400'}
    ${letterState === 'wrong' && 'bg-gray-700'}`}
    >
      {letter}
    </div>
  );
}

export default Letter;

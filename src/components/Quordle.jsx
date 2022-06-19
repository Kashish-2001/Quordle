import React, { useContext } from 'react';
import { AppContext } from '../App';
import Letter from './Letter';

function Quordle() {
  const { board } = useContext(AppContext);

  return (
    <div className="grid grid-cols-2 w-3/4">
      {board.map((wordle, i) => (
        <div key={i} className=" m-1">
          <div className="grid grid-rows-9">
            {wordle.map((row, j) => {
              return (
                <div key={j} className="grid grid-cols-5">
                  {row.map((letter, k) => {
                    return <Letter key={k} letter={letter} i={i} j={j} k={k} />;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Quordle;

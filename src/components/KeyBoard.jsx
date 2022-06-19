import React, { useEffect, useCallback, useContext } from 'react';
import { AppContext } from '../App';
import Key from '../components/Key';

function KeyBoard() {
  const { onselectLetter, onDelete, onEnter, disabledLetters } =
    useContext(AppContext);

  const line1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const line2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const line3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      onEnter();
    } else if (event.key === 'Backspace') {
      onDelete();
    } else {
      line1.forEach((letter) => {
        if (event.key.toUpperCase() === letter.toUpperCase()) {
          onselectLetter(letter);
        }
      });
      line2.forEach((letter) => {
        if (event.key.toUpperCase() === letter.toUpperCase()) {
          onselectLetter(letter);
        }
      });
      line3.forEach((letter) => {
        if (event.key.toUpperCase() === letter.toUpperCase()) {
          onselectLetter(letter);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  return (
    <div onKeyDown={handleKeyDown} className="flex flex-col items-center my-4">
      <div className="flex">
        {line1.map((key) => (
          <Key
            key={key}
            keyVal={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
      </div>

      <div className="flex">
        {line2.map((key) => (
          <Key
            key={key}
            keyVal={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
      </div>

      <div className="flex">
        <Key keyVal="ENTER" bigButton />
        {line3.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
        <Key keyVal="DELETE" bigButton />
      </div>
    </div>
  );
}

export default KeyBoard;

import { AppContext } from '../App';
import React, { useContext } from 'react';

function Key({ keyVal, bigButton, disabled }) {
  const { onselectLetter, onDelete, onEnter } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === 'ENTER') {
      onEnter();
    } else if (keyVal === 'DELETE') {
      onDelete();
    } else {
      onselectLetter(keyVal);
    }
  };

  return (
    <div
      onClick={selectLetter}
      className={`cursor-pointer w-10 place-self-center text-lg font-medium text-black bg-slate-50 border border-1 px-1 py-2 m-1 
      ${bigButton && 'w-24'} ${disabled && 'bg-slate-400 border-0'} `}
    >
      {keyVal}
    </div>
  );
}

export default Key;

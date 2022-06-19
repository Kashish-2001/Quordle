import wordBank from './word-bank.txt';

export const wordle = [
  [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ],
  [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ],
  [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ],
  [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ],
];

export const generateWordSet = async () => {
  let wordSet;
  let todaysWords = [];
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split('\n');
      for (let i = 0; i < 4; i++) {
        todaysWords[i] =
          wordArr[Math.floor(Math.random() * wordArr.length)].toUpperCase();
      }
      wordSet = new Set(wordArr);
    });
  return { wordSet, todaysWords };
};

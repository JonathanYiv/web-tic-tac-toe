// Gameboard in Array
// Players in Objects
// Object controlling Game
// Use Modules/Factories
// Modules: Need one of something
// Factories: Need multiples of something
// JavaScript function to render the array on the webpage
// JavaScript DOM event handlers to add marks to the board
// JavaScript function to check for win logic
const gameBoard = (() => {
  const positions = new Array(9).fill(' ');
  const placeO = pos => positions[pos] = 'O';
  const placeX = pos => positions[pos] = 'X';
  const getPositions = () => positions;
  return {
    placeO,
    placeX,
    getPositions,
  };
})();

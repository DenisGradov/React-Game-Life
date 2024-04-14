//скрипт для создания объектов

const rows = [
  "ooooooooooooooooooooooooxo",
  "ooooooooooooooooooxxxxxooo",
  "ooooooooooooxoxxxxoooooxxo",
  "ooooooooooooxoxoooooxoxxxo",
  "xxxxxxxxoooooxooxxoooxoxxxx",
  "xxxxxxoooooooxooxxooooxxxoo",
  "oooooooooooooxooxxoooooxooo",
  "oooooooooooooxoxoooooooooo",
  "ooooooooooooooxo",
];

const gridPattern = rows.map((row, y) =>
  row.split("").map((cell, x) => ({
    position: { x: x, y: y },
    color: cell === "x" ? "#ff7474" : "white",
  }))
);

console.log(gridPattern);

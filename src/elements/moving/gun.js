const rows = [
  "oooooooooooooooooooooooooxoooooooooo",
  "ooooooooooooooooooooooxxxxoooooooooo",
  "oooooooooooooxoooooooxxxxoooooooooxx",
  "ooooooooooooxoxooooooxooxoooooooooxx",
  "xxoooooooooxoooxxooooxxxxooooxoooooo",
  "xxoooooooooxoooxxoooooxxxxoooxoooooo",
  "oooooooooooxoooxxooooooooxooooooooo",
  "ooooooooooooxoxoooooooooooooooooooo",
  "oooooooooooooxooooooooooooooooooooo",
];

const gridPattern = rows.map((row, y) =>
  row.split("").map((cell, x) => ({
    position: { x: x, y: y },
    color: cell === "x" ? "#ff7474" : "white",
  }))
);

const gun = {
  img: "/figures/gun.gif",
  object: gridPattern,
};
export default gun;

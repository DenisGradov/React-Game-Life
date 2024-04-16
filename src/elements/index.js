import animationFigures from "./animation";
import staticFigures from "./static";
import gun from "./moving/gun";

const figures = [
  { figure: staticFigures, title: "Статические" },
  { figure: animationFigures, title: "Анимированные" },
  {
    figure: [
      {
        title: "Глайдер",
        object: {
          img: "/glider.gif",
          object: [
            [{ position: { x: 1, y: 0 }, color: "#ff7474" }],
            [{ position: { x: 2, y: 1 }, color: "#ff7474" }],
            [
              { position: { x: 0, y: 2 }, color: "#ff7474" },
              { position: { x: 1, y: 2 }, color: "#ff7474" },
              { position: { x: 2, y: 2 }, color: "#ff7474" },
            ],
          ],
        },
      },
      { title: "Ружье", object: gun },
    ],
    title: "Двигающиеся",
  },
];
export default figures;

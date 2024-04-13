import animationFigures from "./animation";
import staticFigures from "./static";
import movingFigures from "./moving";

const figures = [
  { figure: staticFigures, title: "Статические" },
  { figure: animationFigures, title: "Анимированные" },
  { figure: movingFigures, title: "Двигающиеся" },
];
export default figures;

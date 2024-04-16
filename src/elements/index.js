import animationFigures from "./animation";
import staticFigures from "./static";
import glider from "./moving/glider";
import gun from "./moving/gun";

const figures = [
  { figure: staticFigures, title: "Статические" },
  { figure: animationFigures, title: "Анимированные" },
  {
    figure: [
      { title: "Глайдер", object: glider },
      { title: "Ружье", object: gun },
    ],
    title: "Двигающиеся",
  },
];
export default figures;

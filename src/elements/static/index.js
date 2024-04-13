import block from "./block";
import caravan from "./caravan";
import hive from "./hive";
import pixel from "./pixel";
import pond from "./pond";
import well from "./well";
import whitePixel from "./white-pixel";
import snake from "./snake";
import barge from "./barge";
import bigBarge from "./bigBarge";
import boat from "./boat";
import bigBoat from "./bigBoat";
import ship from "./ship";
import bigShip from "./bigShip";

const staticFigures = [
  { title: "Пиксель", object: pixel },
  { title: "Пустота", object: whitePixel },
  { title: "Улей", object: hive },
  { title: "Ящик", object: well },
  { title: "Караван", object: caravan },
  { title: "Пруд", object: pond },
  { title: "Блок", object: block },
  { title: "Змея", object: snake },
  { title: "Баржа", object: barge },
  { title: "Big баржа", object: bigBarge },
  { title: "Лодка", object: boat },
  { title: "Big лодка", object: bigBoat },
  { title: "Корабль", object: ship },
  { title: "Big корабль", object: bigShip },
];

export default staticFigures;

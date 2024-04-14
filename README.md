Проект написан на реакте
Суть проекта - реализация Игра "Жизнь", где есть поле x на y пустых клеток, которое рандомно заполняется живыми клетками
Для живых клеток есть 2 правила:
-если клетка не закрашена и имеет 3 закрашенных соседа - она закрашивается
-если клетка закрашена - она остается закрашенной только если она имеет 2-3 закрашенных соседа, иначе мы ее убираем
Из таких простых правил рождается непредсказуемый результат. Нажав на стрелочку - вы откроете 2 панели (по бокам экрана). В левой панели вы можете изменять мир, все интуитивно понятно. В правой колонке вы можете выбирать уже готовые элементы и выставлять их на карте

У меня не получилось сделать этот проект оптимизированным (т.к. условное поле 100 на 100 пикселей (что мало для этой игры) - это 10000 клеток, каждый ход нужно проверять каждую клетку на 2 правила, при этом проверять и рендерить клики игроков. Тут много вызовов юзэфектов, например для сейва настроек в локал и т.д.)

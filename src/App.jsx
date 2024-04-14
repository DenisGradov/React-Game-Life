/* eslint-disable react-hooks/rules-of-hooks */
import { Image, useEffect, useState } from "react";
import "./App.css";
import logo from "../public/logo.png";
import figures from "./elements";
import styles from "./app.module.scss";
import useRandom from "./hooks/useRandom";
import {
  RiArrowLeftDoubleFill,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowRightSFill,
  RiDeleteBin5Line,
  RiDraftLine,
  RiMoonLine,
  RiPauseCircleLine,
  RiPlayCircleLine,
  RiRepeatFill,
  RiSunLine,
} from "react-icons/ri";

function App() {
  // eslint-disable-next-line no-unused-vars
  const defaultSettings = {
    panelOpen: false,
    sizeCells: 20,
    sizeWorldX: 100,
    sizeWorldY: 100,
    randomCells: 5,
    thema: "day",
    timeInTick: 1000,
    cells: [],
    cellsForWeb: [],
    worldTime: 0,
    tusk: { state: false, description: "", x: 0, y: 0 },
    listFigures: { actualFigure: [0, 0], actualFigureInGroup: [] },
  };

  const defaultWorldTime = { pause: false, time: 0 };

  const [settings, setSettings] = useState({ ...defaultSettings });
  const [worldTime, setWorldTime] = useState({ ...defaultWorldTime });

  const generateCells = () => {
    const cells = [];
    const cellsForWeb = [];
    for (let y = 0; y <= settings.sizeWorldY - 1; y++) {
      let lineCells = [];
      let lineCellsForWeb = [];
      for (let x = 0; x <= settings.sizeWorldX - 1; x++) {
        let newCell = {
          position: { x: 0, y: 0 },
          color: settings.thema == "day" ? "white" : "rgb(82, 82, 82)",
        };
        newCell.position.x = x;
        newCell.position.y = y;
        newCell.color =
          useRandom(100) < settings.randomCells
            ? "#ff7474"
            : settings.thema == "day"
            ? "white"
            : "rgb(82, 82, 82)";
        lineCells.push(newCell);
        lineCellsForWeb.push(
          <div
            onClick={(e) => {
              handleCellClick(x, y, "left");
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              handleCellClick(x, y, "right");
            }}
            className={styles.boxLineItem}
            key={`line${y}item${x}`}
            style={{
              width: `${settings.sizeCells}px`,
              height: `${settings.sizeCells}px`,
              backgroundColor: newCell.color,
            }}
          ></div>
        );
      }
      cells.push(lineCells);
      cellsForWeb.push(
        <div key={`line${y}`} className={styles.boxLine}>
          {lineCellsForWeb}
        </div>
      );
    }
    setSettings((prevSettings) => ({
      ...prevSettings,
      cells: cells,
      cellsForWeb: cellsForWeb,
    }));
  };

  function handleCellClick(x, y, buttonClick) {
    const objectForCreate =
      figures[settings.listFigures.actualFigure[0]].figure[
        settings.listFigures.actualFigure[1]
      ].object.object;
    setSettings((prevSettings) => ({
      ...prevSettings,
      tusk: {
        state: true,
        description: "add",
        buttonClick,
        x1: x,
        x2: prevSettings.sizeWorldX,
        y1: y,
        y2: prevSettings.sizeWorldY,
        cells: objectForCreate,
      },
    }));
  }

  // eslint-disable-next-line no-unused-vars
  const checkCells = () => {
    // Определение смещений для 8 соседних клеток
    const variants = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ];

    if (settings.cells.length > 0) {
      const newCells = settings.cells.map((row) =>
        row.map((cell) => ({ ...cell }))
      );
      const newCellsForWeb = [];

      for (let y = 0; y < settings.sizeWorldY; y++) {
        let lineCellsForWeb = [];
        for (let x = 0; x < settings.sizeWorldX; x++) {
          let colorCells = 0;

          variants.forEach(([dy, dx]) => {
            const newY = y + dy;
            const newX = x + dx;
            if (
              newY >= 0 &&
              newY < settings.sizeWorldY &&
              newX >= 0 &&
              newX < settings.sizeWorldX
            ) {
              if (
                settings.cells[newY][newX].color !== "white" &&
                settings.cells[newY][newX].color !== "rgb(82, 82, 82)"
              ) {
                colorCells += 1;
              }
            }
          });

          if (
            (newCells[y][x].color === "white" ||
              newCells[y][x].color === "rgb(82, 82, 82)") &&
            colorCells === 3
          ) {
            newCells[y][x].color = "#ff7474";
          } else if (newCells[y][x].color === "#ff7474") {
            if (colorCells < 2 || colorCells > 3) {
              newCells[y][x].color =
                settings.thema == "day" ? "white" : "rgb(82, 82, 82)";
            }
          }

          if (
            settings.tusk.state &&
            settings.tusk.description == "Clear World"
          ) {
            newCells[y][x].color =
              settings.thema == "day" ? "white" : "rgb(82, 82, 82)";
          }

          lineCellsForWeb.push(
            <div
              onClick={() => {
                handleCellClick(x, y, "left");
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                handleCellClick(x, y, "right");
              }}
              className={styles.boxLineItem}
              key={`line${y}item${x}`}
              style={{
                width: `${settings.sizeCells}px`,
                height: `${settings.sizeCells}px`,
                backgroundColor: newCells[y][x].color,
              }}
            ></div>
          );
        }
        newCellsForWeb.push(
          <div key={`line${y}`} className={styles.boxLine}>
            {lineCellsForWeb}
          </div>
        );
      }

      if (settings.tusk.state && settings.tusk.description !== "Clear World") {
        const x1 = settings.tusk.x1;
        const y1 = settings.tusk.y1;
        const newSettings = { ...settings };
        const actualCategory =
          settings.tusk.buttonClick == "left"
            ? newSettings.listFigures.actualFigure[0]
            : 0;
        const actualFigur =
          settings.tusk.buttonClick == "left"
            ? newSettings.listFigures.actualFigure[1]
            : 1;

        const obj = figures[actualCategory].figure[actualFigur].object.object;
        obj.forEach((row) => {
          row.forEach((cell) => {
            const globalX = x1 + cell.position.x;
            const globalY = y1 + cell.position.y;

            if (
              globalX >= 0 &&
              globalX < newSettings.sizeWorldX &&
              globalY >= 0 &&
              globalY < newSettings.sizeWorldY
            ) {
              newSettings.cells[globalY][globalX].color = cell.color;
            }
          });
        });

        const newCellsForWeb = newSettings.cells.map((row, y) => (
          <div key={`line-${y}`} className={styles.boxLine}>
            {row.map((cell, x) => (
              <div
                onClick={() => handleCellClick(x, y, "left")}
                key={`cell-${y}-${x}`}
                style={{
                  width: `${newSettings.sizeCells}px`,
                  height: `${newSettings.sizeCells}px`,
                  backgroundColor: cell.color,
                }}
                className={styles.boxLineItem}
              ></div>
            ))}
          </div>
        ));

        setSettings((prevSettings) => ({
          ...prevSettings,
          cells: newSettings.cells,
          cellsForWeb: newCellsForWeb,
          tusk: { ...prevSettings.tusk, state: false },
        }));
        return;
      }

      if (!worldTime.pause) {
        setSettings((prevSettings) => ({
          ...prevSettings,
          cells: newCells,
          cellsForWeb: newCellsForWeb,
          tusk: defaultSettings.tusk,
          worldTime: prevSettings.worldTime + 1,
        }));
      } else if (settings.tusk.state) {
        setSettings((prevSettings) => ({
          ...prevSettings,
          cells: newCells,
          cellsForWeb: newCellsForWeb,
          tusk: { ...prevSettings.tusk, state: false },
        }));
      }
    }
  };
  useEffect(() => {
    // Загрузка настроек при монтировании компонента
    const newListFigures = { ...settings.listFigures };
    newListFigures.actualFigureInGroup = [];
    for (let i in figures) {
      newListFigures.actualFigureInGroup.push(0);
    }
    const settingsFromLocalData = localStorage.getItem("settings");
    if (settingsFromLocalData) {
      const settingsFromLocalObject = JSON.parse(settingsFromLocalData);
      setSettings((prevSettings) => ({
        ...prevSettings,
        listFigures: settingsFromLocalObject.listFigures,
        panelOpen: settingsFromLocalObject.panelOpen,
        sizeCells: settingsFromLocalObject.sizeCells,
        sizeWorldX: settingsFromLocalObject.sizeWorldX,
        sizeWorldY: settingsFromLocalObject.sizeWorldY,
        randomCells: settingsFromLocalObject.randomCells,
        timeInTick: settingsFromLocalObject.timeInTick,
        thema: settingsFromLocalObject.thema,
      }));
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!worldTime.pause || settings.tusk.state) {
        checkCells();
      }
    }, settings.timeInTick);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    worldTime.pause,
    settings.timeInTick,
    settings,
    settings.cells,
    settings.cellsForWeb,
  ]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!worldTime.pause) {
        checkCells();
      }
    }, settings.timeInTick);

    return () => {
      clearInterval(intervalId);
    };
  }, [worldTime.pause]);

  useEffect(() => {
    const intervalId2 = setInterval(() => {
      if (!worldTime.pause) {
        const newWorldTime = { ...worldTime };
        newWorldTime.time = newWorldTime.time + 1;
        setWorldTime(newWorldTime);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId2);
    };
  }, [worldTime]);

  useEffect(() => {
    setWorldTime({
      ...defaultWorldTime,
    });
  }, [worldTime.timeInTick]);

  useEffect(() => {
    generateCells();
  }, [
    settings.sizeCells,
    settings.sizeWorldX,
    settings.sizeWorldY,
    settings.randomCells,
  ]);

  function getMinutes(time) {
    const min = Math.floor(time / 60);
    return min == 0 ? "00" : min <= 9 ? `0${min}` : min > 99 ? "99" : min;
  }
  function getSeconds(time) {
    const sec = time % 60;
    const min = Math.floor(time / 60);
    return sec == 0 ? "00" : sec <= 9 ? `0${sec}` : min > 99 ? "99" : sec;
  }

  function handlePanelOpen() {
    setSettings((prevSettings) => ({
      ...prevSettings,
      panelOpen: !prevSettings.panelOpen,
    }));
  }
  function HandleChangeValue(e, settingKey) {
    const newSettings = { ...settings };
    newSettings[settingKey] = e.target.value;
    localStorage.setItem("settings", JSON.stringify(newSettings));
    setSettings((prevSettings) => ({
      ...prevSettings,
      [settingKey]: e.target.value,
    }));
  }

  return (
    <>
      <div className={styles.world}>
        <div className={styles.box}>
          {settings.cellsForWeb.map((e) => {
            return e;
          })}
        </div>
      </div>
      <div className={`${styles.panel} ${styles.panelRight}`}>
        <div
          id="panelContent"
          className={styles.panelContent}
          style={{
            right: settings.panelOpen ? "0px" : "-300px",
            position: "absolute",
            transition: "0.5s",
            backgroundColor: settings.thema == "day" ? "white" : "#141414",
          }}
        >
          <button
            className={`${styles.panelContentButtonsblock__item} ${styles.panelContentButtonsblock__itemMini}`}
            onClick={() => {
              setSettings((prevSettings) => ({
                ...prevSettings,
                tusk: {
                  state: true,
                  description: "Clear World",
                  x1: 0,
                  x2: prevSettings.sizeWorldX,
                  y1: 0,
                  y2: prevSettings.sizeWorldY,
                  cells: [],
                },
              }));
            }}
          >
            <>
              <RiDeleteBin5Line />
              <h2
                className={`${styles.panelContentButtonsblock__itemtext} ${styles.panelContentButtonsblock__itemtextMini}`}
              >
                Очистить мир
              </h2>
            </>
          </button>
          <h2 className={styles.panelRightTitle}>Установка элементов</h2>
          {figures.map((group, index) => (
            <>
              <div
                onClick={() => {
                  const newSettings = { ...settings };
                  newSettings.listFigures.actualFigure = [
                    index,
                    settings.listFigures.actualFigureInGroup[index],
                  ];
                  setSettings(newSettings);
                  localStorage.setItem("settings", JSON.stringify(newSettings));
                }}
                key={index}
                className={`${styles.panelRightBox} ${
                  settings.listFigures.actualFigure[0] == index &&
                  settings.listFigures.actualFigure[1] ==
                    settings.listFigures.actualFigureInGroup[index]
                    ? styles.panelRightBoxChoise
                    : false
                }`}
              >
                <div key={index} className={styles.panelRightBoxContent}>
                  <h2
                    style={{
                      color: settings.thema == "day" ? "black" : "white",
                    }}
                    key={index}
                    className={styles.panelRightBoxTitle}
                  >
                    {
                      group.figure[
                        settings.listFigures.actualFigureInGroup[index]
                          ? settings.listFigures.actualFigureInGroup[index]
                          : 0
                      ].title
                    }
                  </h2>
                  <img
                    className={styles.panelRightBoxContentImg}
                    src={`../public${
                      group.figure[
                        settings.listFigures.actualFigureInGroup[index]
                      ]
                        ? group.figure[
                            settings.listFigures.actualFigureInGroup[index]
                          ].object.img
                        : "/logo.png"
                    }`}
                  />

                  {
                    group.figure[
                      settings.listFigures.actualFigureInGroup[index]
                        ? settings.listFigures.actualFigureInGroup[index]
                        : 0
                    ].img
                  }
                </div>
                <RiArrowRightSFill
                  onClick={(event) => {
                    event.stopPropagation();
                    if (settings.listFigures.actualFigureInGroup[index] > 0) {
                      const newSettings = { ...settings };
                      newSettings.listFigures.actualFigureInGroup[index]--;
                      setSettings(newSettings);
                    }
                  }}
                  className={`${styles.panelRightBoxArrow} ${
                    settings.listFigures.actualFigureInGroup[index] == 0
                      ? styles.panelRightBoxArrowEnd
                      : false
                  }`}
                />

                <RiArrowRightSFill
                  onClick={(event) => {
                    event.stopPropagation();
                    if (
                      settings.listFigures.actualFigureInGroup[index] <
                      figures[index].figure.length - 1
                    ) {
                      const newSettings = { ...settings };
                      newSettings.listFigures.actualFigureInGroup[index]++;
                      setSettings(newSettings);
                    }
                  }}
                  className={`${styles.panelRightBoxArrow} ${
                    settings.listFigures.actualFigureInGroup[index] ==
                    figures[index].figure.length - 1
                      ? styles.panelRightBoxArrowEnd
                      : false
                  }`}
                />

                <RiArrowLeftDoubleFill
                  onClick={(event) => {
                    event.stopPropagation();
                    if (
                      settings.listFigures.actualFigureInGroup[index] <
                      figures[index].figure.length - 1
                    ) {
                      const newSettings = { ...settings };
                      newSettings.listFigures.actualFigureInGroup[index] =
                        figures[index].figure.length - 1;
                      setSettings(newSettings);
                    }
                  }}
                  className={`${styles.panelRightBoxArrow} ${
                    settings.listFigures.actualFigureInGroup[index] ==
                    figures[index].figure.length - 1
                      ? styles.panelRightBoxArrowEnd
                      : false
                  }`}
                />
                <RiArrowLeftDoubleFill
                  onClick={(event) => {
                    event.stopPropagation();
                    if (settings.listFigures.actualFigureInGroup[index] > 0) {
                      const newSettings = { ...settings };
                      newSettings.listFigures.actualFigureInGroup[index] = 0;
                      setSettings(newSettings);
                    }
                  }}
                  className={`${styles.panelRightBoxArrow} ${
                    settings.listFigures.actualFigureInGroup[index] == 0
                      ? styles.panelRightBoxArrowEnd
                      : false
                  }`}
                />
              </div>

              <h2
                style={{
                  color: settings.thema == "day" ? "black" : "white",
                }}
                className={styles.panelRightBoxCategory}
              >
                {group.title}
              </h2>
            </>
          ))}
        </div>
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
        }}
        className={styles.panel}
      >
        <div
          id="panelContent"
          className={styles.panelContent}
          style={{
            left: settings.panelOpen ? "0px" : "-300px",
            position: "relative",
            transition: "0.5s",
            backgroundColor: settings.thema == "day" ? "white" : "#141414",
          }}
        >
          <a
            className={styles.panelContentLink}
            href="https://github.com/DenisGradov/React-Game-Life"
          >
            <img className={styles.panelContentLinkLogo} src={logo} />
          </a>
          <div className={styles.panelContentThema}>
            {settings.thema == "day" ? (
              <RiSunLine
                style={{
                  transition: "0.5s",
                  color: "#141414",
                }}
                onClick={() => {
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    thema: "night",
                  }));

                  const newSettings = { ...settings };
                  newSettings.thema = "night";
                  localStorage.setItem("settings", JSON.stringify(newSettings));
                }}
                className={styles.panelContentThema__icon}
              />
            ) : (
              <RiMoonLine
                style={{
                  transition: "0.5s",
                  color: "white",
                }}
                onClick={() => {
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    thema: "day",
                  }));
                  const newSettings = { ...settings };
                  newSettings.thema = "day";
                  localStorage.setItem("settings", JSON.stringify(newSettings));
                }}
                className={styles.panelContentThema__icon}
              />
            )}
          </div>
          <div className={styles.panelContentInputblock}>
            <div className={styles.panelContentInputblockItem}>
              <input
                value={settings.sizeCells}
                onChange={(e) => {
                  HandleChangeValue(e, "sizeCells");
                }}
                className={styles.panelContentInputblockItem__input}
              />
              <h2 className={styles.panelContentInputblockItem__text}>
                Размер клетки (px)
              </h2>
            </div>
            <div className={styles.panelContentInputblockItem}>
              <div className={styles.panelContentInputblockItemBox}>
                <input
                  value={settings.sizeWorldX}
                  onChange={(e) => {
                    HandleChangeValue(e, "sizeWorldX");
                  }}
                  className={styles.panelContentInputblockItemBox__input}
                />
                <input
                  value={settings.sizeWorldY}
                  onChange={(e) => {
                    HandleChangeValue(e, "sizeWorldY");
                  }}
                  className={styles.panelContentInputblockItemBox__input}
                />
              </div>
              <h2 className={styles.panelContentInputblockItem__text}>
                Размер мира (Х and Y)
              </h2>
            </div>
            <div className={styles.panelContentInputblockItem}>
              <input
                value={settings.randomCells}
                onChange={(e) => {
                  HandleChangeValue(e, "randomCells");
                }}
                className={styles.panelContentInputblockItem__input}
              />
              <h2 className={styles.panelContentInputblockItem__text}>
                Шанс живой клетки (%)
              </h2>
            </div>
          </div>
          <div className={styles.panelContentButtonsblock}>
            <button
              onClick={() => {
                const newListFigures = { ...settings.listFigures };
                newListFigures.actualFigureInGroup = [];
                for (let i in figures) {
                  newListFigures.actualFigureInGroup.push(0);
                }
                const newSettings = { ...defaultSettings };
                newSettings.worldTime = 0;
                newSettings.panelOpen = true;
                newSettings.listFigures = newListFigures;
                setSettings(newSettings);

                localStorage.setItem("settings", JSON.stringify(newSettings));
                generateCells();
              }}
              className={styles.panelContentButtonsblock__item}
            >
              <RiDraftLine />
              <h2 className={styles.panelContentButtonsblock__itemtext}>
                Сброс настроек
              </h2>
            </button>
            <button
              className={styles.panelContentButtonsblock__item}
              onClick={() => {
                generateCells();
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  worldTime: 0,
                }));
              }}
            >
              <RiRepeatFill />
              <h2 className={styles.panelContentButtonsblock__itemtext}>
                Перезапустить мир
              </h2>
            </button>

            <div className={styles.panelContentButtonsblockTimeControl}>
              <h2
                className={`${styles.panelContentInputblockItem__text} ${styles.panelContentButtonsblock__itemtitle}`}
              >
                Управление временем
              </h2>
              <div className={styles.panelContentButtonsblockTimeControlTime}>
                <button
                  className={`${styles.panelContentButtonsblock__item} ${styles.panelContentButtonsblock__itemMini}`}
                  onClick={() => {
                    setWorldTime((prevSettings) => ({
                      ...prevSettings,
                      pause: !prevSettings.pause,
                    }));
                  }}
                >
                  {worldTime.pause ? (
                    <>
                      <RiPlayCircleLine />
                      <h2
                        className={`${styles.panelContentButtonsblock__itemtext} ${styles.panelContentButtonsblock__itemtextMini}`}
                      >
                        Запуск
                      </h2>
                    </>
                  ) : (
                    <>
                      <RiPauseCircleLine />
                      <h2
                        className={`${styles.panelContentButtonsblock__itemtext} ${styles.panelContentButtonsblock__itemtextMini}`}
                      >
                        Пауза
                      </h2>
                    </>
                  )}
                </button>
                <h2
                  className={`${styles.panelContentInputblockItem__text} ${
                    styles.panelContentButtonsblock__itemtitle
                  } ${styles.panelContentButtonsblock__itemtitletimer} ${
                    worldTime.pause
                      ? styles.panelContentButtonsblock__itemtitletimerpause
                      : false
                  }`}
                >
                  {getMinutes(worldTime.time)}:{getSeconds(worldTime.time)}
                  <h2
                    className={`${styles.panelContentInputblockItem__text}${
                      styles.panelContentInputblockItem__texttick
                    } ${styles.panelContentButtonsblock__itemtitle} ${
                      styles.panelContentButtonsblock__itemtitletimer
                    } ${
                      worldTime.pause
                        ? styles.panelContentButtonsblock__itemtitletimerpause
                        : false
                    }`}
                  >
                    {"(" + settings.worldTime + ")"}
                  </h2>
                </h2>
              </div>

              <div className={styles.panelContentInputblockItem}>
                <input
                  value={settings.timeInTick}
                  onChange={(e) => {
                    HandleChangeValue(e, "timeInTick");
                  }}
                  className={styles.panelContentInputblockItem__input}
                />
                <h2 className={styles.panelContentInputblockItem__text}>
                  Скорость мира (мс)
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={(e) => {
            handlePanelOpen(e);
          }}
          className={styles.panelButton}
          style={{
            left: settings.panelOpen ? "0" : "-215px",
            position: "relative",
            transition: "0.5s",
          }}
        >
          {settings.panelOpen ? (
            <RiArrowLeftLine className={styles.panelButton__icon} />
          ) : (
            <RiArrowRightLine className={styles.panelButton__icon} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;

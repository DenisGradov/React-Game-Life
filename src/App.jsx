/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import "./App.css";
import styles from "./app.module.scss";
import useRandom from "./hooks/useRandom";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDraftLine,
  RiPauseCircleLine,
  RiPlayCircleLine,
  RiRepeatFill,
} from "react-icons/ri";

function App() {
  // eslint-disable-next-line no-unused-vars
  const defaultSettings = {
    panelOpen: false,
    sizeCells: 20,
    sizeWorldX: 100,
    sizeWorldY: 100,
    randomCells: 5,
    cells: [],
  };
  const defaultWorldTime = { time: 0, pause: false };
  const [settings, setSettings] = useState({ ...defaultSettings });
  const [worldTime, setWorldTime] = useState({ ...defaultWorldTime });

  const generateCells = () => {
    const cells = [];
    for (let y = 0; y <= settings.sizeWorldY; y++) {
      let lineCells = [];
      for (let x = 0; x <= settings.sizeWorldX; x++) {
        let newCell = { position: { x: 0, y: 0 }, color: "white" };
        newCell.position.x = x;
        newCell.position.y = y;
        newCell.color =
          useRandom(100) < settings.randomCells ? "black" : "white";
        lineCells.push(
          <div
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
      cells.push(
        <div key={`line${y}`} className={styles.boxLine}>
          {lineCells}
        </div>
      );
    }
    return cells;
  };

  // eslint-disable-next-line no-unused-vars
  const checkCells = () => {
    const newCells = { ...settings.cells };
    setSettings(newCells);
  };
  useEffect(() => {
    console.log(worldTime.time);
    const intervalId = setInterval(() => {
      if (!worldTime.pause) {
        setWorldTime((prevWorldTime) => ({
          ...prevWorldTime,
          time: prevWorldTime.time + 1,
        }));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [worldTime.pause]);

  useEffect(() => {
    const initialCells = generateCells();
    setSettings((prevSettings) => ({ ...prevSettings, cells: initialCells }));
  }, [
    settings.sizeCells,
    settings.sizeWorldX,
    settings.sizeWorldY,
    settings.randomCells,
  ]);

  function getMinutes(time) {
    const min = Math.floor(time / 60);
    return min == 0 ? "00" : min < 9 ? `0${min}` : min > 99 ? "99" : min;
  }
  function getSeconds(time) {
    const sec = time % 60;
    const min = Math.floor(time / 60);
    return sec == 0 ? "00" : sec < 9 ? `0${sec}` : min > 99 ? "99" : sec;
  }

  function handlePanelOpen() {
    setSettings((prevSettings) => ({
      ...prevSettings,
      panelOpen: !prevSettings.panelOpen,
    }));
  }
  function HandleChangeValue(e, settingKey) {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [settingKey]: e.target.value,
    }));
  }

  return (
    <>
      <div className={styles.box}>
        {settings.cells.map((e) => {
          return e;
        })}
      </div>
      <div className={styles.panel}>
        <div
          id="panelContent"
          className={styles.panelContent}
          style={{
            left: settings.panelOpen ? "0px" : "-300px",
            position: "relative",
            transition: "0.5s",
          }}
        >
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
                Шанс черной клетки (%)
              </h2>
            </div>
          </div>
          <div className={styles.panelContentButtonsblock}>
            <button
              onClick={() => {
                const initialCells = generateCells();
                setSettings({
                  ...defaultSettings,
                  panelOpen: true,
                  cells: initialCells,
                });

                setWorldTime({
                  ...defaultWorldTime,
                });
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
                const initialCells = generateCells();
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  cells: initialCells,
                }));
                setWorldTime({
                  ...defaultWorldTime,
                });
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

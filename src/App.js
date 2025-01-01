import React, { useState, useEffect, useRef } from "react";
import percent3 from "./percent3.png";
import percent5 from "./percent5.png";
import percent15 from "./percent15.png";
import percent10 from "./percent15.png";
import chibo from "./chibo.png";
import kinder from "./kinder.png";
import kran from "./kran.png";
import mujuice from "./mujuice.png";
import skamya from "./skamya2.png";
import vaffy from "./vaffy.png"
import background from "./background.webp";
import rollSound from "./open_box.mp3";
import winSound from "./win_01.mp3";
import "./BoxGrid.css";

const shuffleArray = (array) => {
  const shuffledArray = array.slice(); // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const BoxGrid = () => {
  const [boxes] = useState(Array.from({ length: 120 }, (_, i) => i + 1));
  const [randomValue, setRandomValue] = useState(0);
  const [test, setTest] = useState(false);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [shuffledColors, setShuffledColors] = useState([]);
  const [isRolling, setIsRolling] = useState(false); // State to track roll status
  const halfIndex = Math.round(boxes.length / 2) + 1;
  const itemBoxRef = useRef(null);
  const audioRef = useRef(null);
  const audioWinRef = useRef(null);
  const [transitionDuration, setTransitionDuration] = useState("none");

  const images = [
    { name: "Скидка Летуаль 3%", price: "Промокод: PIKABU8", url: percent3 },
    { name: "Скидка 5% на теплоходы в феврале", price: "", url: percent5 },
    { name: "Скидка 5% на оранжевые шторы", price: "", url: percent5 },
    { name: "Скидка Lamoda 10%", price: "Промокод: PIKABU10", url: percent10 },
    { name: "Скидка на смесители GROHE 10%", price: "Промокод: NY2025", url: kran },
    { name: "Скидка 15%. на корм для кошек", price: "Промокод: NY2025", url: percent10 },
    { name: "Скидка 15% в магазинах дверных ручек", price: "", url: percent15 },
    { name: "Скидка 15% на брелоки", price: "При покупке от 400 шт.", url: percent15 },
    { name: "Обнимашки от Ваффи", price: "Доступно при возвращении в Москву", url: vaffy },
    { name: "Чиби", price: "Ждет дома на Волоколамском", url: chibo },
    { name: "Kinder Maxi", price: "", url: kinder },
    { name: "Annki скамья clover", price: "Ждет дома на Волоколамском", url: skamya },
    { name: "Mujuice Downshifting", price: "Ждет 4 января в Москве", url: mujuice },

  ];

  const colors = [
    { background: "#39FF88", border: "#39FF88" },
    { background: "#FF39DF", border: "#FF39DF" },
    { background: "#3FA1FC", border: "#3FA1FC" },
    { background: "#7D7D7D", border: "#7D7D7D" },
  ];

  useEffect(() => {
    setShuffledImages(shuffleArray(images)); // Shuffle images initially
    setShuffledColors(shuffleArray(colors)); // Shuffle colors initially
  }, []);

  const rollRandomLeft = () => {
    if (isRolling) return; // Don't allow multiple rolls simultaneously

    setIsRolling(true); // Set rolling state to true

    setShuffledImages(shuffleArray(images)); // Shuffle images on every roll
    setShuffledColors(shuffleArray(colors)); // Shuffle colors on every roll

    if (itemBoxRef.current) {
      itemBoxRef.current.classList.remove("highlight");
    }
    if (audioRef.current) {
      audioRef.current.play();
    }
    setRandomValue(0);
    setTransitionDuration("none");
    setTest(false);
    setTimeout(() => {
      const randomInRange = -49.8 - Math.random() * 0.4;
      setRandomValue(randomInRange);
      setTransitionDuration("all 7s cubic-bezier(0.0, 0.0, 0.0, 1.0)");
      setTest(true);
      // all 0.5s cubic-bezier(0.0125, 0.1, 0.1, 1) 0s
      setTimeout(() => {
        setRandomValue(Math.round(randomInRange));
        setTransitionDuration("all 0.5s cubic-bezier(0.0, 0.0, 0.0, 1.0)");
        setIsRolling(false); // Set rolling state to false when roll completes
      }, 7500);
    }, 10);
  };

  useEffect(() => {
    if (test) {
      const timer = setTimeout(() => {
        if (itemBoxRef.current) {
          itemBoxRef.current.classList.add("highlight");
          if (audioWinRef.current) {
            audioWinRef.current.play();
          }
        }
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [test]);

  const handleClick = (event) => {
    const index = event.currentTarget.getAttribute("data-index");
    console.log("Clicked box index:", index);
  };

  if (shuffledImages.length === 0 || shuffledColors.length === 0) {
    return <div>Loading...</div>;
  }

  return (
      <>
        <img className="_2_skU"
             src={background}
             aria-label="hidden"/>
        <div className="layout-wrapper">
        <div className="main-wrapper">
          <div className="vertical-container">
            <div className="arrow-top">
              <ArrowTop/>
            </div>
            <div className="container-grid">
              <SVGLeft/>
              <div className="box-wrapper">
                <div className="box-grid">
                  <div className="box-container">
                    <div
                        className="item-grid"
                        style={{
                          transform: `translateX(${randomValue}%)`,
                          transition:
                              randomValue !== 0 ? transitionDuration : "none",
                        }}
                    >
                      {boxes.map((box, index) => {
                        const color =
                            shuffledColors[index % shuffledColors.length];
                        const image =
                            shuffledImages[index % shuffledImages.length];
                        return (
                            <div
                                className="item-box"
                                key={index}
                                data-index={index + 1}
                                ref={index === halfIndex ? itemBoxRef : null}
                                onClick={handleClick}
                            >
                              <div className="item-box-content">
                                <div
                                    className="item"
                                    style={{
                                      borderColor: color.border,
                                      borderWidth: "1px",
                                      borderStyle: "solid",
                                    }}
                                >
                                  <div
                                      className="rarity-shadow"
                                      style={{
                                        backgroundColor: color.background,
                                      }}
                                  />
                                  <div className="item-cover">
                                    <img src={image.url} alt={image.name}/>
                                  </div>
                                  <div className="item-info">
                                    {image.name}
                                    <span>{image.price}</span>
                                  </div>
                                  <div
                                      className="rarity-border"
                                      style={{backgroundColor: color.background}}
                                  />
                                </div>
                              </div>
                            </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <SVGRight/>
            </div>
          </div>
        </div>
        <button onClick={rollRandomLeft} disabled={isRolling}>
          Вращать
        </button>
        {" "}
        {/* Disable button when rolling */}
        <audio ref={audioRef} src={rollSound}/>
        <audio ref={audioWinRef} src={winSound}/>
      </div>
        </>
  );
};

export default BoxGrid;

const SVGLeft = () => {
  return (
      <svg viewBox="0 0 44 180" className="css-qs6ru0">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 0C7.16344 0 0 7.16344 0 16V70C11.0457 70 20 78.9543 20 90C20 101.046 11.0457 110 0 110V164C0 172.837 7.16344 180 16 180H42V156H44V144H42V136H44V124H42V116H44V104H42V96H44V84H42V76H44V64H42V56H44V44H42V36H44V24H42V16H44V4H42V0H16Z"
      ></path>
    </svg>
  );
};

const SVGRight = () => {
  return (
    <svg viewBox="0 0 44 180" className="css-qs6ru0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 0C36.8366 0 44 7.16344 44 16V70C32.9543 70 24 78.9543 24 90C24 101.046 32.9543 110 44 110V164C44 172.837 36.8366 180 28 180H2V156H0V144H2V136H0V124H2V116H0V104H2V96H0V84H2V76H0V64H2V56H0V44H2V36H0V24H2V16H0V4H2V0H28Z"
      ></path>
    </svg>
  );
};

const ArrowTop = () => {
  return (
    <svg
      width="100"
      height="5"
      viewBox="0 0 100 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0.5L100 0.499999" stroke="url(#paint0_linear_307_2149)" />
      <path
        d="M54.5764 -1.26122e-07L45.3387 -1.59643e-08C44.8761 -1.04472e-08 44.6616 0.5743 45.011 0.877585L49.445 4.7266C49.6275 4.88494 49.897 4.89025 50.0855 4.73921L54.889 0.89019C55.2577 0.594769 55.0488 -1.31756e-07 54.5764 -1.26122e-07Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_307_2149"
          x1="5.96244e-09"
          y1="1"
          x2="100"
          y2="0.999999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.619792" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

import { useState, useEffect } from "react";
import "./App.scss";
import { imageData } from "./data";
import { getRandomString } from "./utils";

function App() {
  const [gridSize, setGridsize] = useState(8);
  const [cardHidden, setCardHidden] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isRestarting, setIsRestarting] = useState(true);
  const [answers, setAnswers] = useState([]); // 
  const [firstCardTitle, setFirstCardTitle] = useState("");

  const getData = () => {
    let randomList = imageData
      .sort(() => 0.5 - Math.random())
      .slice(0, gridSize);
    let arr1 = randomList; // 8 items unique
    let arr2 = randomList; // 8 items unique
    let shuffledArr = arr1.concat(arr2).sort(() => 0.5 - Math.random());

    // console.log(shuffledArr);
    shuffledArr = shuffledArr.map((item) => {
      return {
        ...item,
        id: getRandomString(8),
      };
    }); // 16 items shuffled [8 unique items]
    // console.log("randomList ", randomList);
    // console.log("shuffledArr ", shuffledArr);
    let matchArr = randomList.map((item) => {
      let findItems = shuffledArr.filter((i) => i.title === item.title); // 2 items
      // console.log("findItems ", findItems);
      return {
        id: item.title,
        data: [
          {
            id: findItems[0].id,
            isClicked: false,
          },
          {
            id: findItems[1].id,
            isClicked: false,
          },
        ],
        isMatched: false,
        isFirstOpen: false,
      };
    });
    setMatchedCards(matchArr);
    return shuffledArr;
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("data ", data);
  }, []);
  const startGame = () => {
    setIsStarted(true);
    setData(getData());
    setTimeout(() => {
      setCardHidden(true);
    }, 3000);
    setTimeout(() => {
      setIsRestarting(false);
    }, 4000);
  };
  const restartGame = () => {
    setIsRestarting(true);
    setIsStarted(false);
    setCardHidden(false);
    setMatchedCards([]);
    setData([]);
    startGame();
  };
  const ManageFirstCardclick = (title, id) => {
    let newMatchedCards = matchedCards.map((item) => {
      if (item.id === title) {
        return {
          ...item,
          data: item.data.map((i) => {
            if (i.id === id) {
              return {
                ...i,
                isClicked: true,
              };
            }
            return i;
          }),
          isFirstOpen: true,
        };
      } else {
        if (item.isMatched) {
          return item;
        } else {
          return {
            ...item,
            data: item.data.map((item) => {
              return {
                ...item,
                isClicked: false,
              };
            }),
            isFirstOpen: false,
          };
        }
      }
    });
    setMatchedCards(newMatchedCards);
  };
  const cardClickHandler = (title, id) => {
    // check cardtitle 
  
    // title = watermelon , id = 12345678
    let isFirstCard = matchedCards.find(
      (item) => item.id === title
    )?.isFirstOpen; // if previous card is already opened
    if (!isFirstCard) {
      if(firstCardTitle && firstCardTitle !== title) {
        alert("you can't click on another card");
        return;
      }
      setFirstCardTitle(title);
      // if previous card is not opened
      ManageFirstCardclick(title, id);
    } else {
      setFirstCardTitle("");
      /// if previous card is opened
      let newMatchedCards = matchedCards.map((item) => {
        if (item.id === title) {
          return {
            ...item,
            data: item.data.map((i) => {
              if (i.id === id) {
                return {
                  ...i,
                  isClicked: true,
                };
              }
              return i;
            }),
            isMatched: true,
          };
        }
        return item;
      });
      setMatchedCards(newMatchedCards);
    }
  };
  return (
    <>
      {!isStarted && (
        <button className="button" onClick={() => startGame()}>
          start the game
        </button>
      )}
      {isStarted && (
        <div className="wrapper">
          <div className="cards-wrapper">
            {data.map((item, index) => {
              console.log("item ", item);
              console.log("matchedCards ", matchedCards);
              return (
                <div
                  className={`card ${!cardHidden ? "flip" : ""} 
                  ${
                    matchedCards
                      .find((i) => i.id === item.title)
                      ?.data.find((j) => j.id === item.id)?.isClicked
                      ? "isClicked"
                      : ""
                  } ${
                    matchedCards.find((i) => i.id === item.title)?.isMatched
                      ? "isMatched"
                      : ""
                  }`}
                  key={index}
                  onClick={() => {
                    cardClickHandler(item.title, item.id);
                  }}
                >
                  <div className="back">
                    <img src={item.src} alt={item.title} />
                  </div>
                  <div className="front">&lt;/&gt;</div>
                </div>
              );
            })}
          </div>
          {!isRestarting && (
            <button className="button" onClick={() => restartGame()}>
              restart the game
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default App;

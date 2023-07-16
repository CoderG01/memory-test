import { useState, useEffect } from "react";
import "./App.scss";
import { imageData } from "./data";

function App() {
  const [gridSize, setGridsize] = useState(8);
  const [isStarted, setIsStarted] = useState(false);
  const getData = () => {
    let randomList = imageData
      .sort(() => 0.5 - Math.random())
      .slice(0, gridSize);
    let arr1 = randomList;
    let arr2 = randomList;
    let shuffledArr = arr1.concat(arr2).sort(() => 0.5 - Math.random());
    // console.log(shuffledArr);
    return shuffledArr;
  };
  const [data, setData] = useState(getData());
  useEffect(() => {
    console.log("data ", data);
  }, []);

  return (
    <>
      <button onClick={handleStart}>start the game</button>
      <div className="cards-wrapper">
        {data.map((item, index) => {
          return (
            <>
              <div className="card" key={index}>
                <div className="back">
                  <img src={item.src} alt={item.title} />
                </div>
                <div className="front">&lt;/&gt;</div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default App;

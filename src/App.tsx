import "./reset.css";
import "./App.css";
import { useEffect, useState } from "react";

const ENDPOINT = `https://api.adviceslip.com/advice`;

interface IAdvice {
  id: string;
  advice: string;
}

const getNewAdvice = async () => {
  const response = await fetch(ENDPOINT);
  if (response.ok) {
    return await response.json();
  } else {
    alert("HTTP-Error: " + response.status);
  }
};

function App() {
  const [advice, setAdvice] = useState<IAdvice>({
    id: "1",
    advice:
      "Never regret. If it's good, it's wonderful. If it's bad, it's experience.",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadNewAdvice();
  }, []);

  const loadNewAdvice = async () => {
    setIsLoading(true);
    const result = await getNewAdvice();
    setIsLoading(false);
    setAdvice(() => result.slip);
  };

  return (
    <>
      <div className="container">
        {isLoading ? (
          <span className="loading">Loading...</span>
        ) : (
          <div className="wrapper">
            <p className="heading">Advice #{advice.id}</p>
            <p className="advice">{advice.advice}</p>
          </div>
        )}
        <div className="hr">
          <img
            src="images/pattern-divider-desktop.svg"
            alt="divider"
            className="desktop-divider"
          />
          <img
            src="images/pattern-divider-mobile.svg"
            alt="divider"
            className="mobile-divider"
          />
        </div>
        <button className="button" onClick={loadNewAdvice}>
          <div className="roll">
            <img src="images/icon-dice.svg" alt="roll dice" />
          </div>
        </button>
      </div>
    </>
  );
}

export default App;

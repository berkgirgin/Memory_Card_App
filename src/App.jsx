import { useState, useEffect, useRef } from "react";
import StartPage from "./pages/StartPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import fetchPokemons from "./fetchPokemons.jsx";
import LoadingScreen from "./components/Loading.jsx";

function App() {
  const [difficultyLevel, setDifficultyLevel] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);
  const [bestScore, setBestScore] = useState(2);

  const [loading, setLoading] = useState(true); // state to track loading
  const minimumLoadingScreenTime = 1500;

  let numberOfCards, selectedCardBoard;

  useEffect(() => {
    const getPokemons = async () => {
      const data = await fetchPokemons();
      setPokemonData(data);
      // setLoading(false);
      setTimeout(() => {
        setLoading(false); // make sure loading is set to false only after data is fetched
      }, minimumLoadingScreenTime);

      console.log("data finished fetching");
      console.log(data);
    };

    getPokemons();
  }, []);

  // Start Page and Loading Screen
  if (difficultyLevel === null) {
    return (
      <>
        <StartPage setDifficultyLevel={setDifficultyLevel} />
      </>
    );
  } else if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  const easyLevelPokemons = pokemonData[0];
  const mediumLevelPokemons = pokemonData[1];
  const hardLevelPokemons = pokemonData[2];

  switch (difficultyLevel) {
    case 0: // easy
      selectedCardBoard = easyLevelPokemons;
      numberOfCards = easyLevelPokemons.length;

      break;
    case 1: // medium
      selectedCardBoard = mediumLevelPokemons;
      numberOfCards = mediumLevelPokemons.length;
      break;
    case 2: // hard
      selectedCardBoard = hardLevelPokemons;
      numberOfCards = hardLevelPokemons.length;
      break;
  }

  return (
    <>
      <header>
        <h1 className="game-title">
          <span className="red-text">Poke</span>
          <span className="white-text">Mon</span> Memory Game
        </h1>
      </header>
      <GamePage
        numberOfCards={numberOfCards}
        fetchedCardBoard={selectedCardBoard}
        setDifficultyLevel={setDifficultyLevel}
        bestScore={bestScore}
        setBestScore={setBestScore}
      />
    </>
  );
}

export default App;

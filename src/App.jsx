import { useState, useEffect, useRef } from "react";
import StartPage from "./pages/StartPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import example_cardBoard from "./example_cardBoard.jsx";
import fetchPokemons from "./fetchPokemons.jsx";
import LoadingScreen from "./components/Loading.jsx";

function App() {
  const [difficultyLevel, setDifficultyLevel] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true); // state to track loading

  let numberOfCards, selectedCardBoard;

  useEffect(() => {
    const getPokemons = async () => {
      const data = await fetchPokemons();
      setPokemonData(data);
      setLoading(false);

      // setTimeout(() => {
      //   setLoading(false); // make sure loading is set to false only after data is fetched
      // }, 1000);
      console.log("data finished fetching");
      console.log(data);
    };

    getPokemons();
  }, []);

  // Start Page and Loading Screen
  if (difficultyLevel === null) {
    return <StartPage setDifficultyLevel={setDifficultyLevel} />;
  } else if (loading) {
    return (
      <>
        <div>difficultyLevel: {difficultyLevel}</div>;
        <LoadingScreen />; // Prevents rendering before data is ready
      </>
    );
  }

  // const interimCardBoard = example_cardBoard;

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
      <h1>welcome to Memory Card Game</h1>

      <GamePage
        numberOfCards={numberOfCards}
        fetchedCardBoard={selectedCardBoard}
        setDifficultyLevel={setDifficultyLevel}
      />
    </>
  );
}

export default App;

import { useState, useEffect, useRef } from "react";
import Card from "../components/Card.jsx";
import example_cardBoard from "../example_cardBoard.jsx";
import GameOverMessage from "./GameOverMessage.jsx";

function GamePage({ numberOfCards, fetchedCardBoard, setDifficultyLevel }) {
  const [cardBoard, setCardBoard] = useState(fetchedCardBoard);

  const randomEntries = generateRandomEntriesArray(cardBoard, numberOfCards);
  const [displayedEntries, setDisplayedEntries] = useState(randomEntries);

  const [gameOverState, setGameOverState] = useState(null); // "won" or "lost" or null

  let currentScore = useRef(0);
  const [bestScore, setBestScore] = useState(2);

  const cardsToDisplay = displayedEntries.map((displayedEntry, _index) => {
    return (
      <Card
        key={displayedEntry.id}
        cardEntry={displayedEntry}
        onCardClick={() => {
          onCardClick(displayedEntry);
        }}
      />
    );
  });

  function generateRandomEntriesArray(_cardBoard, _numberOfCards) {
    const selectedEntries = [];

    // at least one element must be "isPlayed: false"
    const unplayedEntries = _cardBoard.filter((entry) => !entry.isPlayed);

    console.log("unplayedEntries.length", unplayedEntries.length);
    if (unplayedEntries.length > 0) {
      const randomUnplayedEntry =
        unplayedEntries[Math.floor(Math.random() * unplayedEntries.length)];

      selectedEntries.push(randomUnplayedEntry);
    }

    // selectedEntries.push(
    //   unplayedEntries[Math.floor(Math.random() * unplayedEntries.length)]
    // );

    // now add the rest of the random entries
    const shuffledBoard = [..._cardBoard].sort(() => Math.random() - 0.5);

    for (let entry of shuffledBoard) {
      if (selectedEntries.length >= _numberOfCards) break;

      if (selectedEntries.length === 0) {
        selectedEntries.push(entry);
      } else {
        if (
          !selectedEntries.some(
            (selectedEntry) => selectedEntry.id === entry.id
          )
        ) {
          selectedEntries.push(entry);
        }
      }
    }

    return selectedEntries;
  }

  function createUpdatedCardBoard(id) {
    if (id === "all") {
      return cardBoard.map((card) => ({ ...card, isPlayed: false }));
    } else {
      return cardBoard.map((card) =>
        card.id === id ? { ...card, isPlayed: true } : card
      );
    }
  }

  function getIsGameWon(_cardBoard) {
    return _cardBoard.every((card) => card.isPlayed);
  }

  function onCardClick(_clickedCard) {
    console.log("onCardClick is clicked");
    console.log(_clickedCard.title);

    if (_clickedCard.isPlayed === true) {
      //losing screen / make cards closed
      //GAME OVER logic (comes with restart button?)
      gameOver("lost");
      return;
    }

    const updatedCardBoard = createUpdatedCardBoard(_clickedCard.id);
    setCardBoard(updatedCardBoard); // updates after func runs
    console.log(updatedCardBoard);
    console.log(cardBoard);

    const isGameWon = getIsGameWon(updatedCardBoard);
    if (isGameWon) {
      // winning screen / make cards closed
      // GAME OVER logic (comes with restart button?)
      currentScore.current++;
      gameOver("won");
      return;
    }
    console.log("before setDisplayedEntries");

    setDisplayedEntries(
      generateRandomEntriesArray(updatedCardBoard, numberOfCards)
    );

    currentScore.current++;
  }

  function restartGame() {
    setGameOverState(null);

    // reset currentScore, update bestScore
    if (bestScore < currentScore.current) {
      setBestScore(currentScore.current);
    }
    currentScore.current = 0;

    //make all cardBoard entries isPlayed: false
    const updatedCardBoard = createUpdatedCardBoard("all");
    setCardBoard(updatedCardBoard);

    //shuffle the cards
    const randomEntriesArray = generateRandomEntriesArray(
      updatedCardBoard,
      numberOfCards
    );
    setDisplayedEntries(randomEntriesArray);
  }

  function resetGame() {
    // to go back to the difficult settings
    restartGame;
    setDifficultyLevel(null);
  }

  function gameOver(wonOrLost) {
    // gets input "won" or "lost"

    if (wonOrLost === "lost") {
      console.log("YOU LOST!");
      setGameOverState("lost");
    } else if (wonOrLost === "won") {
      console.log("YOU WON!");
      setGameOverState("won");
    } else {
      throw new Error(`this function's inputs can only be "won" or "lost"`);
    }

    // restartGame();
  }

  return (
    <div className="game-page-main-container">
      <div className="cards-container">{cardsToDisplay}</div>

      <div className="scoreboard-container">
        <div className="current-score-container">
          <div className="current-score-title">Current Score</div>
          <div className="current-score-value">{currentScore.current}</div>
        </div>
        <div className="best-score-container">
          <div className="best-score-title">Best Score</div>
          <div className="best-score-value">{bestScore}</div>
        </div>
      </div>

      <div className="game-over-message-main-container">
        {gameOverState && (
          <GameOverMessage
            finalScore={currentScore.current}
            result={gameOverState}
            onPlayAgain={restartGame}
            onQuit={resetGame}
          />
        )}
      </div>
    </div>
  );
}

export default GamePage;

/*
Your application should include a scoreboard, which counts the current score, and a “Best Score”, which shows the highest score you’ve achieved thus far. 

There should be a function that displays the cards in a random order anytime a user clicks one. Be sure to invoke that function when the component mounts.


Nice features
*********
game Theme? LOTR?
*********


General Logic
*********

let numberOfCards; => select this at the beginning of the game
easy=> 5 total, 3 displayed
medium=> 7 total, 4 displayed
hard=> 9 total, 5 displayed

fetching the card data(this may need to be tweaked according to the API config)
setCardBoard()

useState => currentScore, setCurrentScore(0)
useState => bestScore, setBestScore(3) // {3, Berk} ???



let howManythCard; => how many turns have passed in this particular round?
!When game over! > compare currentScore with bestScore, then reset with setCurrentScore(0)


keeping track of current board, what have been displayed etc
hard=> 9 total, 5 displayed
make sure there is at least one non-played card


useState => cardBoard, setCardBoard
let cardBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
{
card_ID: 3
isPlayed: false
imgURL:
title: 
}



func getRandomCards(cardBoard, numberOfCards) {
    get cardBoard, return a new array with a random ${numberOfCards} elements from the cardBoard
    at least one element must be "isPlayed: false"
}

func onCardClick () {
}

game template

click on card 3 >>> func playTurn()

>if (card3.isPlayed: true) {
 losing screen / make cards closed
 GAME OVER logic (comes with restart button?)
} else {
 change it to card3.isPlayed: true
 if(isGameWon) {
  winning screen / make cards closed
  GAME OVER logic (comes with restart button?)
 }
 shuffle the cards
 setCurrentScore(score => score +1)
}


func getIsGameWon() {
only check after card click > if it is not lost, 

if(game not lost) {

    isGameWon = true
    check all cards
    if (any card isPlayed: false) {
            isGameWon = false
    }

    return isGameWon
}

}

func getIsGameLost()


GAME OVER logic {
setCurrentScore(0)
compare and update bestScore

reset the board
    setCardBoard([]), then fetch it
    for now set it back setCardBoard(exampleBoard)

}


*********


Game
*********
Reset the game button(going back to difficult screen)
restart button?
select the number of Cards => you display the same cards during one game!

fetch the card data > images and titles


function displayCardsRandomly()
*********


Card component
*********
image
image description
*********

*/

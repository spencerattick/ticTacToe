const fs = require('fs');
const readline = require('readline');

//TO DO
//[ ] check to make sure player can't make a move on top of an existing X or O
//[ ] update code to reflect class syntax
//[ ] add color into game text
//[ ] add scoreboard
//[ ] DRY in playerMakeMoveSelection()
//[ ] push to Github
//[ ] add  spaces or clear console to make the printouts more readable
//[ ] check for a tie
//[ ] add test suite

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let playerName 
let playerGamePiece
let computerGamePiece
let board  = 
`
    |    |    
--------------
    |    |    
--------------
    |    |   
`
let playerScore = 0
let computerScore = 0
//board piece positions
const topLeft = 3
const topMiddle = 8
const topRight = 12

const middleLeft = 33
const middleMiddle = 38
const middleRight = 42

const bottomLeft = 63
const bottomMiddle = 68
const bottomRight = 72


console.log('Welcome to TicTacToe!')

const wantToPlayAgain = () => {
    rl.question('Would you like to play again? ', (answer) => {
        if (answer.toUpperCase() === 'YES') {
            board  = 
`
    |    |    
--------------
    |    |    
--------------
    |    |   
`
                console.log(board)
                playerMakeMoveSelection()
        } else if (answer.toUpperCase() === 'NO') {
            console.log('Ok, see you next time!')
            rl.close()
        }
    })
}

const checkIfGameWon = () => {
    const winningCombonations = {
        topRow: [topLeft, topMiddle, topRight],
        middleRow: [middleLeft, middleMiddle, middleRight],
        bottomRow: [bottomLeft, bottomMiddle, bottomRight],
        firstColumn: [topLeft, middleLeft, bottomLeft],
        secondColumn: [topMiddle, middleMiddle, bottomMiddle],
        thirdColumn: [topRight, middleRight, bottomRight],
        leftDiagonal: [topLeft, middleMiddle, bottomRight],
        rightDiagonal: [topRight, middleMiddle, bottomLeft]
    }

    for (let combo in winningCombonations) {
       if (board[winningCombonations[combo][0]] === 'X' && board[winningCombonations[combo][1]] === 'X' && board[winningCombonations[combo][2]] === 'X') {
            if (playerGamePiece === 'X') {
                console.log(`GAME OVER! ${playerName} WINS!`)
                playerScore++
                console.log(`The score is ${playerName.toUpperCase()}: ${playerScore} and COMPUTER: ${computerScore}`)
                wantToPlayAgain()
                return true
            } else {
                console.log('GAME OVER! COMPUTER WINS! BETTER LUCK NEXT TIME!')
                computerScore++
                console.log(`The score is ${playerName.toUpperCase()}: ${playerScore} and COMPUTER: ${computerScore}`)
                wantToPlayAgain()
                return true
            }
       } else if (board[winningCombonations[combo][0]] === 'O' && board[winningCombonations[combo][1]] === 'O' && board[winningCombonations[combo][2]] === 'O') {
            if (playerGamePiece === 'O') {
                console.log(`GAME OVER! ${playerName} WINS!`)
                playerScore++
                console.log(`The score is ${playerName.toUpperCase()}: ${playerScore} and COMPUTER: ${computerScore}`)
                wantToPlayAgain()
                return true
            } else {
                console.log('GAME OVER! COMPUTER WINS! BETTER LUCK NEXT TIME!')
                computerScore++
                console.log(`The score is ${playerName.toUpperCase()}: ${playerScore} and COMPUTER: ${computerScore}`)
                wantToPlayAgain()
                return true
            }
       }
    }
    return false
}

const computerMakeMoveSelection = () => {
    const possibleMoves = [topLeft, topMiddle, topRight, middleLeft, middleMiddle, middleRight, bottomLeft, bottomMiddle, bottomRight]

    const randomIndex =  Math.floor(Math.random() * possibleMoves.length)
    const move = possibleMoves[randomIndex]

    if (board[move] !== 'X' && board[move] !== 'O') {
        board = board.substring(0, move) + computerGamePiece + board.substring(move + 1)
    } else {
      computerMakeMoveSelection()
    }
}

const playerMove = (move) => {
    board = board.substring(0, move) + playerGamePiece + board.substring(move + 1)
    console.log(`${playerName}'s turn:`)
    console.log(board)
    if (checkIfGameWon()) {
        return
    }
    computerMakeMoveSelection()
    setTimeout(() => {
        console.log(`Computer's turn:`)
        console.log(board)
        playerMakeMoveSelection()
    }, 800)
    if (checkIfGameWon()) {
        return
    }
 
}

const playerMakeMoveSelection = () => {
    rl.question('Your turn! Choose from the following options: TOP LEFT, TOP MIDDLE, TOP RIGHT, MIDDLE LEFT, CENTER, MIDDLE RIGHT, BOTTOM RIGHT, BOTTOM MIDDLE, BOTTOM RIGHT. ', (answer) => {
        switch (answer.toUpperCase()) {
            case 'TOP LEFT':
              playerMove(topLeft)
              break
            case 'TOP MIDDLE':
              playerMove(topMiddle)
              break
            case 'TOP RIGHT':
              playerMove(topRight)
              break
            case 'MIDDLE LEFT':
              playerMove(middleLeft)
              break
            case 'CENTER':
              playerMove(middleMiddle)
              break
            case 'MIDDLE RIGHT':
              playerMove(middleRight)
              break
            case 'BOTTOM LEFT':
              playerMove(bottomLeft)
              break
            case 'BOTTOM MIDDLE':
              playerMove(bottomMiddle)
              break
            case 'BOTTOM RIGHT':
              playerMove(bottomRight)
              break
            default:
              console.log('Please submit a valid move.')
              playerMakeMoveSelection()
        }
              
    })
}

const beginRound = () => {
    const game = new GameBoard()
    console.log(board)  
    playerMakeMoveSelection()
} 


const readyToPlay = () => {
    rl.question('Are you ready to play? Type YES or NO. ', (answer) => {
        if (answer.toUpperCase() === 'YES') {
            beginRound()
        } else {
            console.log('Please type YES when you\'re ready to play!')
            readyToPlay()
        }
    })
}

const chooseGamePiece = () => {
    rl.question('Would you like to be X or O? ', (answer) => {
        if (answer.toUpperCase() === 'X') {
            playerGamePiece = 'X'
            computerGamePiece = 'O'
            console.log(`Great! You've chosen ${playerGamePiece}. I'll play as ${computerGamePiece}.`)
            readyToPlay()

        } else if (answer.toUpperCase() === 'O') {
            playerGamePiece = 'O'
            computerGamePiece = 'X'
            console.log(`Great! You've chosen ${playerGamePiece}. I'll play as ${computerGamePiece}.`)
            readyToPlay()

        } else {
            console.log('Please input either X or O.')
            chooseGamePiece()
        }
    })
}

const startGame = () => {
    rl.question('What is your name? ', (answer) => {
        playerName = answer
        console.log(`Hello, ${answer}!`);
        chooseGamePiece()
    })
}

startGame()

class GameBoard {
    constructor(playerName, playerGamePiece, computerGamePiece) {
        this.playerName = playerName
        this.playerGamePiece = playerGamePiece
        this.computerGamePiece = computerGamePiece 

    }

    addX() {

    }

    addO() {

    }

    determineIfGameOver() {

    }

    computerPlay() {

    }

    askForPlayerTurn() {

    }
}

// class ScoreCard {
//     constructor() {
//         this.playerScore 
//     }


// }








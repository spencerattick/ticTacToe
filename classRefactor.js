const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

class Player {
    constructor(name) {
        this.name = name
        this.gamePiece = null
    }

    chooseGamePiece() {
        return new Promise((resolve) => {
            rl.question('Would you like to be X or O? ', (answer) => {
                if (answer.toUpperCase() === 'X') {
                    this.gamePiece = 'X'
                    console.log(`Great! You've chosen ${this.gamePiece}.`)
                    resolve(this.gamePiece)
        
                } else if (answer.toUpperCase() === 'O') {
                    this.gamePiece = 'O'
                    console.log(`Great! You've chosen ${this.gamePiece}.`)
                    resolve(this.gamePiece)
                    // readyToPlay()
        
                } else {
                    console.log('Please input either X or O.')
                    this.chooseGamePiece()
                }
            })
        })

    }

}

class ComputerPlayer {
    constructor(gamePiece, board) {
        this.gamePiece = gamePiece
        this.board = board
    }

    computerMakeMove(board) {
        return new Promise((resolve) => {
            const possibleMoves = [board.topLeft, board.topMiddle, board.topRight, board.middleLeft, board.middleMiddle, board.middleRight, board.board.bottomLeft, board.bottomMiddle, board.bottomRight]

            const randomIndex =  Math.floor(Math.random() * possibleMoves.length)
            const move = possibleMoves[randomIndex]
        
            if (board.board[move] !== 'X' && board.board[move] !== 'O') {
                board.board = board.board.substring(0, move) + this.gamePiece + board.board.substring(move + 1)
                console.log(board.board)
                resolve()
            } else {
              this.computerMakeMove(board)
            }
        })
    }

}

class Board {
    constructor() {
        this.board  = 
        `
            |    |    
        --------------
            |    |    
        --------------
            |    |   
        `
        this.topLeft = 10
        this.topMiddle = 15
        this.topRight = 20

        this.middleLeft = 57
        this.middleMiddle = 62
        this.middleRight = 66

        this.bottomLeft = 103
        this.bottomMiddle = 108
        this.bottomRight = 112
    }

    test() {
        console.log('something')
    }


    moveLogic(move, playerGamePiece, playerName) {
        if (this.board[move] === 'X' || this.board[move] === ['O']) {
            console.log('THAT SPACE IS TAKEN! Please make a different selection.')
            this.makeMove(playerGamePiece)
            return
        }
        this.board = this.board.substring(0, move) + playerGamePiece + this.board.substring(move + 1)
        console.log(`${playerName}'s turn:`)
        console.log(this.board)
        // if (checkIfGameWon()) {
        //     return
        // }
        // computerMakeMoveSelection()
        // setTimeout(() => {
        //     console.log(`Computer's turn:`)
        //     console.log(this.board)
        //     playerMakeMoveSelection()
        // }, 800)
        // if (checkIfGameWon()) {
        //     return
        // }
    }

    makeMove(playerGamePiece, playerName) {
        return new Promise((resolve) => {
            rl.question('Your turn! Choose from the following options: TOP LEFT, TOP MIDDLE, TOP RIGHT, MIDDLE LEFT, CENTER, MIDDLE RIGHT, BOTTOM RIGHT, BOTTOM MIDDLE, BOTTOM RIGHT. ', (answer) => {
                switch (answer.toUpperCase()) {
                    case 'TOP LEFT':
                      resolve(this.moveLogic(this.topLeft, playerGamePiece, playerName))
                      break
                    case 'TOP MIDDLE':
                      resolve(this.moveLogic(this.topMiddle, playerGamePiece, playerName))
                      break
                    case 'TOP RIGHT':
                      resolve(this.moveLogic(this.topRight, playerGamePiece, playerName))
                      break
                    case 'MIDDLE LEFT':
                      resolve(this.moveLogic(this.middleLeft, playerGamePiece, playerName))
                      break
                    case 'CENTER':
                      resolve(this.moveLogic(this.middleMiddle, playerGamePiece, playerName))
                      break
                    case 'MIDDLE RIGHT':
                      resolve(this.moveLogic(this.middleRight, playerGamePiece, playerName))
                      break
                    case 'BOTTOM LEFT':
                      resolve(this.moveLogic(this.bottomLeft, playerGamePiece, playerName))
                      break
                    case 'BOTTOM MIDDLE':
                      resolve(this.moveLogic(this.bottomMiddle, playerGamePiece, playerName))
                      break
                    case 'BOTTOM RIGHT':
                      resolve(this.moveLogic(this.bottomRight, playerGamePiece, playerName))
                      break
                    default:
                      console.log('Please submit a valid move.')
                      this.makeMove(playerGamePiece, playerName)
                }
                      
            })
        })

    }


    print() {
        // Print the current state of the this.board
    }

    isFull() {
        // Check if the board is full (tie game)
    }

    checkWin(player) {
        // Check if the player has won the game
    }

}

class Game {
    constructor(playerName) {
        this.playerName = playerName
        this.player = new Player(playerName)
        this.board = new Board()
        this.playerGamePiece = null
        this.computerGamePiece = null
    }

    async play() {
        this.playerGamePiece = await this.player.chooseGamePiece()
        if (this.playerGamePiece === 'X') {
            this.computerGamePiece = 'O'
        } else {
            this.computerGamePiece = 'X'
        }
        this.computer = new ComputerPlayer(this.computerGamePiece, this.board)
        console.log(this.board.board)
        await this.board.makeMove(this.playerGamePiece, this.playerName)
        await this.computer.computerMakeMove(this.board)
        //need to check for end of game either by winning or tie
        //while game isn't over - keep having players make moves
    }

    end() {
        // Handle game over and ask if the player wants to play again
    }
}

const startGame = () => {
    rl.question('What is your name? ', (answer) => {
        const playerName = answer;
        console.log(`Hello, ${answer}!`);

        const game = new Game(playerName);
        game.play();
    });
};

startGame();


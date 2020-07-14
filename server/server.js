const express = require('express')
const fs = require('fs')
const app = express()

/**
 * Loads the game .json standard
 */
function loadGameStyle() {
  let gameExample = fs.readFileSync('game_example.json','utf8')
  return JSON.parse(gameExample)
}

/**
 * Generate a room code based of a random integer 
 */
function generateRoomCode() {
  return Math.floor(Math.random()*100)
}

/**
 * Creates a new game object and writes it on the database
 * @param {string} pl1 - The player1's name
 * @param {string} pl2 - The player2's name
 */
function newGame(pl1, pl2) {
  let gamesSoFar = JSON.parse(fs.readFileSync('games.json', 'utf8'))
  let newGame = loadGameStyle()
  newGame.roomcode = generateRoomCode()
  newGame.player1.playerName = pl1
  newGame.player1.isTurn = true
  newGame.player2.playerName = pl2
  gamesSoFar.push(newGame)
  fs.writeFileSync('games.json', JSON.stringify(gamesSoFar))
}

/**
 * Deletes a game
 * @param {number} code - The game's code
 */
function deleteGame(code) {
  let gamesSoFar = JSON.parse(fs.readFileSync('games.json', 'utf8'))
  let newGameArray = []
  gamesSoFar.forEach(game => {
    if(game.roomcode != code) {
      newGameArray.push(game)
    }
  })
  fs.writeFileSync('games.json', JSON.stringify(newGameArray))
}

/**
 * Makes a round go around in the game
 * @param {number} x - Selected Column
 * @param {number} y - selected Row
 * @param {string} player - Is it an X or an O?
 * @param {number} code - Room's code
 */
function play(x, y, player, code) {
  let gamesSoFar = JSON.parse(fs.readFileSync('games.json', 'utf8'))
  gamesSoFar.forEach(game => {
    if(game.roomcode == code) {
      game.board[x][y] = player
      if(game.player1.isTurn) {
        game.player1.isTurn = false
        game.player2.isTurn = true
      } else {
        game.player1.isTurn = true
        game.player2.isTurn = false
      }
      game = hasEnded(game)
    }
  })
  fs.writeFileSync('games.json', JSON.stringify(gamesSoFar))
}

/**
 * Checks if a game has ended
 * @param {object} game - Game that we're trying to judge if there's a winner
 */
function hasEnded(game) {
  //Function not perfectly implemented, since it's basically legacy code
  let hasWinner = false;
  let winner = null;
  for(let i = 0; i < 3; i++){
    if((game.board[i][0] == game.board[i][1])&&(game.board[i][0] == game.board[i][2])
      &&(game.board[i][0] != null)) {
      hasWinner = true
      winner = game.board[i][0]
    } else if((game.board[0][i] == game.board[1][i])&&
      (game.board[0][i] == game.board[2][i])&&(game.board[0][i] != null)) {
      hasWinner = true
      winner = game.board[0][i]
    }
  }
  if(!(winner)) {
    if((game.board[0][0] == game.board[1][1])&&
      (game.board[0][0] == game.board[2][2])&&(game.board[0][0] != null)) {
      hasWinner = true
      winner = game.board[0][0]
    } else if((game.board[0][2] == game.board[1][1])&&
      (game.board[2][0] == game.board[0][2])&&(game.board[0][2] != null)) {
      hasWinner = true
      winner = game.board[0][2]
    }
  }
  game.ended = hasWinner
  game.winner = winner
  return game
}

app.get('/', function (req, res) {
  return res.send('Hello world')
})

app.listen(2000)
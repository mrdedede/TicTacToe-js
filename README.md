# Tic Tac Toe (JavaScript)

A two-player Tic Tac Toe game that runs in the browser. It is drawn on an HTML canvas, uses plain JavaScript with no dependencies, and is played on a single screen by two people taking turns with the mouse.

## Features

- 3x3 board drawn on a `<canvas>`
- Two players: **O** goes first, then **X** alternates
- Win detection for every row, column, and both diagonals
- Tie detection when the board is full
- A **Restart** button that appears when the game ends

## Project structure

```
TicTacToe-js/
├── index.html      # Page layout: canvas, title, restart button
├── tictactoe.js    # Board logic, mouse handling, and drawing
└── stl.css         # Styles (colors, menu bar, buttons)
```

## Getting started

No build step or installation is needed.

1. Clone the repository:

   ```bash
   git clone https://github.com/mrdedede/TicTacToe-js.git
   cd TicTacToe-js
   ```

2. Open `index.html` in any modern browser. You can double-click the file, or serve the folder with any static server, for example:

   ```bash
   npx serve .
   ```

## How to play

1. Player **O** clicks a square on the board first and an O is drawn there.
2. Player **X** clicks the next square, and so on.
3. The first player to get three in a row, column, or diagonal wins. An alert announces the result.
4. If all nine squares fill up with no winner, the game is a tie.
5. Click **Restart** to clear the board and play again.

## How it works

- **`Board` class** (`tictactoe.js`) stores a 3x3 array of `null`, `"X"`, or `"O"`. Its `play(x, y, mark)` method places a mark on an empty square, `check()` looks for a winner, and `post_check()` reports whether the game has a winner, is a tie, or should continue.
- **Click handling** converts the mouse position into a board cell. The canvas is 300x300 pixels and each cell is 100x100.
- **Drawing** uses `strokeRect` for X and `arc` for O. The board grid is drawn once when the page loads.

## Known limitations

- Clicks are not blocked after a game has ended, so players can keep marking the board after a win.
- Restart does not reset whose turn it is, and the Restart button stays visible after it is shown once.
- The click handler reads an element with `id="menu"`, which is not present in `index.html`. This needs to be fixed before clicks work reliably.
- Game logic and rendering live in one file, so they are hard to test in isolation.

## Possible next steps

- Block moves after the game ends and reset the turn order on restart.
- Remove the `menu` dependency, or add the matching element to `index.html`.
- Show the current player's turn on the page.
- Add a computer opponent or online two-player play.

## License

No license has been specified yet.

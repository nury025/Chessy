# Advanced Chess Game with Statistics Tracking

A fully functional chess game built with HTML, CSS, and JavaScript featuring move statistics tracking, check/checkmate detection, and pawn promotion.

## Features

### Core Chess Functionality
- **Complete Chess Rules**: All piece movements follow official chess rules
  - Pawns: Forward movement, double move from start, diagonal captures
  - Knights: L-shaped movements
  - Bishops: Diagonal movements
  - Rooks: Straight line movements
  - Queens: Combined rook and bishop movements
  - Kings: One square in any direction

- **Check Detection**: System alerts when a player's king is under attack
- **Checkmate Detection**: Game ends when a player is in checkmate
- **Pawn Promotion**: Automatic promotion dialog when pawns reach the end of the board
- **Legal Move Validation**: Prevents moves that would leave your king in check

### Statistics & Analytics
- **Move Tracking**: Records every move made by each color
- **Historical Data**: Persists statistics across game sessions using localStorage
- **Visual Analytics**: When you select a piece:
  - Shows all historical destination squares with color coding
  - Green (50%+): Most common destinations
  - Yellow (25-49%): Moderately common destinations
  - Blue (<25%): Less common destinations
- **Percentage Display**: Shows move frequency and total count for each destination
- **Statistics Panel**: Detailed breakdown of piece movement habits, sorted by frequency

## File Structure

```
chess-game/
│
├── index.html      # Main HTML file with page structure
├── style.css       # Complete styling and responsive design
├── script.js       # Game logic and chess engine
└── README.md       # This file
```

### index.html
Contains the HTML structure including:
- Game title and info display
- Chess board container
- Control buttons
- Statistics panel
- Pawn promotion modal

### style.css
Includes:
- Board and square styling
- Responsive design for mobile devices
- Animation and hover effects
- Statistics visualization styling
- Modal dialogs
- Gradient backgrounds

### script.js
Contains all game logic:
- Board initialization
- Move validation
- Check/checkmate detection
- Statistics tracking and persistence
- UI updates and event handling

## How to Use

### Running the Game

1. **Save all three files** (index.html, style.css, script.js) in the same directory
2. **Open index.html** in a web browser
3. The game will start automatically

### Playing the Game

1. **Select a Piece**: Click on any of your pieces (white moves first)
2. **See Valid Moves**: The board highlights:
   - Green outline: Valid empty squares
   - Red outline: Opponent pieces you can capture
3. **Move Your Piece**: Click on a highlighted square to move
4. **View Statistics**: Selected pieces show historical move patterns with percentages
5. **Game Ends**: When checkmate occurs, the winner is announced

### Controls

- **New Game**: Starts a fresh game, statistics are preserved
- **Clear Statistics**: Erases all move history (cannot be undone)

## Statistics System

### How It Works

The game tracks:
- **From Position**: Where the piece started
- **To Position**: Where the piece moved
- **Count**: How many times this move was made
- **Percentage**: What percentage of moves from that position went to that square

### Data Persistence

- Statistics are saved to browser localStorage
- Data survives page refreshes and game resets
- Clear Statistics button removes all recorded data
- Separate tracking for white and black pieces

### Example

If a white knight on b1 moved to:
- c3: 10 times (50%)
- a3: 8 times (40%)
- d2: 2 times (10%)

These percentages will be displayed when you select that knight again.

## Technical Details

### Board Representation
- 8x8 grid stored as 2D array
- Each square contains: `{p: piece, c: color}`
- Piece values: K, Q, R, B, N, P (null if empty)
- Color values: 'white', 'black'

### Move Validation
- Generates all possible moves for a piece type
- Filters out moves that would leave king in check
- Validates against board boundaries and piece positions

### Storage
- `localStorage.setItem('chessStats', JSON.stringify(moveStats))`
- Statistics object structure:
```javascript
{
  white: {
    "row,col": {
      "dest_row,dest_col": count,
      ...
    },
    ...
  },
  black: { ... }
}
```

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Fully responsive

## Responsive Design

The game adapts to different screen sizes:
- Desktop: Full 70px squares
- Tablet: 60px squares
- Mobile: 50px squares with adjusted button layout

## Future Enhancement Ideas

- Castling rules
- En passant captures
- Move undo functionality
- Game history/replay
- AI opponent
- Online multiplayer
- Piece drag-and-drop
- Custom board themes
- Time controls
- Rating calculation

## License

Free to use and modify for personal and educational purposes.

## Notes

- The game follows standard chess rules
- Check and checkmate are properly detected
- All piece movements are validated
- No third-party libraries required (vanilla JavaScript)
- Statistics tracking is automatic
- Data is stored locally in the browser

---

Enjoy the game! For questions or issues, review the code comments in script.js.

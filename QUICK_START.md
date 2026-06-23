# Quick Start Guide - Advanced Chess Game

## 📦 What You Have

You have received 4 files for a complete chess game:

1. **index.html** - The main game file (start here)
2. **style.css** - All styling and visual effects
3. **script.js** - Game logic and chess engine
4. **README.md** - Detailed documentation

## 🚀 Getting Started in 30 Seconds

### Step 1: Create a Folder
Create a new folder on your computer called `chess-game` (or any name you prefer)

### Step 2: Save the Files
Save all 4 files into this folder:
```
chess-game/
  ├── index.html
  ├── style.css
  ├── script.js
  └── README.md
```

### Step 3: Open the Game
Double-click `index.html` to open it in your web browser

### Done! 🎉
The game will load and you can start playing immediately.

## ⚙️ Requirements

- **Web Browser**: Any modern browser (Chrome, Firefox, Safari, Edge)
- **Internet**: Not required (game runs completely offline)
- **No Installation**: No setup, no dependencies, no downloads needed

## 🎮 How to Play

1. **White moves first** - Click on any white piece
2. **See valid moves** - Green squares are empty moves, red squares are captures
3. **Click to move** - Select a highlighted square to move your piece
4. **Switch turns** - After you move, black automatically gets their turn
5. **Win by checkmate** - Trap the opponent's king with no escape moves

## 📊 Statistics Feature

Select any piece to see:
- **Green squares (50%+)**: Most common destinations for that piece
- **Yellow squares (25-49%)**: Sometimes used destinations
- **Blue squares (<25%)**: Rarely used destinations
- **Percentages**: Show how often you move each piece to each square

## 🔘 Button Functions

- **New Game** - Start fresh game (keeps statistics)
- **Clear Statistics** - Erase all move history

## 💾 Data Saving

- Statistics automatically save to your browser
- Data persists even after closing the browser
- Each browser/device has separate statistics
- Use "Clear Statistics" to delete data

## 🐛 Troubleshooting

### Game doesn't load?
- Make sure all 3 files (HTML, CSS, JS) are in the same folder
- Try a different browser
- Clear your browser cache

### Stats not showing?
- Click on a piece you've moved before in previous games
- Stats build up over multiple games
- Check that "Clear Statistics" wasn't accidentally clicked

### Move won't work?
- Piece might be pinned (can't move without exposing king)
- Destination might be blocked by another piece
- Try a different move - check valid highlighted squares

## 📱 Mobile Play

Works great on phones and tablets:
- Tap pieces to select
- Tap highlighted squares to move
- All features work the same way

## 🎯 Key Features

✅ Full chess rules (except castling & en passant)
✅ Check & checkmate detection
✅ Pawn promotion with choice dialog
✅ Move statistics tracking
✅ Historical data persistence
✅ Visual move frequency display
✅ No internet required
✅ No ads or tracking
✅ 100% free to use
✅ Responsive design

## 📚 Files Explained

### index.html
```html
- Board container
- Info display
- Statistics panel
- Control buttons
- Promotion modal
```

### style.css
```css
- Beautiful gradient backgrounds
- Responsive grid layout
- Hover effects
- Animation and transitions
- Mobile-friendly design
```

### script.js
```javascript
- Chess piece movement logic
- Check/checkmate detection
- Statistics tracking
- LocalStorage management
- Board rendering
- Event handling
```

## 🎓 Learning the Code

If you want to understand how it works:

1. **Game Logic** - Read the comments in script.js
2. **Piece Movements** - Look for `getValidMoves()` function
3. **Statistics** - Check `recordMove()` and `getStatisticsForSquare()` functions
4. **UI Updates** - See `updateBoard()` function

Each function has detailed comments explaining what it does.

## 🔧 Customization Ideas

You can easily modify:

### Colors
In **style.css**, change:
```css
.light { background: #f0d9b5; }  /* Light squares */
.dark { background: #b58863; }   /* Dark squares */
```

### Board Size
In **style.css**, adjust:
```css
.square { width: 70px; height: 70px; }
```

### Piece Display
In **script.js**, piece display uses letters. You could:
- Add Unicode chess symbols
- Use images
- Add custom styling

## 📞 Support

Everything you need to know is in:
- **README.md** - Complete documentation
- **Code comments** - Detailed explanations in script.js
- **This file** - Quick reference

## 🎉 Enjoy!

You now have a fully functional chess game with advanced features. Play, explore, and have fun!

---

**Pro Tips:**
- Play multiple games to build up interesting statistics
- Try different opening moves to see frequency patterns
- Use the statistics to identify your favorite strategies
- Share with friends - no setup required for them either!

Happy playing! ♟️

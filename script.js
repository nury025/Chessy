// Chess Game Constants
const PIECES = { K: 'K', Q: 'Q', R: 'R', B: 'B', N: 'N', P: 'P' };
const WHITE = 'white';
const BLACK = 'black';

// Game State Variables
let board = [];
let selectedSquare = null;
let validMoves = [];
let currentPlayer = WHITE;
let lastMove = null;
let promotionPending = null;
let gameOver = false;
let moveStats = { white: {}, black: {} };

/**
 * Initialize the chess board with starting position
 */
function initBoard() {
    board = [
        [
            { p: 'R', c: BLACK }, { p: 'N', c: BLACK }, { p: 'B', c: BLACK },
            { p: 'Q', c: BLACK }, { p: 'K', c: BLACK }, { p: 'B', c: BLACK },
            { p: 'N', c: BLACK }, { p: 'R', c: BLACK }
        ],
        [
            { p: 'P', c: BLACK }, { p: 'P', c: BLACK }, { p: 'P', c: BLACK },
            { p: 'P', c: BLACK }, { p: 'P', c: BLACK }, { p: 'P', c: BLACK },
            { p: 'P', c: BLACK }, { p: 'P', c: BLACK }
        ],
        [
            { p: null, c: null }, { p: null, c: null }, { p: null, c: null },
            { p: null, c: null }, { p: null, c: null }, { p: null, c: null },
            { p: null, c: null }, { p: null, c: null }
        ],
        [
            { p: null, c: null }, { p: null, c: null }, { p: null, c: null },
            { p: null, c: null }, { p: null, c: null }, { p: null, c: null },
            { p: null, c: null }, { p: null, c: null }
        ],
        [
            { p: null, c: null }, { p: null, c: null }, { p: null, c: null },
            { p: null, c: null }, { p: null, c: null }, { p: null, c: null },
            { p: null, c: null }, { p: null, c: null }
        ],
        [
            { p: null, c: null }, { p: null, c: null }, { p: null, c: null },
            { p: null, c: null }, { p: null, c: null }, { p: null, c: null },
            { p: null, c: null }, { p: null, c: null }
        ],
        [
            { p: 'P', c: WHITE }, { p: 'P', c: WHITE }, { p: 'P', c: WHITE },
            { p: 'P', c: WHITE }, { p: 'P', c: WHITE }, { p: 'P', c: WHITE },
            { p: 'P', c: WHITE }, { p: 'P', c: WHITE }
        ],
        [
            { p: 'R', c: WHITE }, { p: 'N', c: WHITE }, { p: 'B', c: WHITE },
            { p: 'Q', c: WHITE }, { p: 'K', c: WHITE }, { p: 'B', c: WHITE },
            { p: 'N', c: WHITE }, { p: 'R', c: WHITE }
        ]
    ];

    selectedSquare = null;
    validMoves = [];
    currentPlayer = WHITE;
    gameOver = false;
    loadStats();
}

/**
 * Save statistics to localStorage
 */
function saveStats() {
    localStorage.setItem('chessStats', JSON.stringify(moveStats));
}

/**
 * Load statistics from localStorage
 */
function loadStats() {
    const saved = localStorage.getItem('chessStats');
    if (saved) {
        moveStats = JSON.parse(saved);
    }
}

/**
 * Record a move in the statistics
 */
function recordMove(fromRow, fromCol, toRow, toCol) {
    const colorKey = currentPlayer === WHITE ? 'white' : 'black';
    const fromKey = `${fromRow},${fromCol}`;
    const toKey = `${toRow},${toCol}`;

    if (!moveStats[colorKey][fromKey]) {
        moveStats[colorKey][fromKey] = {};
    }

    if (!moveStats[colorKey][fromKey][toKey]) {
        moveStats[colorKey][fromKey][toKey] = 0;
    }

    moveStats[colorKey][fromKey][toKey]++;
    saveStats();
}

/**
 * Get statistics for a given square
 */
function getStatisticsForSquare(row, col) {
    const colorKey = currentPlayer === WHITE ? 'white' : 'black';
    const fromKey = `${row},${col}`;

    if (!moveStats[colorKey][fromKey]) {
        return null;
    }

    const moves = moveStats[colorKey][fromKey];
    const totalMoves = Object.values(moves).reduce((a, b) => a + b, 0);

    if (totalMoves === 0) return null;

    const result = {};
    for (const [toKey, count] of Object.entries(moves)) {
        const percentage = Math.round((count / totalMoves) * 100);
        result[toKey] = { count, percentage };
    }

    return { moves: result, totalMoves };
}

/**
 * Find the king's position on the board
 */
function findKing(color) {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (board[row][col].p === 'K' && board[row][col].c === color) {
                return [row, col];
            }
        }
    }
    return null;
}

/**
 * Check if a square is attacked by a specific color
 */
function isSquareAttacked(row, col, byColor) {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (!piece.p || piece.c !== byColor) continue;

            // Pawn attacks
            if (piece.p === 'P') {
                const dir = byColor === WHITE ? -1 : 1;
                if (r + dir === row && (c - 1 === col || c + 1 === col)) return true;
            }
            // Knight attacks
            else if (piece.p === 'N') {
                const moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
                if (moves.some(([dr, dc]) => r + dr === row && c + dc === col)) return true;
            }
            // King attacks
            else if (piece.p === 'K') {
                if (Math.abs(r - row) <= 1 && Math.abs(c - col) <= 1) return true;
            }
            // Rook and Queen attacks (straight lines)
            else if (piece.p === 'R' || piece.p === 'Q') {
                const directions = piece.p === 'R'
                    ? [[0, 1], [0, -1], [1, 0], [-1, 0]]
                    : [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

                for (let [dr, dc] of directions) {
                    for (let i = 1; i < 8; i++) {
                        const nr = r + dr * i, nc = c + dc * i;
                        if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
                        if (board[nr][nc].p) {
                            if (nr === row && nc === col) return true;
                            break;
                        }
                    }
                }
            }
            // Bishop and Queen attacks (diagonal)
            else if (piece.p === 'B' || piece.p === 'Q') {
                const directions = piece.p === 'B'
                    ? [[1, 1], [1, -1], [-1, 1], [-1, -1]]
                    : [[1, 1], [1, -1], [-1, 1], [-1, -1]];

                for (let [dr, dc] of directions) {
                    for (let i = 1; i < 8; i++) {
                        const nr = r + dr * i, nc = c + dc * i;
                        if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
                        if (board[nr][nc].p) {
                            if (nr === row && nc === col) return true;
                            break;
                        }
                    }
                }
            }
        }
    }
    return false;
}

/**
 * Check if the king is in check
 */
function isInCheck(color) {
    const kingPos = findKing(color);
    if (!kingPos) return false;
    const opponent = color === WHITE ? BLACK : WHITE;
    return isSquareAttacked(kingPos[0], kingPos[1], opponent);
}

/**
 * Check if a move would leave the king in check
 */
function wouldLeaveInCheck(fromRow, fromCol, toRow, toCol, color) {
    const oldPiece = board[toRow][toCol];
    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = { p: null, c: null };

    const inCheck = isInCheck(color);

    board[fromRow][fromCol] = board[toRow][toCol];
    board[toRow][toCol] = oldPiece;

    return inCheck;
}

/**
 * Get all valid moves for a piece at a given position
 */
function getValidMoves(row, col) {
    const piece = board[row][col];
    if (!piece.p || piece.c !== currentPlayer) return [];

    let moves = [];

    switch (piece.p) {
        case 'P': // Pawn
            const dir = piece.c === WHITE ? -1 : 1;
            const startRow = piece.c === WHITE ? 6 : 1;
            const nextRow = row + dir;

            // Forward move
            if (nextRow >= 0 && nextRow < 8 && !board[nextRow][col].p) {
                moves.push([nextRow, col]);
                // Double move from starting position
                if (row === startRow && !board[row + 2 * dir][col].p) {
                    moves.push([row + 2 * dir, col]);
                }
            }

            // Diagonal captures
            if (nextRow >= 0 && nextRow < 8) {
                if (col > 0 && board[nextRow][col - 1].p && board[nextRow][col - 1].c !== piece.c) {
                    moves.push([nextRow, col - 1]);
                }
                if (col < 7 && board[nextRow][col + 1].p && board[nextRow][col + 1].c !== piece.c) {
                    moves.push([nextRow, col + 1]);
                }
            }
            break;

        case 'N': // Knight
            const knightMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
            knightMoves.forEach(([dr, dc]) => {
                const nr = row + dr, nc = col + dc;
                if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                    if (!board[nr][nc].p || board[nr][nc].c !== piece.c) {
                        moves.push([nr, nc]);
                    }
                }
            });
            break;

        case 'K': // King
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    const nr = row + dr, nc = col + dc;
                    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                        if (!board[nr][nc].p || board[nr][nc].c !== piece.c) {
                            moves.push([nr, nc]);
                        }
                    }
                }
            }
            break;

        case 'R': // Rook
            [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(([dr, dc]) => {
                for (let i = 1; i < 8; i++) {
                    const nr = row + dr * i, nc = col + dc * i;
                    if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
                    if (board[nr][nc].p) {
                        if (board[nr][nc].c !== piece.c) moves.push([nr, nc]);
                        break;
                    }
                    moves.push([nr, nc]);
                }
            });
            break;

        case 'B': // Bishop
            [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([dr, dc]) => {
                for (let i = 1; i < 8; i++) {
                    const nr = row + dr * i, nc = col + dc * i;
                    if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
                    if (board[nr][nc].p) {
                        if (board[nr][nc].c !== piece.c) moves.push([nr, nc]);
                        break;
                    }
                    moves.push([nr, nc]);
                }
            });
            break;

        case 'Q': // Queen
            [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([dr, dc]) => {
                for (let i = 1; i < 8; i++) {
                    const nr = row + dr * i, nc = col + dc * i;
                    if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
                    if (board[nr][nc].p) {
                        if (board[nr][nc].c !== piece.c) moves.push([nr, nc]);
                        break;
                    }
                    moves.push([nr, nc]);
                }
            });
            break;
    }

    // Filter out moves that would leave king in check
    return moves.filter(([mr, mc]) => !wouldLeaveInCheck(row, col, mr, mc, currentPlayer));
}

/**
 * Execute a move on the board
 */
function makeMove(fromRow, fromCol, toRow, toCol) {
    recordMove(fromRow, fromCol, toRow, toCol);
    const piece = board[fromRow][fromCol];
    board[toRow][toCol] = piece;
    board[fromRow][fromCol] = { p: null, c: null };
    lastMove = [fromRow, fromCol, toRow, toCol];

    // Check for pawn promotion
    if (piece.p === 'P' && (toRow === 0 || toRow === 7)) {
        promotionPending = [toRow, toCol];
        document.getElementById('promotionModal').classList.add('active');
    } else {
        switchPlayer();
    }
}

/**
 * Promotion functions
 */
function promoteToQueen() {
    promotePawn('Q');
}

function promoteToRook() {
    promotePawn('R');
}

function promoteToBishop() {
    promotePawn('B');
}

function promoteToKnight() {
    promotePawn('N');
}

/**
 * Execute pawn promotion
 */
function promotePawn(piece) {
    if (promotionPending) {
        const [row, col] = promotionPending;
        board[row][col].p = piece;
        promotionPending = null;
        document.getElementById('promotionModal').classList.remove('active');
        switchPlayer();
    }
}

/**
 * Switch to the next player
 */
function switchPlayer() {
    currentPlayer = currentPlayer === WHITE ? BLACK : WHITE;

    // Check for checkmate
    if (isInCheck(currentPlayer)) {
        let hasLegalMoves = false;
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (getValidMoves(r, c).length > 0) {
                    hasLegalMoves = true;
                    break;
                }
            }
            if (hasLegalMoves) break;
        }

        if (!hasLegalMoves) {
            gameOver = true;
        }
    }

    updateBoard();
}

/**
 * Handle square click events
 */
function onSquareClick(row, col) {
    if (gameOver) return;

    if (selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col) {
        // Deselect
        selectedSquare = null;
        validMoves = [];
    } else if (validMoves.some(m => m[0] === row && m[1] === col)) {
        // Move piece
        makeMove(selectedSquare[0], selectedSquare[1], row, col);
        selectedSquare = null;
        validMoves = [];
    } else if (board[row][col].p && board[row][col].c === currentPlayer) {
        // Select piece
        selectedSquare = [row, col];
        validMoves = getValidMoves(row, col);
    } else {
        // Click on empty or opponent's piece
        selectedSquare = null;
        validMoves = [];
    }

    updateBoard();
}

/**
 * Get color class based on statistics percentage
 */
function getStatColor(percentage) {
    if (percentage >= 50) return 'stat-high';
    if (percentage >= 25) return 'stat-medium';
    return 'stat-low';
}

/**
 * Update the board display
 */
function updateBoard() {
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';

    const stats = selectedSquare ? getStatisticsForSquare(selectedSquare[0], selectedSquare[1]) : null;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;

            // Apply selection highlight
            if (selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col) {
                square.classList.add('selected');
            }
            // Apply valid move highlights
            else if (validMoves.some(m => m[0] === row && m[1] === col)) {
                if (board[row][col].p) {
                    square.classList.add('capture');
                } else {
                    square.classList.add('valid');
                }
            }

            // Apply statistics coloring
            if (stats && stats.moves[`${row},${col}`]) {
                const percentage = stats.moves[`${row},${col}`].percentage;
                square.classList.add(getStatColor(percentage));

                const percent = document.createElement('div');
                percent.className = 'stat-percent';
                percent.textContent = `${percentage}%`;
                square.appendChild(percent);
            }

            // Add piece
            const piece = board[row][col];
            if (piece.p) {
                square.innerHTML = `<span class="piece ${piece.c}">${piece.p}</span>`;
            }

            square.onclick = () => onSquareClick(row, col);
            boardEl.appendChild(square);
        }
    }

    // Update game information
    const statusEl = document.getElementById('status');
    const infoEl = document.getElementById('info');
    const statsPanel = document.getElementById('statsPanel');
    const gameOverEl = document.getElementById('gameOverMessage');

    infoEl.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} to move`;

    // Update statistics panel
    if (stats) {
        statsPanel.style.display = 'block';
        const content = document.getElementById('statsContent');
        content.innerHTML = '';

        const sortedMoves = Object.entries(stats.moves)
            .map(([key, val]) => ({ key, ...val }))
            .sort((a, b) => b.percentage - a.percentage);

        sortedMoves.forEach(m => {
            const [row, col] = m.key.split(',');
            const fileChar = String.fromCharCode(97 + parseInt(col));
            const rankChar = 8 - parseInt(row);

            const bar = document.createElement('div');
            bar.className = 'stat-bar';
            bar.innerHTML = `<span class="stat-label">→ ${fileChar}${rankChar}</span><span class="stat-value">${m.percentage}% (${m.count}x)</span>`;
            content.appendChild(bar);
        });
    } else {
        statsPanel.style.display = 'none';
    }

    // Update game over status
    if (gameOver) {
        statusEl.innerHTML = '<span class="checkmate">CHECKMATE!</span>';
        const winner = currentPlayer === WHITE ? 'Black' : 'White';
        gameOverEl.innerHTML = `<div class="game-over">${winner} wins!</div>`;
    } else if (isInCheck(currentPlayer)) {
        statusEl.innerHTML = '<span class="check">CHECK</span>';
        gameOverEl.innerHTML = '';
    } else {
        statusEl.innerHTML = '';
        gameOverEl.innerHTML = '';
    }
}

/**
 * Clear all statistics
 */
function clearStats() {
    if (confirm('Clear all move statistics? This cannot be undone.')) {
        moveStats = { white: {}, black: {} };
        saveStats();
        updateBoard();
    }
}

/**
 * Reset the game
 */
function resetGame() {
    initBoard();
    updateBoard();
}

// Initialize the game on page load
window.addEventListener('DOMContentLoaded', () => {
    initBoard();
    updateBoard();
});

// src/logic/boardAnalyzer.js
import { findAllLegalMatches } from './matchEngine.js';

export const analyzeBoard = (board) => {
    const matches = findAllLegalMatches(board);
    const unmatchedNumbers = getUnmatchedNumbers(board, matches);
    const lonelyRows = getLonelyRows(board);

    return {
        matches,
        unmatchedNumbers,
        lonelyRows,
        isDead: matches.length === 0,
        moveCount: matches.length
    };
};

export const getUnmatchedNumbers = (board, existingMatches) => {
    const unmatches = [];

    const matchedCoords = new Set();
    existingMatches.forEach(matchPair => {
        matchedCoords.add(`${matchPair[0].row},${matchPair[0].col}`);
        matchedCoords.add(`${matchPair[1].row},${matchPair[1].col}`);
    });

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] !== null) {
                if (!matchedCoords.has(`${r},${c}`)) {
                    unmatches.push({ row: r, col: c, val: board[r][c] });
                }
            }
        }
    }
    return unmatches;
};

export const getLonelyRows = (board) => {
    const lonely = [];
    for (let r = 0; r < board.length; r++) {
        const row = board[r];
        const remainingCells = row.filter(cell => cell !== null);
        if (remainingCells.length === 1) {
            const c = row.findIndex(cell => cell !== null);
            lonely.push({ row: r, col: c, val: board[r][c] });
        }
    }
    return lonely;
};

// src/logic/matchEngine.js

export const isValueMatch = (val1, val2) => {
    if (val1 === null || val2 === null) return false;
    return val1 === val2 || (val1 + val2 === 10);
};

export const validateMatch = (board, c1, c2) => {
    if (c1.row === c2.row && c1.col === c2.col) return false;

    const val1 = board[c1.row][c1.col];
    const val2 = board[c2.row][c2.col];

    if (!isValueMatch(val1, val2)) return false;

    const [start, end] = sortCoords(c1, c2);

    if (checkHorizontal(board, start, end)) return true;
    if (checkVertical(board, start, end)) return true;
    if (checkDiagonal(board, start, end)) return true;
    if (checkWrapAround(board, start, end)) return true;

    return false;
};

const sortCoords = (c1, c2) => {
    if (c1.row < c2.row) return [c1, c2];
    if (c1.row === c2.row && c1.col < c2.col) return [c1, c2];
    return [c2, c1];
};

export const checkHorizontal = (board, start, end) => {
    if (start.row !== end.row) return false;
    for (let c = start.col + 1; c < end.col; c++) {
        if (board[start.row][c] !== null) return false;
    }
    return true;
};

export const checkVertical = (board, start, end) => {
    if (start.col !== end.col) return false;
    for (let r = start.row + 1; r < end.row; r++) {
        if (board[r][start.col] !== null) return false;
    }
    return true;
};

export const checkDiagonal = (board, start, end) => {
    const rowDiff = end.row - start.row;
    const colDiff = Math.abs(end.col - start.col);

    if (rowDiff !== colDiff) return false;

    const colStep = (end.col > start.col) ? 1 : -1;

    for (let i = 1; i < rowDiff; i++) {
        const r = start.row + i;
        const c = start.col + (i * colStep);
        if (board[r][c] !== null) return false;
    }
    return true;
};

export const checkWrapAround = (board, start, end) => {
    let currRow = start.row;
    let currCol = start.col + 1;

    while (currRow < end.row || (currRow === end.row && currCol < end.col)) {
        if (currCol >= 9) {
            currCol = 0;
            currRow++;
            continue;
        }

        if (currRow === end.row && currCol === end.col) break;

        if (board[currRow][currCol] !== null) return false;

        currCol++;
    }

    return true;
};

export const removeMatch = (board, c1, c2) => {
    const nextBoard = board.map(row => [...row]);
    nextBoard[c1.row][c1.col] = null;
    nextBoard[c2.row][c2.col] = null;

    return removeEmptyRows(nextBoard);
};

export const removeEmptyRows = (board) => {
    return board.filter(row => row.some(cell => cell !== null));
};

export const findAllLegalMatches = (board) => {
    const matches = [];
    const cells = [];
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] !== null) {
                cells.push({ row: r, col: c, val: board[r][c] });
            }
        }
    }

    for (let i = 0; i < cells.length; i++) {
        for (let j = i + 1; j < cells.length; j++) {
            if (validateMatch(board, cells[i], cells[j])) {
                matches.push([cells[i], cells[j]]);
            }
        }
    }

    return matches;
};

// src/logic/boardGenerator.js
import { getDifficulty } from './difficulty.js';

const COMPLEMENTARY_PAIRS = [
    [1, 9],
    [2, 8],
    [3, 7],
    [4, 6],
    [5, 5],
    [9, 1],
    [8, 2],
    [7, 3],
    [6, 4]
];

const DECOYS = [1, 2, 3, 4, 1, 2, 1, 3, 4];

/**
 * Deterministically generates an initial 3x9 board based on level.
 */
export const generateBoard = (level) => {
    const difficulty = getDifficulty(level);

    // Total cells = 3 rows * 9 columns = 27
    const initialCellsCount = 27;
    const board = [];

    let pairPosition = 0;
    let decoyPosition = 0;

    let pairCounter = 0; // Truly track how many pair parts we've added

    // Fill the board deterministically
    for (let i = 0; i < initialCellsCount; i++) {
        const hash = (level * 17 + i * 31) % 100;
        const isDecoy = hash < (difficulty.decoyDensity * 100);

        if (isDecoy) {
            // Insert a deterministic decoy
            board.push(DECOYS[(level + decoyPosition++) % DECOYS.length]);
        } else {
            // Insert a part of a pair
            const pairIndex = (level + pairPosition) % COMPLEMENTARY_PAIRS.length;
            const pair = COMPLEMENTARY_PAIRS[pairIndex];
            const part = (pairCounter % 2 === 0) ? pair[0] : pair[1];
            board.push(part);

            if (pairCounter % 2 === 1) {
                pairPosition++;
            }
            pairCounter++;
        }
    }

    // Verification step: Check for unmatched numbers that have no complement on the board
    let finalBoard = repairBoard(board);

    return to2DGrid(finalBoard);
};

const repairBoard = (flatBoard) => {
    const occurrences = {};
    for (let i = 1; i <= 9; i++) occurrences[i] = 0;

    flatBoard.forEach(n => occurrences[n]++);

    // Find at least one safe matchable pair we can leach onto
    let safeNumber = 1;
    for (let i = 1; i <= 9; i++) {
        if (occurrences[i] >= 1) {
            safeNumber = i;
            break;
        }
    }

    let repairedBoard = [...flatBoard];
    for (let i = 0; i < repairedBoard.length; i++) {
        const num = repairedBoard[i];
        const complement = 10 - num;

        let hasMatch = false;
        if (occurrences[num] > 1) {
            hasMatch = true;
        } else if (occurrences[complement] > 0) {
            hasMatch = true;
        }

        if (!hasMatch) {
            // Repair: Swap this unmatched number to match the safeNumber!
            occurrences[num]--;

            // To match safeNumber, we can just BECOME safeNumber, or its 10-complement.
            repairedBoard[i] = 10 - safeNumber;
            occurrences[10 - safeNumber]++;
        }
    }

    return repairedBoard;
};

export const to2DGrid = (flatBoard) => {
    const rows = [];
    for (let i = 0; i < flatBoard.length; i += 9) {
        let row = flatBoard.slice(i, i + 9);
        rows.push(row);
    }
    return rows;
};

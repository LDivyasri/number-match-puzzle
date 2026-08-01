// src/logic/addRowEngine.js
import { getDifficulty } from './difficulty.js';
import { analyzeBoard } from './boardAnalyzer.js';
import { handleRescue, generateComplement } from './rescueEngine.js';

const DECOYS = [1, 2, 3, 4, 1, 2, 1, 3, 4];

/**
 * Appends exactly one new row of 9 numbers deterministically.
 */
const getExposedToCell = (board, r, c) => {
    const exposed = new Set();

    // Vertical Raycast Up
    for (let i = r - 1; i >= 0; i--) {
        if (board[i][c] !== null) {
            exposed.add(board[i][c]);
            break;
        }
    }

    // Diagonal Up-Left
    for (let i = 1; r - i >= 0 && c - i >= 0; i++) {
        if (board[r - i][c - i] !== null) {
            exposed.add(board[r - i][c - i]);
            break;
        }
    }

    // Diagonal Up-Right
    for (let i = 1; r - i >= 0 && c + i < 9; i++) {
        if (board[r - i][c + i] !== null) {
            exposed.add(board[r - i][c + i]);
            break;
        }
    }

    // Wrap-Around Backwards
    let currR = r;
    let currC = c - 1;
    while (currR >= 0) {
        if (currC < 0) {
            currC = 8;
            currR--;
            continue;
        }
        if (board[currR][currC] !== null) {
            exposed.add(board[currR][currC]);
            break;
        }
        currC--;
    }

    return Array.from(exposed);
};

export const addRow = (board, level, isRescue, remainingAddRows = 5) => {
    // Only analyze for checking if we are completely dead, 
    // or finding isolated lonely numbers.
    const analysis = analyzeBoard(board);
    const difficulty = getDifficulty(level);

    let newRow = [];
    const newRowIndex = board.length;
    let decoyPosition = 0;

    // Check if we need to do a rescue
    if (isRescue) {
        let complement = handleRescue(board);
        if (complement) {
            newRow.push(complement);
        }
    }

    // We prioritize generating partners for "stragglers" (lonely rows) 
    // IF they happen to be exposed in the new array. But checking exposure dynamically is safer.

    // Build the row cell by cell
    while (newRow.length < 9) {
        const currentCol = newRow.length;

        // Distributed deterministic hash so decoys don't bunch together!
        const hash = (level * 17 + newRowIndex * 13 + currentCol * 31) % 100;
        let isDecoy = hash < (difficulty.decoyDensity * 100);

        // NEVER add decoys if this is one of our final 2 Add Rows! We need to let the board clear!
        if (remainingAddRows <= 1) {
            isDecoy = false;
        }

        // Raycast backwards using a SIMULATED board that includes the pieces we just made
        const simulatedBoard = [...board, [...newRow, ...Array(9 - newRow.length).fill(null)]];
        const exposedVals = getExposedToCell(simulatedBoard, newRowIndex, currentCol);

        if (isDecoy || exposedVals.length === 0) {
            newRow.push(DECOYS[(level + decoyPosition++) % DECOYS.length]);
        } else {
            // Find a complement specifically for an exposed path!
            // Priority 1: Pick an exposed value that is unmatched or lonely
            const lonelyVals = analysis.lonelyRows.map(l => l.val);
            const unmatchedVals = analysis.unmatchedNumbers.map(u => u.val);

            let chosenTarget = null;

            // Is there an exposed lonely value?
            const exposedLonely = exposedVals.find(v => lonelyVals.includes(v));
            if (exposedLonely) {
                chosenTarget = exposedLonely;
            } else {
                // Is there an exposed unmatched value?
                const exposedUnmatched = exposedVals.find(v => unmatchedVals.includes(v));
                if (exposedUnmatched) {
                    chosenTarget = exposedUnmatched;
                }
            }

            // If neither priority targets are exposed, just match the first exposed thing
            if (!chosenTarget) {
                chosenTarget = exposedVals[0];
            }

            newRow.push(generateComplement(chosenTarget));
        }
    }

    return [...board, newRow];
};

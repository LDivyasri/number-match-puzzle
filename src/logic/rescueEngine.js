// src/logic/rescueEngine.js
import { analyzeBoard } from './boardAnalyzer.js';

/**
 * rescueEngine ensuring solvability when user gets stuck.
 * Automatically generating guaranteed matching pair.
 */
export const handleRescue = (board) => {
    const analysis = analyzeBoard(board);

    // Find an unmatched number
    let target = null;
    if (analysis.unmatchedNumbers.length > 0) {
        target = analysis.unmatchedNumbers[0].val;
    } else {
        // Fallback strategy if somehow board has matches but they want rescue
        // Find first non-null cell
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] !== null) {
                    target = board[r][c];
                    break;
                }
            }
            if (target) break;
        }
    }

    if (!target) return null; // Board is empty, nothing to rescue

    return generateComplement(target);
};

export const generateComplement = (number) => {
    // 5 sum to 5 is 10, or 5 is equal to 5.
    // For others we just return 10 - number for variety, or the number itself.
    // Let's use the complement to 10 for deterministic pairs (1-9, 2-8 etc.)
    return 10 - number;
};

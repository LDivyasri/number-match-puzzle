// src/logic/difficulty.js

/**
 * Sawtooth difficulty configuration for every level.
 * Defines deterministic parameters instead of random generation.
 */
export const levels = [
    { level: 1, matchDensity: 0.70, decoyDensity: 0.10, idealAddRowUsage: 1 },
    { level: 2, matchDensity: 0.65, decoyDensity: 0.15, idealAddRowUsage: 2 },
    { level: 3, matchDensity: 0.55, decoyDensity: 0.20, idealAddRowUsage: 2 },
    { level: 4, matchDensity: 0.45, decoyDensity: 0.30, idealAddRowUsage: 2 },
    { level: 5, matchDensity: 0.35, decoyDensity: 0.40, idealAddRowUsage: 3 },
    { level: 6, matchDensity: 0.55, decoyDensity: 0.20, idealAddRowUsage: 2 }, // Relief level
    { level: 7, matchDensity: 0.45, decoyDensity: 0.30, idealAddRowUsage: 3 },
    { level: 8, matchDensity: 0.35, decoyDensity: 0.40, idealAddRowUsage: 3 },
    { level: 9, matchDensity: 0.25, decoyDensity: 0.45, idealAddRowUsage: 4 },
    { level: 10, matchDensity: 0.20, decoyDensity: 0.50, idealAddRowUsage: 5 },
];

export const getDifficulty = (levelNumber) => {
    if (levelNumber <= 10) {
        return levels[levelNumber - 1];
    }
    // After level 10, repeat the 7-10 pattern increasing difficulty slightly
    const baseIndex = 6 + ((levelNumber - 11) % 4);
    const diff = levels[baseIndex];
    return {
        level: levelNumber,
        matchDensity: Math.max(0.10, diff.matchDensity - 0.05),
        decoyDensity: Math.min(0.70, diff.decoyDensity + 0.05),
        idealAddRowUsage: Math.min(6, diff.idealAddRowUsage + 1)
    };
};

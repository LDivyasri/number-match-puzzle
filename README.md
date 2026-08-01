# Deterministic Number Match Puzzle

A React Native Expo implementation of a Number Match Puzzle that replaces Random Number Generation (RNG) with a Deterministic Logic System to provide a fair and consistent gameplay experience.

---

## Project Objective

The objective of this project is to replace the traditional RNG-based board generation with deterministic algorithms that create balanced, configurable, and solvable puzzle boards.

The project focuses on:

- Deterministic Board Generation
- Smart Add Row Logic
- Rescue Mechanic
- Straggler Cleanup
- Sawtooth Difficulty Progression

---

## Features

- Initial board with 3 rows × 9 columns
- Deterministic board generation
- Same Number and Sum-to-10 matching
- Horizontal, Vertical, Diagonal and Wrap-Around matching
- Smart Add Row Engine
- Rescue Mechanic
- Straggler Cleanup
- Sawtooth Difficulty Curve
- Configurable level progression

---

## Project Structure

```
src/
│
├── components/
│   ├── Board.js
│   ├── Cell.js
│   ├── Controls.js
│   └── Header.js
│
├── logic/
│   ├── boardGenerator.js
│   ├── matchEngine.js
│   ├── addRowEngine.js
│   ├── rescueEngine.js
│   ├── boardAnalyzer.js
│   └── difficulty.js
│
└── screens/
    └── GameScreen.js
```

---

## Algorithms

### Deterministic Board Generation
- Generates complementary pairs
- Uses deterministic placement instead of random generation
- Adds controlled decoys
- Validates generated boards before gameplay

### Smart Add Row
- Analyzes the current board
- Finds unmatched numbers
- Prioritizes complementary values
- Cleans lonely rows
- Appends one row containing nine numbers

### Rescue Mechanic
If the player becomes stuck after consecutive Add Row operations, the engine generates a guaranteed matching opportunity.

### Straggler Cleanup
Rows containing only one remaining number are prioritized during Add Row generation to keep the board organized.

---

## Difficulty Progression

The game follows a Sawtooth Difficulty Curve.

| Level | Match Density | Decoy Density |
|------|--------------:|--------------:|
| 1 | 70% | 10% |
| 2 | 65% | 15% |
| 3 | 55% | 20% |
| 4 | 45% | 30% |
| 5 | 35% | 40% |
| 6 | Relief Level | |
| 7–10 | Increasing Difficulty | |

---

## Tech Stack

- React Native
- Expo
- JavaScript

---

## Installation

```bash
npm install

npx expo start
```



## Author

Divya Sri

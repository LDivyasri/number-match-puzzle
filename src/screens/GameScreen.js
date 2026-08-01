import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, SafeAreaView, StatusBar, Text } from 'react-native';
import Header from '../components/Header';
import Board from '../components/Board';
import Controls from '../components/Controls';
import { generateBoard, to2DGrid } from '../logic/boardGenerator';
import { validateMatch, removeMatch } from '../logic/matchEngine';
import { addRow } from '../logic/addRowEngine';
import { analyzeBoard } from '../logic/boardAnalyzer';

const GameScreen = () => {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [board, setBoard] = useState([]);
    const [remainingAddRows, setRemainingAddRows] = useState(6);
    const [selectedCell, setSelectedCell] = useState(null);
    const [consecutiveAddRows, setConsecutiveAddRows] = useState(0);

    useEffect(() => {
        startLevel(level);
    }, [level]);

    const startLevel = (lvl) => {
        const initialBoard = generateBoard(lvl);
        setBoard(initialBoard);
        setRemainingAddRows(6);
        setSelectedCell(null);
        setConsecutiveAddRows(0);
    };

    const handleRestart = () => {
        Alert.alert(
            "Restart Level",
            "Are you sure you want to restart?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Restart", style: "destructive", onPress: () => {
                        setScore(0);
                        startLevel(1);
                        setLevel(1);
                    }
                }
            ]
        );
    };

    const checkWinCondition = (currentBoard) => {
        // If all rows are empty (or filtered out by removeEmptyRows), length will be 0
        if (currentBoard.length === 0) {
            Alert.alert(
                "Level Complete!",
                `You completed Level ${level}!`,
                [{ text: "Next Level", onPress: () => setLevel(prev => prev + 1) }]
            );
        }
    };

    const handleCellPress = (r, c) => {
        const val = board[r][c];
        if (val === null) return;

        if (!selectedCell) {
            setSelectedCell({ row: r, col: c });
        } else {
            // Unselect if same cell
            if (selectedCell.row === r && selectedCell.col === c) {
                setSelectedCell(null);
                return;
            }

            // Attempt match
            const isValid = validateMatch(board, selectedCell, { row: r, col: c });

            if (isValid) {
                const nextBoard = removeMatch(board, selectedCell, { row: r, col: c });
                setBoard(nextBoard);
                setScore(prev => {
                    const next = prev + val * 2;
                    if (next > bestScore) setBestScore(next);
                    return next;
                });

                // Reset consecutive add-rows if a valid match was made
                setConsecutiveAddRows(0);

                checkWinCondition(nextBoard);
            }

            setSelectedCell(null);
        }
    };

    const handleAddRow = () => {
        if (remainingAddRows <= 0) return;

        const analysis = analyzeBoard(board);

        // Rescue condition: 
        // "If Player presses Add Row twice AND there are still zero legal matches"
        const nextConsecutive = consecutiveAddRows + 1;

        let isRescue = false;
        if (nextConsecutive >= 2 && analysis.isDead) {
            isRescue = true;
        }

        const nextBoard = addRow(board, level, isRescue, remainingAddRows - 1);
        setBoard(nextBoard);
        setRemainingAddRows(prev => prev - 1);
        setConsecutiveAddRows(nextConsecutive);
        setSelectedCell(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Header level={level} score={score} bestScore={bestScore} />
            <Board
                board={board}
                selectedCell={selectedCell}
                onCellPress={handleCellPress}
            />
            {board.length === 0 && (
                <Text style={styles.winText}>Board Cleared!</Text>
            )}
            <Controls
                remainingAddRows={remainingAddRows}
                onAddRow={handleAddRow}
                onRestart={handleRestart}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0F1',
    },
    winText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#27AE60',
        marginBottom: 20
    }
});

export default GameScreen;

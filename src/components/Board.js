import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Cell from './Cell';

const Board = ({ board, selectedCell, onCellPress }) => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {board.map((row, rIndex) => (
                <View key={`r-${rIndex}`} style={styles.row}>
                    {row.map((val, cIndex) => {
                        const isSelected = selectedCell?.row === rIndex && selectedCell?.col === cIndex;
                        return (
                            <Cell
                                key={`c-${rIndex}-${cIndex}`}
                                value={val}
                                isSelected={isSelected}
                                onPress={() => onCellPress(rIndex, cIndex)}
                            />
                        );
                    })}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
    },
    content: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    row: {
        flexDirection: 'row',
    }
});

export default Board;

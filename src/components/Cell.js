import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Cell = ({ value, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.cell,
                isSelected && styles.selected,
                value === null && styles.empty
            ]}
            onPress={onPress}
            disabled={value === null}
        >
            <Text style={styles.text}>{value !== null ? value : ''}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cell: {
        width: 36,
        height: 36,
        margin: 2,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        elevation: 2,
    },
    empty: {
        backgroundColor: 'transparent',
        elevation: 0,
    },
    selected: {
        backgroundColor: '#F5A623',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Cell;

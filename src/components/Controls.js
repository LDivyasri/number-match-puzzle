import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Controls = ({ remainingAddRows, onAddRow, onRestart }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, remainingAddRows <= 0 && styles.disabled]}
                onPress={onAddRow}
                disabled={remainingAddRows <= 0}
            >
                <Text style={styles.buttonText}>
                    Add Row ({remainingAddRows})
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.restart]} onPress={onRestart}>
                <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center',
        gap: 15,
        paddingBottom: 30,
    },
    button: {
        backgroundColor: '#27AE60',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
    },
    disabled: {
        backgroundColor: '#95A5A6',
    },
    restart: {
        backgroundColor: '#C0392B',
        flex: 0.5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Controls;

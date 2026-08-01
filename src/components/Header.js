import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ level, score, bestScore }) => {
    return (
        <View style={styles.container}>
            <View style={styles.statBox}>
                <Text style={styles.label}>LEVEL</Text>
                <Text style={styles.value}>{level}</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.label}>SCORE</Text>
                <Text style={styles.value}>{score}</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.label}>BEST</Text>
                <Text style={styles.value}>{bestScore}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#2C3E50',
    },
    statBox: {
        alignItems: 'center',
    },
    label: {
        color: '#BDC3C7',
        fontSize: 12,
        fontWeight: '600',
    },
    value: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4,
    }
});

export default Header;

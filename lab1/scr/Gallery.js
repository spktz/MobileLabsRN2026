import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';

const IMAGES = Array(12).fill({});
const numColumns = 2;
const size = Dimensions.get('window').width / numColumns - 20;

export default function GalleryScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={IMAGES}
                numColumns={numColumns}
                keyExtractor={(item, index) => index.toString()}
                renderItem={() => (
                    <View style={[styles.imageSquare, { width: size, height: size }]} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 10 },
    imageSquare: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 5,
        borderRadius: 10
    }
});
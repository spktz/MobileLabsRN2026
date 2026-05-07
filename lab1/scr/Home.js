import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const NEWS_DATA = Array(8).fill({
    id: Math.random().toString(),
    title: 'Заголовок новини',
    date: 'Дата новини',
    text: 'Короткий текст новини'
});

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Новини</Text>
            <FlatList
                data={NEWS_DATA}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.newsItem}>
                        <View style={styles.placeholderImage} />
                        <View style={styles.newsContent}>
                            <Text style={styles.newsTitle}>{item.title}</Text>
                            <Text style={styles.newsDate}>{item.date}</Text>
                            <Text style={styles.newsText}>{item.text}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 15 },
    pageTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
    newsItem: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
    placeholderImage: { width: 80, height: 80, backgroundColor: '#e1e1e1', borderRadius: 5 },
    newsContent: { marginLeft: 15, flex: 1 },
    newsTitle: { fontSize: 18, fontWeight: 'bold' },
    newsDate: { color: 'gray', fontSize: 12 },
    newsText: { color: '#333' },
});
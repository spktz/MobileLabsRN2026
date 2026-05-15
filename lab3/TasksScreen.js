import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TasksScreen({ score, tasks, isDark }) {
    const data = [
        { txt: "Зробити 10 кліків", ok: tasks.taps >= 10, val: `${tasks.taps}/10` },
        { txt: "Подвійний клік 5 разів", ok: tasks.doubleTaps >= 5, val: `${tasks.doubleTaps}/5` },
        { txt: "Утримувати 3 секунди", ok: tasks.longPress, val: tasks.longPress ? "1/1" : "0/1" },
        { txt: "Перетягнути об'єкт", ok: tasks.moved, val: tasks.moved ? "1/1" : "0/1" },
        { txt: "Свайп вправо", ok: tasks.swipeRight, val: tasks.swipeRight ? "1/1" : "0/1" },
        { txt: "Свайп вліво", ok: tasks.swipeLeft, val: tasks.swipeLeft ? "1/1" : "0/1" },
        { txt: "Змінити розмір (Pinch)", ok: tasks.resized, val: tasks.resized ? "1/1" : "0/1" },
        { txt: "Набрати 100 очок", ok: score >= 100, val: `${score}/100` },
        { txt: "Перейти в темну тему", ok: isDark, val: isDark ? "✅" : "❌" },
    ];

    return (
        <ScrollView style={[styles.container, isDark && styles.darkBg]}>
            <Text style={[styles.header, isDark && styles.lightText]}>Завдання</Text>
            {data.map((item, i) => (
                <View key={i} style={[styles.card, isDark && styles.darkCard]}>
                    <View style={{flex: 1}}>
                        <Text style={[styles.taskText, isDark && styles.lightText]}>{item.txt}</Text>
                        <Text style={styles.progressText}>{item.val}</Text>
                    </View>
                    <Text style={{fontSize: 20}}>{item.ok ? "✅" : "⏳"}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF9F2', padding: 20 },
    darkBg: { backgroundColor: '#121212' },
    header: { fontSize: 24, fontWeight: 'bold', color: '#FF8C00', marginBottom: 20 },
    lightText: { color: '#FFF' },
    card: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#FFF', marginBottom: 10,
        elevation: 2, border: 4, borderColor: '#FFA500'
    },
    darkCard: { backgroundColor: '#1E1E1E' },
    taskText: { fontSize: 15, fontWeight: '600' },
    progressText: { fontSize: 12, color: '#888', marginTop: 2 }
});
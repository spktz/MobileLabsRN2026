import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';

export default function HomeScreen() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState(new Date());

    const [showDateProp, setShowDateProp] = useState(false);
    const [showTimeProp, setShowTimeProp] = useState(false);

    const appId = Constants.expoConfig?.extra?.oneSignalAppId;
    const apiKey = Constants.expoConfig?.extra?.oneSignalRestKey;

    const formatDateTime = (dateObj) => {
        return dateObj.toLocaleDateString('uk-UA') + ' ' +
            dateObj.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
    };

    const scheduleNotification = async (message, taskTitle, sendDate) => {
        const url = 'https://api.onesignal.com/notifications';

        const finalDate = new Date(sendDate);
        finalDate.setSeconds(0);
        finalDate.setMilliseconds(0);

        if (finalDate <= new Date()) {
            Alert.alert("Помилка", "Оберіть час у майбутньому!");
            return null;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Basic ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    app_id: appId,
                    contents: { en: message },
                    headings: { en: taskTitle },
                    included_segments: ['Total Subscriptions'],
                    send_after: finalDate.toISOString(),
                }),
            });

            if (!response.ok) throw new Error(`Помилка API: ${response.status}`);
            const result = await response.json();
            return result.id;
        } catch (error) {
            Alert.alert('Помилка OneSignal', error.message);
            return null;
        }
    };

    const addTask = async () => {
        if (!title || !desc) {
            Alert.alert('Увага', 'Заповни всі поля!');
            return;
        }

        const notificationId = await scheduleNotification(desc, title, date);

        if (notificationId) {
            const newTask = {
                id: Date.now().toString(),
                title,
                desc,
                time: formatDateTime(date),
                notificationId,
            };
            setTasks([...tasks, newTask]);
            setTitle('');
            setDesc('');
            Alert.alert('Успіх', 'Задачу додано!');
        }
    };

    const deleteTask = async (id, notifyId) => {
        try {
            await fetch(`https://api.onesignal.com/notifications/${notifyId}?app_id=${appId}`, {
                method: 'DELETE',
                headers: { Authorization: `Basic ${apiKey}` },
            });
        } catch (e) { console.log('Помилка видалення:', e); }
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const onDateChange = (event, selectedDate) => {
        setShowDateProp(false);
        if (event.type === 'set' && selectedDate) {
            const currentDate = new Date(date);
            currentDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            setDate(currentDate);
            setShowTimeProp(true);
        }
    };

    const onTimeChange = (event, selectedTime) => {
        setShowTimeProp(false);
        if (event.type === 'set' && selectedTime) {
            const currentDate = new Date(date);
            currentDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
            currentDate.setSeconds(0);
            setDate(currentDate);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Назва задачі" value={title} onChangeText={setTitle} />
                <TextInput style={styles.input} placeholder="Опис" value={desc} onChangeText={setDesc} />

                <View style={styles.pickerBox}>
                    <Text style={styles.label}>Оберіть дату та час:</Text>

                    <TouchableOpacity style={styles.timeButton} onPress={() => setShowDateProp(true)}>
                        <Text style={styles.timeButtonText}>{formatDateTime(date)}</Text>
                    </TouchableOpacity>

                    {showDateProp && (
                        <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} />
                    )}

                    {showTimeProp && (
                        <DateTimePicker value={date} mode="time" display="default" is24Hour={true} onChange={onTimeChange} />
                    )}
                </View>

                <TouchableOpacity style={styles.addBtn} onPress={addTask}>
                    <Text style={styles.addBtnText}>ДОДАТИ НАГАДУВАННЯ</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardDesc}>{item.desc}</Text>
                            <Text style={styles.cardTime}> {item.time}</Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteTask(item.id, item.notificationId)}>
                            <Text style={styles.deleteText}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5', padding: 20, paddingTop: 40 },
    form: { backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 3, marginBottom: 20 },
    input: { borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 15, padding: 5, fontSize: 16 },
    pickerBox: { alignItems: 'center', marginBottom: 15, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8 },
    label: { fontSize: 13, color: '#666', alignSelf: 'flex-start', marginBottom: 5 },
    timeButton: { backgroundColor: '#eee', padding: 12, borderRadius: 5, width: '100%', alignItems: 'center' },
    timeButtonText: { fontSize: 14, color: '#333', fontWeight: '500' },
    addBtn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 5, alignItems: 'center' },
    addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 10, elevation: 1 },
    cardTitle: { fontWeight: 'bold', fontSize: 16, color: '#333' },
    cardDesc: { color: '#666', marginVertical: 2 },
    cardTime: { fontSize: 12, color: '#007AFF', marginTop: 4, fontWeight: 'bold' },
    deleteText: { fontSize: 22, padding: 5 },
});
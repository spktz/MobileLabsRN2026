import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ProfileScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.pageTitle}>Реєстрація</Text>

            <View style={styles.inputGroup}>
                <Text>Електронна пошта</Text>
                <TextInput style={styles.input} />

                <Text>Пароль</Text>
                <TextInput style={styles.input} secureTextEntry={true} />

                <Text>Пароль (ще раз)</Text>
                <TextInput style={styles.input} secureTextEntry={true} />

                <Text>Прізвище</Text>
                <TextInput style={styles.input} />

                <Text>Ім'я</Text>
                <TextInput style={styles.input} />
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Зареєструватися</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    pageTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    inputGroup: { marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 15
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: { color: '#fff', fontWeight: 'bold' }
});
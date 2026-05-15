import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Додали за умовою

    const { register } = useAuth();
    const router = useRouter();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            Alert.alert('Помилка', 'Паролі не співпадають');
            return;
        }

        const success = register(email, password, name);

        if (success) {
            router.replace('/');
        } else {
            Alert.alert('Помилка', 'Будь ласка, заповніть усі поля');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Реєстрація у RockStore</Text>

            <TextInput
                style={styles.input}
                placeholder="Ім'я"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                keyboardType="email-address"
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Підтвердіть пароль"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <View style={{ marginTop: 10 }}>
                <Button title="Зареєструватися" onPress={handleRegister} color="#4CAF50" />
            </View>

            <Link href="/login" style={styles.link}>
                Вже є акаунт? Увійти
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8
    },
    link: {
        marginTop: 20,
        color: 'blue',
        textAlign: 'center',
        fontSize: 16
    },
});
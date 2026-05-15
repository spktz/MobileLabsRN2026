import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';


export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter(); // Ініціалізуй роутер

    const handleLogin = () => {
        const success = login(email, password);
        if (success) {
            router.replace('/');
        } else {
            alert('Будь ласка, заповніть усі поля');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вхід до Soundstore</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button title="Увійти" onPress={handleLogin} color="#2196F3" />

            <Link href="/register" style={styles.link}>
                Зареєструватися
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 15, borderRadius: 8 },
    link: { marginTop: 15, color: 'blue', textAlign: 'center' },
});
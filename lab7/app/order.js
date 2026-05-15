import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cart/cartSlice';
import { addOrder } from '../store/orders/ordersSlice';
import { updateProfile } from '../store/users/usersSlice';
import { useRouter } from 'expo-router';

export default function OrderScreen() {
    const dispatch = useDispatch();
    const router = useRouter();
    const cartItems = useSelector(state => state.cart.items);
    const profile = useSelector(state => state.users.profile);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [form, setForm] = useState(profile);

    const handleConfirm = () => {
        if (!form.fullName || !form.email || !form.phone || !form.address) {
            return Alert.alert("Помилка", "Заповніть усі поля!");
        }
        dispatch(updateProfile(form));
        dispatch(addOrder({items: cartItems, total: total, user: form }));
        dispatch(clearCart());

        Alert.alert("Успіх", "Замовлення оформлено!", [
            { text: "OK", onPress: () => router.replace('/') }
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Дані отримувача</Text>

            <TextInput
                style={styles.input} placeholder="ПІБ" placeholderTextColor="#888"
                value={form.fullName} onChangeText={(t) => setForm({...form, fullName: t})}
            />
            <TextInput
                style={styles.input} placeholder="Email" placeholderTextColor="#888" keyboardType="email-address"
                value={form.email} onChangeText={(t) => setForm({...form, email: t})}
            />
            <TextInput
                style={styles.input} placeholder="Телефон" placeholderTextColor="#888" keyboardType="phone-pad"
                value={form.phone} onChangeText={(t) => setForm({...form, phone: t})}
            />
            <TextInput
                style={styles.input} placeholder="Адреса" placeholderTextColor="#888"
                value={form.address} onChangeText={(t) => setForm({...form, address: t})}
            />

            <View style={styles.summary}>
                <Text style={styles.totalText}>До сплати: {total} грн</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Підтвердити замовлення</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212', padding: 20 },
    title: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    input: { backgroundColor: '#1a1a1a', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
    summary: { marginVertical: 20, borderTopWidth: 1, borderColor: '#333', paddingTop: 10 },
    totalText: { color: '#4CAF50', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
    button: { backgroundColor: '#4CAF50', padding: 18, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
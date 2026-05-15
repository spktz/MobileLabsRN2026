import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cart/cartSlice';
import { useRouter } from 'expo-router';

export default function ProductsScreen() {
    const products = useSelector((state) => state.products.items);
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const router = useRouter();

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const renderProduct = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
            <Text style={styles.price}>{item.price} грн</Text>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    dispatch(addToCart(item));
                    Alert.alert("Успіх", `${item.name} додано до кошика!`);
                }}
            >
                <Text style={styles.buttonText}>Додати до кошика</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProduct}
                contentContainerStyle={{ padding: 15 }}
            />

            <TouchableOpacity
                style={[styles.cartFloatingButton, { bottom: 90, backgroundColor: '#333' }]}
                onPress={() => router.push('/history')}
            >
                <Text style={styles.buttonText}>Історія</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cartFloatingButton}
                onPress={() => router.push('/cart')}
            >
                <Text style={styles.buttonText}>Кошик ({cartCount})</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    card: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 10, marginBottom: 20 },
    image: { width: '100%', height: 150, borderRadius: 8, marginBottom: 10 },
    name: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    desc: { color: '#aaa', fontSize: 14, marginVertical: 5 },
    price: { color: '#4CAF50', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    addButton: { backgroundColor: '#333', padding: 12, borderRadius: 5, alignItems: 'center' },
    cartFloatingButton: {
        position: 'absolute', bottom: 20, right: 20,
        backgroundColor: '#007AFF', padding: 15, borderRadius: 30, elevation: 5
    },
    buttonText: { color: '#fff', fontWeight: 'bold' }
});
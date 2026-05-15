import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/cart/cartSlice';
import { useRouter } from 'expo-router';

export default function CartScreen() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const router = useRouter();

    const totalSum = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price * item.quantity} грн</Text>
            </View>

            <View style={styles.quantityControls}>
                <TouchableOpacity
                    onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    style={styles.qBtn}
                >
                    <Text style={styles.text}>-</Text>
                </TouchableOpacity>

                <Text style={[styles.text, { marginHorizontal: 10 }]}>{item.quantity}</Text>

                <TouchableOpacity
                    onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    style={styles.qBtn}
                >
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
                <Text style={{ color: 'red', marginLeft: 15 }}>Видалити</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.empty}>Кошик порожній</Text>}
            />

            {cartItems.length > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.totalText}>Загалом: {totalSum} грн</Text>
                    <TouchableOpacity
                        style={styles.orderButton}
                        onPress={() => router.push('/order')}
                    >
                        <Text style={styles.orderButtonText}>Оформити замовлення</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212', padding: 15 },
    cartItem: { flexDirection: 'row', backgroundColor: '#1a1a1a', padding: 15, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
    name: { color: '#fff', fontSize: 16 },
    price: { color: '#4CAF50', fontWeight: 'bold' },
    quantityControls: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', borderRadius: 5, padding: 5 },
    text: { color: '#fff', fontSize: 18 },
    qBtn: { width: 30, alignItems: 'center' },
    footer: { borderTopWidth: 1, borderColor: '#333', paddingTop: 20, paddingBottom: 20 },
    totalText: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginBottom: 15 },
    orderButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center' },
    orderButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    empty: { color: '#aaa', textAlign: 'center', marginTop: 50 }
});
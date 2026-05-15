import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function HistoryScreen() {
    const history = useSelector((state) => state.orders.history);

    const renderOrder = ({ item }) => (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.orderId}>ID: {item.id.slice(-6)}</Text>
            </View>

            <View style={styles.itemsList}>
                {item.items.map((prod, index) => (
                    <Text key={index} style={styles.productText}>
                        • {prod.name} (x{prod.quantity}) — {prod.price * prod.quantity} грн
                    </Text>
                ))}
            </View>

            <View style={styles.footer}>
                <Text style={styles.totalLabel}>Сума замовлення:</Text>
                <Text style={styles.totalValue}>{item.total} грн</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={[...history].reverse()}
                keyExtractor={(item) => item.id}
                renderItem={renderOrder}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Ще нічого не замовлено</Text>
                }
                contentContainerStyle={{ padding: 15 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    orderCard: {
        backgroundColor: '#1a1a1a',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#333'
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingBottom: 10,
        marginBottom: 10
    },
    date: { color: '#fff', fontWeight: 'bold' },
    orderId: { color: '#666', fontSize: 12 },
    itemsList: { marginBottom: 10 },
    productText: { color: '#aaa', fontSize: 14, marginVertical: 2 },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#333'
    },
    totalLabel: { color: '#888', fontSize: 14 },
    totalValue: { color: '#4CAF50', fontSize: 18, fontWeight: 'bold' },
    emptyText: { color: '#555', textAlign: 'center', marginTop: 50, fontSize: 16 }
});
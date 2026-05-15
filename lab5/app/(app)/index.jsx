import { View, Text, FlatList, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../data/products';

export default function CatalogScreen() {
    const { logout } = useAuth();

    const renderItem = ({ item }) => (
        <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={PRODUCTS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />

            <View style={styles.footer}>
                <Button title="Вийти з акаунту" onPress={logout} color="red" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    list: { padding: 15 },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 10,
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    image: { width: 100, height: 100 },
    info: { padding: 10, justifyContent: 'center' },
    name: { fontSize: 16, fontWeight: 'bold' },
    price: { fontSize: 14, color: '#888', marginTop: 5 },
    footer: { padding: 20, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' }
});
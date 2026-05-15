import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { PRODUCTS } from '../../../data/products';

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const product = PRODUCTS.find((p) => p.id === id);

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Товар не знайдено!</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />

            <Image source={{ uri: product.image }} style={styles.image} />

            <View style={styles.infoContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{product.price}</Text>
                <View style={styles.divider} />
                <Text style={styles.descriptionTitle}>Опис:</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    image: { width: '100%', height: 300, resizeMode: 'cover' },
    infoContainer: { padding: 20 },
    name: { fontSize: 24, fontWeight: 'bold' },
    price: { fontSize: 20, color: '#2196F3', marginVertical: 10, fontWeight: '600' },
    divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
    descriptionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    description: { fontSize: 16, color: '#444', lineHeight: 24 },
});
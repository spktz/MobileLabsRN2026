import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/index';
import { ActivityIndicator, View } from 'react-native';

function CustomLoader() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
}

export default function Layout() {
    return (
        <Provider store={store}>
            <PersistGate loading={<CustomLoader />} persistor={persistor}>
                <Stack
                    screenOptions={{
                        headerStyle: { backgroundColor: '#1a1a1a' },
                        headerTintColor: '#fff',
                        headerTitleStyle: { fontWeight: 'bold' },
                    }}
                >
                    <Stack.Screen name="index" options={{ title: 'Магазин інструментів' }} />
                    <Stack.Screen name="cart" options={{ title: 'Мій Кошик' }} />
                    <Stack.Screen name="order" options={{ title: 'Оформлення' }} />
                    <Stack.Screen name="history" options={{ title: 'Історія замовлень' }} />
                </Stack>
            </PersistGate>
        </Provider>
    );
}
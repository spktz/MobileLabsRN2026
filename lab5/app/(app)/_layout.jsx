import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated)
    {
        return <Redirect href="/login" />;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Магазин інструментів' }} />
            <Stack.Screen name="details/[id]" options={{ title: 'Про товар' }} />
        </Stack>
    );
}
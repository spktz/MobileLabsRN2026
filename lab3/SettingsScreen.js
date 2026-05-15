import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function SettingsScreen({ isDark, setIsDark }) {
    return (
        <View style={[styles.container, isDark && styles.darkBg]}>
            <View style={[styles.box, isDark && styles.darkBox]}>
                <Image source={require('./assets/settings.png')} style={styles.icon} />
                <Text style={[styles.title, isDark && styles.lightText]}>Налаштування теми</Text>

                <TouchableOpacity
                    style={styles.toggleBtn}
                    onPress={() => setIsDark(!isDark)}
                >
                    <Text style={styles.btnText}>
                        {isDark ? "СВІТЛА ТЕМА" : "ТЕМНА ТЕМА"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF9F2', justifyContent: 'center', padding: 30 },
    darkBg: { backgroundColor: '#121212' },
    box: { backgroundColor: '#FFF', padding: 30, borderRadius: 20, alignItems: 'center', elevation: 5 },
    darkBox: { backgroundColor: '#1E1E1E' },
    icon: { width: 60, height: 60, tintColor: '#FF8C00', marginBottom: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
    lightText: { color: '#FFF' },
    toggleBtn: { backgroundColor: '#FF8C00', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
    btnText: { color: '#FFF', fontWeight: 'bold' }
});
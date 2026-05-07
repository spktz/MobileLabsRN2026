import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from './scr/Home';
import GalleryScreen from './scr/Gallery';
import ProfileScreen from './scr/Profile';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.header}>
          <Image
              source={require('./assets/logo.png')}
              style={styles.logo}
          />
          <Text style={styles.headerTitle}>FirstMobileApp</Text>
        </View>

        <NavigationContainer>
          <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                  let iconName;
                  if (route.name === 'Головна') iconName = 'home';
                  else if (route.name === 'Фотогалерея') iconName = 'images';
                  else if (route.name === 'Профіль') iconName = 'person';
                  return <Ionicons name={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: { fontSize: 10, textTransform: 'none' },
                tabBarShowIcon: true,
              })}
          >
            <Tab.Screen name="Головна" component={HomeScreen} />
            <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
            <Tab.Screen name="Профіль" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Мидловець Роман Сергійович, ІПЗ-24-3</Text>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: { width: 70, height: 70, resizeMode: 'contain' },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  footer: {
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  footerText: { fontStyle: 'italic', color: 'gray' },
});

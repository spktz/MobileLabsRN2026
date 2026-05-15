import React, { useState } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import GameScreen from './GameScreen';
import TasksScreen from './TasksScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    const [score, setScore] = useState(0);
    const [isDark, setIsDark] = useState(false);
    const [tasks, setTasks] = useState({ taps: 0, doubleTaps: 0, longPress: false });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        headerShown: true,
                        tabBarActiveTintColor: '#FF8C00',
                        tabBarInactiveTintColor: 'gray',
                        tabBarStyle: { backgroundColor: isDark ? '#1E1E1E' : '#FFF' },
                        headerStyle: { backgroundColor: isDark ? '#121212' : '#FFF' },
                        headerTitleStyle: { color: isDark ? '#FFF' : '#000' },
                        tabBarIcon: ({ focused, size }) => {
                            let iconPath;
                            if (route.name === 'Клікер') iconPath = require('./assets/finger.png');
                            else if (route.name === 'Завдання') iconPath = require('./assets/tasks.png');
                            else if (route.name === 'Опції') iconPath = require('./assets/settings.png');

                            return (
                                <Image
                                    source={iconPath}
                                    style={{ width: size, height: size, tintColor: focused ? '#FF8C00' : 'gray' }}
                                />
                            );
                        },
                    })}
                >
                    <Tab.Screen name="Клікер">
                        {() => <GameScreen score={score} setScore={setScore} tasks={tasks} setTasks={setTasks} isDark={isDark} />}
                    </Tab.Screen>
                    <Tab.Screen name="Завдання">
                        {() => <TasksScreen score={score} tasks={tasks} isDark={isDark} />}
                    </Tab.Screen>
                    <Tab.Screen name="Опції">
                        {() => <SettingsScreen isDark={isDark} setIsDark={setIsDark} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
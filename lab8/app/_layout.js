import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import Constants from 'expo-constants';

export default function RootLayout() {
    useEffect(() => {
        const oneSignalAppId = Constants.expoConfig?.extra?.oneSignalAppId;

        if (!oneSignalAppId) {
            console.error("OneSignal App ID не знайдено!");
            return;
        }

        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize(oneSignalAppId);
        OneSignal.Notifications.requestPermission(true);

        const foregroundListener = (event) => {
            console.log("Сповіщення у foreground:", event);
            event.preventDefault();
            event.notification.display();
        };

        OneSignal.Notifications.addEventListener('foregroundWillDisplay', foregroundListener);

        return () => {
            OneSignal.Notifications.removeEventListener('foregroundWillDisplay', foregroundListener);
        };
    }, []);

    return (
        <Stack screenOptions={{
            title: 'To-Do Reminder',
            headerStyle: { backgroundColor: '#f8f8f8' },
        }} />
    );
}
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import {TapGestureHandler, LongPressGestureHandler, PanGestureHandler, PinchGestureHandler, FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';

export default function GameScreen({ score, setScore, setTasks, isDark }) {
    const panRef = useRef();
    const pinchRef = useRef();
    const doubleTapRef = useRef();

    const [translateX] = useState(new Animated.Value(0));
    const [translateY] = useState(new Animated.Value(0));
    const [scale] = useState(new Animated.Value(1));

    const handleAction = (points, type) => {
        setScore(prev => prev + points);
        setTasks(p => {
            let newTasks = { ...p };
            if (type === 'tap') newTasks.taps += 1;
            if (type === 'double') newTasks.doubleTaps += 1;
            if (type === 'long') newTasks.longPress = true;
            if (type === 'pan') newTasks.moved = true;
            if (type === 'swipeRight') newTasks.swipeRight = true;
            if (type === 'swipeLeft') newTasks.swipeLeft = true;
            if (type === 'pinch') newTasks.resized = true;
            return newTasks;
        });
    };

    return (
        <View style={[styles.container, isDark && styles.darkBg]}>
            <View style={styles.scoreContainer}>
                <Text style={[styles.label, isDark && styles.lightText]}>SCORE</Text>
                <Text style={styles.scoreValue}>{score}</Text>
            </View>

            <PinchGestureHandler
                ref={pinchRef}
                simultaneousHandlers={panRef}
                onGestureEvent={Animated.event([{ nativeEvent: { scale: scale } }], { useNativeDriver: false })}
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.ACTIVE) {
                        handleAction(3, 'pinch');
                    }
                }}>
                <Animated.View>
                    <PanGestureHandler
                        ref={panRef}
                        simultaneousHandlers={pinchRef}
                        onGestureEvent={Animated.event(
                            [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
                            { useNativeDriver: false }
                        )}
                        onHandlerStateChange={({ nativeEvent }) => {
                            if (nativeEvent.state === State.END) {
                                handleAction(0, 'pan');
                            }
                        }}>
                        <Animated.View>
                            <FlingGestureHandler
                                direction={Directions.RIGHT}
                                onHandlerStateChange={({ nativeEvent }) => {
                                    if (nativeEvent.state === State.ACTIVE) handleAction(5, 'swipeRight');
                                }}>
                                <Animated.View>
                                    <LongPressGestureHandler
                                        minDurationMs={2000}
                                        onHandlerStateChange={({ nativeEvent }) => {
                                            if (nativeEvent.state === State.ACTIVE) handleAction(15, 'long');
                                        }}>
                                        <Animated.View>
                                            <TapGestureHandler
                                                ref={doubleTapRef}
                                                numberOfTaps={2}
                                                maxDelayMs={300}
                                                onHandlerStateChange={({ nativeEvent }) => {
                                                    if (nativeEvent.state === State.ACTIVE) handleAction(10, 'double');
                                                }}>
                                                <Animated.View>
                                                    <TapGestureHandler
                                                        waitFor={doubleTapRef}
                                                        onHandlerStateChange={({ nativeEvent }) => {
                                                            if (nativeEvent.state === State.ACTIVE) handleAction(1, 'tap');
                                                        }}>
                                                        <Animated.View style={[
                                                            styles.clickArea,
                                                            { transform: [{ translateX }, { translateY }, { scale }] }
                                                        ]}>
                                                            <Image source={require('./assets/finger.png')} style={styles.btnIcon} />
                                                        </Animated.View>
                                                    </TapGestureHandler>
                                                </Animated.View>
                                            </TapGestureHandler>
                                        </Animated.View>
                                    </LongPressGestureHandler>
                                </Animated.View>
                            </FlingGestureHandler>
                        </Animated.View>
                    </PanGestureHandler>
                </Animated.View>
            </PinchGestureHandler>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF9F2', alignItems: 'center', justifyContent: 'center' },
    darkBg: { backgroundColor: '#121212' },
    scoreContainer: { alignItems: 'center', position: 'absolute', top: 50 },
    label: { fontSize: 14, color: '#FF8C00', fontWeight: 'bold', letterSpacing: 2 },
    scoreValue: { fontSize: 60, fontWeight: '900', color: '#FF8C00' },
    lightText: { color: '#FFF' },
    clickArea: {
        width: 140, height: 140, borderRadius: 70,
        backgroundColor: '#FFA500', justifyContent: 'center', alignItems: 'center',
        borderWidth: 5, borderColor: '#FFD700', elevation: 10,
    },
    btnIcon: { width: 60, height: 60, tintColor: '#FFF' },
    hint: { position: 'absolute', bottom: 40, color: '#888', fontSize: 12 }
});
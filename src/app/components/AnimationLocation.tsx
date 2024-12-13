import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface PulseEffectProps {
    color?: string;
    size?: number;
}

const PulseEffect = ({ color = 'rgba(0, 122, 255, 0.5)', size = 100 }: PulseEffectProps) => {
    const scale = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulseAnimation = Animated.loop(
            Animated.parallel([
                Animated.timing(scale, {
                    toValue: 2,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ]),
        );
        pulseAnimation.start();
    }, [scale, opacity]);

    return (
        <Animated.View
            style={[
                styles.pulse,
                {
                    backgroundColor: color,
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    opacity,
                    transform: [{ scale }],
                },
            ]}
        >
        </Animated.View>
    );
};

export default PulseEffect;

const styles = StyleSheet.create({
    pulse: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
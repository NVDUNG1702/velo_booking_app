import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface ItemSwitchMenuProps {
    icon: React.ReactNode;
    label: string;
    value: boolean;
    onToggle: () => void;
    backgroundColor?: string;
    textColor?: string;
    bgIcon?: string;
}

export default function ItemSwitchMenuProfile({
    icon,
    label,
    value,
    onToggle,
    backgroundColor = 'white',
    textColor = 'black',
    bgIcon
}: ItemSwitchMenuProps) {

    const styleSliding = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withTiming(value ? 20 : 0) }]
        }
    })

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.containerLabel}>
                <View style={[styles.containerIcon, { backgroundColor: bgIcon }]}>{icon}</View>
                <Text style={[styles.label, { color: textColor }]}>{label}</Text>
            </View>
            <Pressable
                style={[styles.switchContainer, { backgroundColor: textColor }]}
                onPress={onToggle}
            >
                <Animated.View
                    style={[
                        styles.sliding,
                        styleSliding,
                        { backgroundColor: value ? 'black' : '#8f8f8f' }
                    ]}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 70,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    containerIcon: {
        width: 30,
        height: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 20
    },
    containerLabel: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    switchContainer: {
        width: 40,
        height: 20,
        borderRadius: 50,
        justifyContent: 'center',
        padding: 1
    },
    sliding: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 25
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});
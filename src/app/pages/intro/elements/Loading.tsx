import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme'
import LottieView from 'lottie-react-native';
import LoadingAnimation from '../../../assets/Animation - 1731666331756.json';

export default function Loading() {
    const { skyBlue, deepSeaBlue, backgroundStyle, toggleColorMode } = useModeColor();
    return (
        <View style={[styles.container, backgroundStyle]}>
            <Text
                style={[{ color: skyBlue }, styles.text]}
                onPress={toggleColorMode}
            >
                VELO {' '}
                <Text
                    style={{ color: deepSeaBlue }}
                >
                    BOOKING
                </Text>
            </Text>
            <LottieView
                source={LoadingAnimation}
                style={[styles.animation]}
                autoPlay
                loop
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 34,
        fontWeight: '600'
    },
    animation: {
        width: '100%',
        height: '15%'
    }
})
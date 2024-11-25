import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { useModeColor } from '../hooks/ColorMode/UseModeTheme'
import { SIZES } from '../constans/size';

interface ButtonProps {
    label: string,
    marginT?: number;
    marginB?: number;
    onPress?: () => void;
    disabled?: boolean;
}

export default memo(function ButtonComponent({ label, marginB = 30, marginT = 30, onPress, disabled = false }: ButtonProps) {
    const { skyBlue, isDarkMode, skyBlueDisabled } = useModeColor();

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => {
                return [
                    { width: '90%', height: 50, marginTop: marginT, marginBottom: marginB },
                    pressed && styles.pressedStyle
                ]
            }}
            onPress={onPress}
        >
            <View style={[styles.container, { backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0)' : disabled ? skyBlueDisabled : skyBlue, borderColor: disabled ? skyBlueDisabled : skyBlue }]}>
                <Text style={[styles.label, { color: !isDarkMode ? 'white' : disabled ? skyBlueDisabled : skyBlue }]}>{label}</Text>
            </View >
        </Pressable>

    )
}
);


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderWidth: 1,
    },
    label: {
        fontSize: SIZES.h1,
        fontWeight: '500'
    },
    pressedStyle: {
        transform: [{ scale: 0.98 }],
        opacity: 0.5
    }
})
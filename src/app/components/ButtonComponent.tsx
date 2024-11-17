import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useModeColor } from '../hooks/ColorMode/UseModeTheme'
import { SIZES } from '../constans/size';

interface ButtonProps {
    label: string,
    marginT?: number;
    marginB?: number;
    onPress?: () => void;
}

export default function ButtonComponent({ label, marginB, marginT, onPress }: ButtonProps) {
    const { skyBlue, isDarkMode } = useModeColor();

    return (
        <TouchableOpacity style={{ width: '90%', height: 50, marginTop: marginT || 30, marginBottom: marginB || 30 }}>
            <View style={[styles.container, { backgroundColor: isDarkMode ? '' : skyBlue, borderColor: skyBlue }]}>
                <Text style={[styles.label, { color: isDarkMode ? skyBlue : 'white' }]}>{label}</Text>
            </View >
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderWidth: 1,
        marginVertical: 30
    },
    label: {
        fontSize: SIZES.h1,
        fontWeight: '500'
    }
})
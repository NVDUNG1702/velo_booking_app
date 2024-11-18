import { Text, View } from 'react-native'
import React from 'react'
import { useModeColor } from '../hooks/ColorMode/UseModeTheme'

interface ToastItemProps {
    text1?: string,
    text2?: string,
    type?: string
}

export default function ToastItemComponent({ text1, text2, type }: ToastItemProps) {
    const { isDarkMode, textLight } = useModeColor();
    const borderColor = type === 'error' ? '#ff471a' : type === 'success' ? '#00b300' : '#0099ff'
    return (
        <View style={{ width: '90%', padding: 10, borderRadius: 6, borderStartWidth: 4, borderColor: borderColor, backgroundColor: isDarkMode ? '#404040' : '#e6e6e6' }}>
            <Text style={{ color: textLight, fontWeight: '600' }}>{text1}</Text>
            <Text style={{ color: textLight }}>{text2}</Text>
        </View>
    )
}

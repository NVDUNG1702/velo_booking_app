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
        <View style={{ width: '90%', minHeight: 60, padding: 10, borderRadius: 6, borderStartWidth: 4, borderColor: borderColor, backgroundColor: isDarkMode ? '#rgba(64, 64, 64, 0.5)' : 'rgba(230, 230, 230, 0.5)', position: 'relative', top: 10, zIndex: 99 }}>
            <View style={{ width: '100%', height: '100%' }}>
                <Text style={{ color: textLight, fontWeight: '600' }}>{text1}</Text>
                <Text style={{ color: textLight }}>{text2}</Text>
            </View>
        </View>
    )
}

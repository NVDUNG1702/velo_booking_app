import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface BoxStatusProps {
    color?: string;
    label?: string;
}

export default function BoxStatus({ label, color }: BoxStatusProps) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
            <View style={{ width: 50, height: 20, backgroundColor: color, marginEnd: 5 }}>

            </View>
            <Text style={{ color: 'white', fontWeight: '500' }}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
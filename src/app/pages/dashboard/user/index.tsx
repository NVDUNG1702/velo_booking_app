import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { BottomPraramList } from '../../../navigations/BottomTabNavigation'
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme'

interface UserProps {
    navigation: BottomTabNavigationProp<BottomPraramList, 'user'>
}

export default function User({ navigation }: UserProps) {
    const { backgroundStyle } = useModeColor();

    return (
        <View style={[backgroundStyle, styles.container]}>
            <Text>User</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
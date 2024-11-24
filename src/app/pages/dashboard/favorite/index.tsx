import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { BottomPraramList } from '../../../navigations/BottomTabNavigation'
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme'

interface FavoriteProps {
    navigation: BottomTabNavigationProp<BottomPraramList, 'favorite'>
}

export default function Favorite({ navigation }: FavoriteProps) {
    const { backgroundStyle } = useModeColor();

    return (
        <View style={[backgroundStyle, styles.container]}>
            <Text>index</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { BottomPraramList } from '../../../navigations/BottomTabNavigation'
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme'

interface HomeProps {
    navigation: BottomTabNavigationProp<BottomPraramList, 'home'>
}

export default function Home({ navigation }: HomeProps) {
    const { backgroundStyle } = useModeColor();

    return (
        <View style={[styles.container, backgroundStyle]}>
            <Text>index</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
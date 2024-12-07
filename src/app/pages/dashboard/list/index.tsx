import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomPraramList } from '../../../navigations/BottomTabNavigation'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme'

interface ListProps {
    navigation: BottomTabNavigationProp<BottomPraramList, 'list'>
}

export default function List({ navigation }: ListProps) {
    const { backgroundStyle } = useModeColor();
    return (
        <View style={[backgroundStyle, styles.container]}>
            <Text style={{fontWeight: '400'}}>index</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
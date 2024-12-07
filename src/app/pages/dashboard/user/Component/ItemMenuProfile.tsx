import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { BottomPraramList } from '../../../../navigations/BottomTabNavigation'
import DarkModeIcon from '../../../../assets/IconComponents/DarkModeIcon'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useModeColor } from '../../../../hooks/ColorMode/UseModeTheme'

interface ItemSwitchMenuProfileProps {
    navigation?: BottomTabNavigationProp<BottomPraramList, 'user'>
}

export default function ItemSwitchMenuProfile({ navigation }: ItemSwitchMenuProfileProps) {
    const { isDarkMode, toggleColorMode, textLight } = useModeColor();

    const styleSliding = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withTiming(isDarkMode ? 20 : 0) }]
        }
    })

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
            <View style={[styles.containerLabel]}>
                <View style={[styles.containerIcon]}>
                    <DarkModeIcon color='white' />
                </View>
                <View>
                    <Text style={{ color: textLight }}>Dark Mode</Text>
                </View>
            </View>
            <Pressable style={[styles.switchContainer, { backgroundColor: textLight }]}
                onPress={toggleColorMode}
            >
                <Animated.View style={[styles.sliding, styleSliding, { backgroundColor: isDarkMode ? 'black' : '#8f8f8f'}]}></Animated.View>
        </Pressable>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 70,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    containerIcon: {
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 20
    },
    containerLabel: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    switchContainer: {
        width: 40,
        height: 20,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        padding: 1
    },
    sliding: {
        height: '100%',
        aspectRatio: '1/1',
        backgroundColor: 'white',
        borderRadius: 25
    }
})
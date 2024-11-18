import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { useModeColor } from '../hooks/ColorMode/UseModeTheme'
import ArrowLeftIcon from '../assets/IconComponents/ArrowLeftIcon';
import { SIZES } from '../constans/size';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamListLogin } from '../navigations/LoginNavigation';




interface PropsHeaderComponent {
    title?: string,
    showButtonLeft?: boolean,
    navigation: StackNavigationProp<any>,
    iconRight?: JSX.Element,
    handleClickIconRight?: () => void
}

export default memo(function HeaderComponent({ title = '', showButtonLeft = true, navigation, iconRight, handleClickIconRight }: PropsHeaderComponent) {
    const { textLight } = useModeColor();

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <View style={[styles.container]}>
            <View style={[styles.buttonContainer]}>
                {
                    showButtonLeft && (
                        <TouchableOpacity onPress={handleGoBack}>
                            <ArrowLeftIcon />
                        </TouchableOpacity>
                    )
                }
            </View>
            <View style={[styles.labelContainer]}>
                <Text style={[{ color: textLight }, styles.title]}>{title}</Text>
            </View>
            <View style={[styles.buttonContainer]}>
                <TouchableOpacity onPress={handleClickIconRight || function () { }}>
                    {iconRight}
                </TouchableOpacity>
            </View>
        </View>
    )
}
)
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '5%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    buttonContainer: {
        width: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    labelContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center'
    },
    title: {
        fontSize: SIZES.h1,
        fontWeight: '500',
        textAlign: 'center'
    }
})
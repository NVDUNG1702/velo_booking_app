import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IconLeft from '../svg/user.svg';
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../constans/size';

interface PropIcon {
    size?: number,
    color?: string,
}

export default function UserIcon({ size = SIZES.icon25, color }: PropIcon) {
    const { textLight } = useModeColor();
    return <IconLeft stroke={color || textLight} width={size} height={size} />
}

const styles = StyleSheet.create({})
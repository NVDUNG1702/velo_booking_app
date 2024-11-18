import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IconPhone from '../svg/phone.svg';
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../constans/size';

interface PropIcon {
    size?: number,
    color?: string,
}

export default function PhoneIcon({ size = SIZES.icon25, color }: PropIcon) {
    const { textLight } = useModeColor();
    return <IconPhone stroke={color || textLight} width={size} height={size} />
}

const styles = StyleSheet.create({})
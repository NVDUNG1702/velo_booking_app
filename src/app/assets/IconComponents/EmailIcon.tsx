import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../constans/size';
import Email from '../svg/mail.svg'
interface PropIcon {
    size?: number,
    color?: string,
}

export default function EmailIcon({ size = SIZES.icon25, color }: PropIcon) {
    const { textLight } = useModeColor();
    return <Email stroke={color || textLight} width={size} height={size} />
}

const styles = StyleSheet.create({})
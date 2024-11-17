import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IconLock from '../svg/lock.svg';
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../constans/size';

interface PropIcon {
    size?: number,
    color?: string,
}

export default function LockIcon({ size = SIZES.icon25, color }: PropIcon) {
    const { textLight } = useModeColor();
    return <IconLock stroke={color || textLight} width={size} height={size} />
}

const styles = StyleSheet.create({})
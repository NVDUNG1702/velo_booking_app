import { StyleSheet } from 'react-native'
import React from 'react'
import Info from '../svg/info.svg';
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../constans/size';

interface PropIcon {
    size?: number,
    color?: string,
}

export default function InfoIcon({ size = SIZES.icon25, color }: PropIcon) {
    const { textLight } = useModeColor();
    return <Info stroke={color || textLight} width={size} height={size} />
}

const styles = StyleSheet.create({})
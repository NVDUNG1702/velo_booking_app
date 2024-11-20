import { StyleSheet } from 'react-native'
import React from 'react'
import Icon from '../svg/arrow-long-left.svg';
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../constans/size';

interface PropIcon {
    size?: number,
    color?: string,
}

export default function ArrowLongLeft({ size = SIZES.icon25, color }: PropIcon) {
    const { textLight } = useModeColor();
    return <Icon stroke={color || textLight} width={size} height={size} />
}

const styles = StyleSheet.create({})
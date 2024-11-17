import React, { memo } from 'react'
import IconLeft from '../svg/arrow-left.svg';
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../constans/size';

interface PropIcon {
    size?: number,
    color?: string,
}

export default memo(function ArrowLeftIcon({ size = SIZES.icon25, color }: PropIcon) {
    const { textLight } = useModeColor();
    return (
        <IconLeft fill={color || textLight} width={size} height={size} />
    )
});

import React from 'react';
import IconEye from '../svg/eye.svg';
import IconEyeHid from '../svg/eye_off.svg';
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../constans/size';

interface EyeIconProps {
    status: boolean;
    size?: number;
    errorStatus?: string;
    color?: string;
}

export default function EyeHidIcon({ status, size = SIZES.icon25, errorStatus, color }: EyeIconProps) {
    const { textLight, error } = useModeColor();

    return status ? <IconEye fill={color ? color : textLight} width={size} height={size} /> : <IconEyeHid fill={color ? color : textLight} width={size} height={size} />
}

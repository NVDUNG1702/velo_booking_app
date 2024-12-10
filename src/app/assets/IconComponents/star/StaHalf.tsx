import Icon from '../../svg/star-half.svg';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../../constans/size';

interface PropIcon {
    size?: number,
    color?: string,
}

export default function StarHalfIcon({ size = SIZES.icon25, color }: PropIcon) {
    const { textLight } = useModeColor();
    return <Icon fill={color || textLight} width={size} height={size} />
}

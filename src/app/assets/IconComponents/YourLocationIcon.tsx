import Icon from '../svg/your-location.svg';
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../constans/size';

interface PropIcon {
    size?: number,
    color?: string,
}

export default function YourLocationIcon({ size = SIZES.icon25, color }: PropIcon) {
    const { textLight } = useModeColor();
    return (
        <Icon width={size} height={size} stroke={color || textLight} />
    )
}
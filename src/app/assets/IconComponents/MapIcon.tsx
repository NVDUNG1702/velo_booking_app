import Icon from '../svg/BottomTab/map.svg';
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../constans/size';

interface PropIcon {
    size?: number,
    color?: string,
}

export default function MaptIcon({ size = SIZES.icon25, color }: PropIcon) {
    const { textLight } = useModeColor();
    return <Icon fill={color || textLight} width={size} height={size} />
}

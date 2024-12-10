import Icon from '../../svg/star-filled.svg';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../../constans/size';

interface PropIcon {
    size?: number,
    color?: string,
}

export default function StarFullIcon({ size = SIZES.icon25, color }: PropIcon) {
    const { textLight } = useModeColor();
    return <Icon fill={color || textLight} width={size} height={size} />
}

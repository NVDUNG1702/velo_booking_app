import Icon from '../svg/moon.svg';
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../constans/size';

interface PropIcon {
    size?: number,
    color?: string,
}

export default function DarkModeIcon({ size = SIZES.icon25, color }: PropIcon) {
    const { isDarkMode } = useModeColor();
    return <Icon fill={color || isDarkMode ? '#ffff' : "#363853"} width={size} height={size} />
}

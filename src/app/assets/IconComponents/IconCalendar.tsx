import Icon from '../svg/calendar.svg';
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';
import { SIZES } from '../../constans/size';
import { COLORS } from '../../constans/color';

interface PropIcon {
    size?: number,
    color?: string,
}

export default function CalendarIcon({ size = SIZES.icon25, color }: PropIcon) {
    const { textLight, isDarkMode } = useModeColor();
    return <Icon stroke={color || textLight} width={size} height={size} fill={isDarkMode ? COLORS.black : COLORS.white} />
}

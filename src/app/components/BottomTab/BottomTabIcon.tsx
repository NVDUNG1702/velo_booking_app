import React from 'react'
import HomeIcon from '../../assets/svg/BottomTab/home.svg'
import HeartIcon from '../../assets/svg/BottomTab/heart.svg'
import UserIcon from '../../assets/svg/BottomTab/user.svg'
import ListIcon from '../../assets/svg/BottomTab/list.svg'
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme'
import MaptIcon from '../../assets/IconComponents/MapIcon'

interface BottomIconProps {
    route: string,
    focused: boolean
}

export default function BottomTabIcon({ route, focused }: BottomIconProps) {
    const { skyBlue } = useModeColor();
    const sizeIcon = 34;
    const colorFocused = skyBlue
    const colorFocusedNull = '#888888';

    const RenderIcon = () => {
        switch (route) {
            case "home":
                return <HomeIcon width={sizeIcon} height={sizeIcon} fill={focused ? colorFocused : colorFocusedNull} />
                break;
            case "favorite":
                return <HeartIcon width={sizeIcon} height={sizeIcon} fill={focused ? colorFocused : colorFocusedNull} />
                break;
            case "list":
                return <ListIcon width={sizeIcon} height={sizeIcon} stroke={focused ? colorFocused : colorFocusedNull} fill={focused ? colorFocused : colorFocusedNull} />
                break;
            case "user":
                return <UserIcon width={sizeIcon} height={sizeIcon} fill={focused ? colorFocused : colorFocusedNull} />
                break;
            case "map":
                return <MaptIcon size={sizeIcon} color={focused ? colorFocused : colorFocusedNull} />
                break;
            default:
                break;
        }
    }

    return (
        <RenderIcon />
    )
}


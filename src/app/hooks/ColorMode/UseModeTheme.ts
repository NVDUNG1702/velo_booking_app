import { useEffect, useState } from "react"
import { getDataStorage, setDataStorage } from "../../untils/localStorage";
import { DARK_MODE, LIGHT_MODE, MODE_COLOR } from "../../constans";
import { modeThemeStore } from "../../../stores/zustandStore";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const useModeColor = () => {
    const { isMode, setIsMode, initializeMode } = modeThemeStore();
    const isDarkMode = isMode === DARK_MODE;
    const toggleColorMode = () => {
        setIsMode();
    }

    const blackColor = 'black';
    const whiteColor = 'white';
    const error = '#ff6666';

    const skyBlue = '#46BEF1';
    const skyBlueDisabled = '#d0eefb'
    const deepSeaBlue = "#225971";
    const darkGrayLight = isDarkMode ? '#bfbfbf' : '#737373';

    const bg = isDarkMode ? blackColor : whiteColor;
    const textLight = isDarkMode ? whiteColor : blackColor;
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    };

    return {
        isMode,
        toggleColorMode,
        bg,
        isDarkMode,
        skyBlue,
        deepSeaBlue,
        textLight,
        backgroundStyle,
        error,
        darkGrayLight,
        skyBlueDisabled
    }
}
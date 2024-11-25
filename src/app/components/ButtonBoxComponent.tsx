import { Pressable, StyleSheet, Text } from 'react-native'
import React, { memo, useState } from 'react'
import { useModeColor } from '../hooks/ColorMode/UseModeTheme';
import Svg, { Path } from 'react-native-svg';
import { SIZES } from '../constans/size';

interface ButtonProps {
    width?: number,
    height?: number,
    fill?: string,
    border?: string,
    onClick?: () => void,
    marginTop?: number,
    marginBottom?: number,
    label?: string
}


export default memo(function ButtonBoxCustomer({ width, height, fill, border, onClick, marginTop = 10, marginBottom = 10, label = 'Click Me' }: ButtonProps) {
    const { skyBlue, skyBlueDisabled } = useModeColor();
    const [isPressed, setIsPressed] = useState(false);
    return (
        <Pressable
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={({ pressed }) => {
                return [
                    { width: width || SIZES.W, height: height || 70, marginBottom: marginBottom, marginTop: marginTop },
                    styles.button,
                    pressed && styles.pressed, // Thay đổi style khi nhấn

                ]
            }}
            onPress={onClick}
        >
            <Svg style={{ position: 'absolute' }}
                width={"100%"} height={height || 70} viewBox="0 0 316 55" fill="none">
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.5667 0.961914C10.2336 0.961914 9.9142 1.09422 9.67869 1.32973L0.367819 10.6406C0.132309 10.8761 0 11.1955 0 11.5286V49.9387C0 52.7129 2.24899 54.9619 5.02326 54.9619H305.433C305.766 54.9619 306.086 54.8296 306.321 54.5941L315.632 45.2832C315.868 45.0477 316 44.7283 316 44.3952V5.98517C316 3.2109 313.751 0.961914 310.977 0.961914H10.5667ZM314.744 38.6363L299.674 53.7061H5.02326C2.94256 53.7061 1.25581 52.0194 1.25581 49.9387V17.2875L8.7907 9.75261L16.3256 2.21773C16.3256 2.21773 308.896 2.21773 310.977 2.21773C313.057 2.21773 314.744 3.90447 314.744 5.98517V38.6363Z" fill={border ? (isPressed ? fill : border) : isPressed ? skyBlue : skyBlueDisabled} />
                <Path d="M299.674 53.7061L314.744 38.6363V5.98517C314.744 3.90447 313.057 2.21773 310.977 2.21773H16.3256L8.7907 9.75261L1.25581 17.2875V49.9387C1.25581 52.0194 2.94256 53.7061 5.02326 53.7061H299.674Z" fill={fill ? (isPressed ? border : fill) : isPressed ? skyBlueDisabled : skyBlue} />
            </Svg>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    pressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.8,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
})
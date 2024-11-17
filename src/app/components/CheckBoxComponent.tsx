import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// import CheckIcon from '../assets/svg/check.svg'
import { SIZES } from '../constans/size';
import { useModeColor } from '../hooks/ColorMode/UseModeTheme';
import CheckIcon from '../assets/IconComponents/CheckIcon';
interface CheckBoxProps {
    checked: boolean;
    setCheck: (value: boolean) => void;
    size?: number
}

export default function CheckBoxComponent({ checked, setCheck, size = SIZES.icon25 }: CheckBoxProps) {
    const { darkGrayLight } = useModeColor();
    const handleSetCheck = () => {
        setCheck(!checked);
    };

    return (
        <TouchableOpacity onPress={handleSetCheck}>
            <View style={[styles.container, { width: size ? size + 2 : SIZES.icon25 + 2, height: size ? size + 2 : SIZES.icon25 + 2, borderColor: darkGrayLight }]}>
                {checked && <CheckIcon height={size} width={size} strokeColor={darkGrayLight} />}
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 4
    }
})
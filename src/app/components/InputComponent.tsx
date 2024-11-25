import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { useModeColor } from '../hooks/ColorMode/UseModeTheme'
import EyeHidIcon from '../assets/IconComponents/EyeHidIcon';

interface InputProps {
    placeholder?: string,
    Icon?: React.ComponentType<any>,
    type?: 'password' | 'numeric',
    value?: string,
    onChangeText?: (text: string) => void,
    onBlur?: () => void,
    errorMessage?: string,
    borderRadius?: number,
    borderWidth?: number,
}

export default memo(function InputComponent({ placeholder = 'Enter text', Icon, type, onChangeText, onBlur, errorMessage, borderRadius, borderWidth }: InputProps) {

    const { textLight, error, darkGrayLight } = useModeColor();

    const [showPass, setShowPass] = useState(false);

    const handleHidOrShowPass = () => {
        setShowPass(!showPass);
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.inputContainer, { borderColor: errorMessage ? error : darkGrayLight, borderRadius: borderRadius || 8, borderWidth: borderWidth || 1 }]}>
                {
                    Icon && (
                        <View>
                            {<Icon color={errorMessage ? error : darkGrayLight} />}
                        </View>
                    )
                }
                <TextInput onBlur={onBlur} onChangeText={onChangeText} secureTextEntry={showPass} placeholder={placeholder} placeholderTextColor={errorMessage ? error : darkGrayLight} style={[{ color: errorMessage ? error : textLight, width: type === 'password' ? '80%' : '90%' }]} />
                {
                    type === 'password' && (
                        <TouchableOpacity onPress={handleHidOrShowPass}>
                            <EyeHidIcon status={showPass} errorStatus={errorMessage} color={errorMessage ? error : darkGrayLight} />
                        </TouchableOpacity>
                    )
                }
            </View>
            <Text style={[{ color: error }]}>{errorMessage}</Text>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        marginTop: 20
    },
    inputContainer: {
        width: '100%',
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
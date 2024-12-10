import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { useModeColor } from '../hooks/ColorMode/UseModeTheme'
import EyeHidIcon from '../assets/IconComponents/EyeHidIcon'
import RNPickerSelect from 'react-native-picker-select';
import { countryCodes } from '../datas/countryCodes';
import { SIZES } from '../constans/size';
// import Picker from 'react-native-picker-select';

type CountryCodeType = {
    label: string;
    value: string;
}

interface InputProps {
    placeholder?: string,
    Icon?: React.ComponentType<any>,
    type?: 'password' | 'numeric' | 'phone' | 'default',
    value?: string,
    onChangeText?: (text: string) => void,
    onBlur?: () => void,
    errorMessage?: string,
    borderRadius?: number,
    borderWidth?: number,
    countryCode?: string;
    setCountryCode?: (value: string) => void;
    width?: number;
    editable?: boolean;
}

export default memo(function InputComponent({
    placeholder = 'Enter text',
    Icon,
    type,
    onChangeText,
    onBlur,
    errorMessage,
    borderRadius,
    borderWidth,
    setCountryCode,
    countryCode,
    width = 0.9,
    value,
    editable = true
}: InputProps) {

    const { textLight, error, darkGrayLight } = useModeColor();
    const [showPass, setShowPass] = useState(false);


    const handleHidOrShowPass = () => {
        setShowPass(!showPass);
    };

    const IOS = Platform.OS === 'ios';


    return (
        <View style={[styles.container, { width: SIZES.W * width }]}>
            <View style={[
                styles.inputContainer,
                {
                    borderColor: errorMessage ? error : darkGrayLight,
                    borderRadius: borderRadius || 8,
                    borderWidth: borderWidth || 1,
                }
            ]}>
                {Icon && type !== 'phone' && (
                    <View>
                        <Icon color={errorMessage ? error : darkGrayLight} />
                    </View>
                )}

                {type === 'phone' && countryCode && setCountryCode && (
                    <View style={styles.pickerContainer}>
                        <RNPickerSelect
                            onValueChange={(value) => setCountryCode(value)}
                            items={countryCodes}
                            value={countryCode}
                            darkTheme={true}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: '+84', value: '+84' }}
                            style={{
                                inputIOS: [styles.inputIOS, { color: textLight }],
                                inputAndroid: [styles.inputAndroid, { color: textLight }],
                                placeholder: { color: textLight },
                            }}
                            Icon={() => <View style={{ height: '100%', paddingTop: IOS ? 0 : 10, }}><Text style={{ color: textLight }}>▼</Text></View>}
                        />
                    </View>
                )}

                <TextInput
                    editable={editable}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={type === 'password' && !showPass}
                    placeholder={placeholder}
                    placeholderTextColor={errorMessage ? error : darkGrayLight}
                    keyboardType={type === 'numeric' || type === 'phone' ? 'phone-pad' : 'default'}
                    style={[
                        styles.textInput,
                        {
                            color: errorMessage ? error : textLight,
                            width: type === 'password' ? '70%' : type === 'phone' ? '80%' : '90%',
                        }
                    ]}
                />

                {type === 'password' && (
                    <TouchableOpacity onPress={handleHidOrShowPass}>
                        <EyeHidIcon
                            status={showPass}
                            errorStatus={errorMessage}
                            color={errorMessage ? error : darkGrayLight}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {errorMessage && (
                <Text style={[{ color: error }]}>{errorMessage}</Text>
            )}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInput: {
        fontSize: 16,
        paddingHorizontal: 10
    },
    countryCode: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContainer: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputIOS: {
        fontSize: 16,
        // paddingHorizontal: 10,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 20,
        width: '100%',
        // backgroundColor: 'white'
    },
});
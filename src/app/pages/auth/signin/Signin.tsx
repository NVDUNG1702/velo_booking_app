import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import LogoSVG from '../../../assets/svg/Logo.svg';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamListLogin } from '../../../navigations/LoginNavigation';
import { SIZES } from '../../../constans/size';
import InputComponent from '../../../components/InputComponent';
import UserIcon from '../../../assets/IconComponents/UserIcon';
import LockIcon from '../../../assets/IconComponents/LockIcon';
import CheckBoxComponent from '../../../components/CheckBoxComponent';
import ButtonComponent from '../../../components/ButtonComponent';
import useSignin from '../../../hooks/auth/useSignin';
import { Controller } from 'react-hook-form';

type PropSignin = {
    navigation: StackNavigationProp<StackParamListLogin, 'signin'>;
};

export default function Signin({ navigation }: PropSignin) {
    const { backgroundStyle, textLight, skyBlue, darkGrayLight } = useModeColor();

    const { control, errors, handleSubmit, remember, setRemember } = useSignin();

    const handleNextForgot = () => {
        navigation.navigate('forgotPass');
    };

    const handleNextSignUp = () => {
        navigation.navigate('signup');
    };

    return (
        <View style={[backgroundStyle, styles.container]}>
            <LogoSVG width={'30%'} height={'20%'} />
            <View style={[styles.titleContainer]}>
                <Text style={[{ color: textLight }, styles.title]}>Sign In</Text>
            </View>
            <View style={[styles.formInput]}>
                <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, value, onBlur } }) => (
                        <InputComponent
                            Icon={UserIcon}
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors?.username?.message}
                            placeholder='please enter username or email'
                            onBlur={onBlur}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value, onBlur } }) => (
                        <InputComponent
                            Icon={LockIcon}
                            errorMessage={errors?.password?.message}
                            type='password'
                            placeholder='please enter password'
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                        />
                    )}
                />

            </View>
            <View style={[{ width: '90%', marginTop: 10 }, styles.containerRmAndForgot]}>
                <View style={[styles.containerCheckBox]}>
                    <CheckBoxComponent checked={remember} setCheck={setRemember} size={20} />
                    <Text style={[{ color: textLight, marginStart: 10 }]}>Remember me</Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={handleNextForgot}
                    >
                        <Text style={{ color: textLight, textDecorationLine: 'underline' }}>
                            Forgot password
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ButtonComponent label='hello' marginT={50} onPress={handleSubmit} />
            <Text style={{ marginTop: 30, color: darkGrayLight }}>
                Don’t have an account?
            </Text>
            <TouchableOpacity
                onPress={handleNextSignUp}
            >
                <Text style={{ color: skyBlue, textDecorationLine: 'underline' }}>Sign up now</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    titleContainer: {
        width: '90%',
    },
    title: {
        fontSize: SIZES.t34,
        fontWeight: '600'
    },
    formInput: {
        width: '90%',
        marginTop: 20
    },
    containerCheckBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    containerRmAndForgot: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
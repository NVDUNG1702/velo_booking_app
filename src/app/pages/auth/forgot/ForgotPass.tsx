import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LottieView from 'lottie-react-native';
import forgotAnimation from '../../../assets/json/forgot.json';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import HeaderComponent from '../../../components/HeaderComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamListLogin } from '../../../navigations/LoginNavigation';
import { SIZES } from '../../../constans/size';
import ButtonBoxCustomer from '../../../components/ButtonBoxComponent';
import InputComponent from '../../../components/InputComponent';
import EmailIcon from '../../../assets/IconComponents/EmailIcon';
import SwitchComponent from '../../../components/SwitchComponent';
import PhoneIcon from '../../../assets/IconComponents/PhoneIcon';
import LayoutComponent from '../../../layouts/LayoutComponent';

interface ForgotProps {
    navigation: StackNavigationProp<StackParamListLogin, 'forgotPass'>
}

const typeForgot = {
    TYPE1: 'Email',
    TYPE2: 'Phone'
}

export default function ForgotPass({ navigation }: ForgotProps) {
    const { backgroundStyle, textLight, skyBlue, skyBlueDisabled, isDarkMode } = useModeColor();
    const [forgotType, setForgotType] = useState(typeForgot.TYPE1);

    return (
        <LayoutComponent>
            <View style={[backgroundStyle, styles.container]}>
                <HeaderComponent navigation={navigation} />
                <LottieView source={forgotAnimation} style={[styles.animation]} autoPlay />
                <View style={[styles.titleContainer]}>
                    <Text style={[{ color: textLight }, styles.title]}>Forgot</Text>
                </View>
                <SwitchComponent value1={typeForgot.TYPE1} value2={typeForgot.TYPE2} setSelect={setForgotType} selected={forgotType} />

                <View style={{ width: '90%' }}>
                    <InputComponent Icon={forgotType == typeForgot.TYPE1 ? EmailIcon : PhoneIcon} borderRadius={5} borderWidth={2} placeholder={forgotType == typeForgot.TYPE1 ? "Enter your email address" : 'Enter your phone number'} />
                </View>

                <ButtonBoxCustomer height={60}
                    marginTop={30}
                    border={isDarkMode ? skyBlue : skyBlueDisabled}
                    fill={isDarkMode ? 'rgba(0, 0, 0, 1)' : skyBlue}
                    label='Forgot Now'
                />

            </View>
        </LayoutComponent>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        cursor: 'pointer'
    },
    animation: {
        width: '70%',
        height: '30%'

    },
    titleContainer: {
        width: '90%',
    },
    title: {
        fontSize: SIZES.t34,
        fontWeight: '600'
    },
})
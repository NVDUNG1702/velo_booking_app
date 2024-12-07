import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import OTP from 'react-native-otp-form'
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import { modelStore } from '../../../../stores/model.store';
import ButtonComponent from '../../../components/ButtonComponent';
import ArrowLongLeft from '../../../assets/IconComponents/ArrowLongLeftIcon';
import { SIZES } from '../../../constans/size';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamListLogin } from '../../../navigations/LoginNavigation';

type OTPSignUpProps = {
    navigation: StackNavigationProp<StackParamListLogin, 'optSignUp'>
}

export default function OTPSignUp({ }: OTPSignUpProps) {
    const { backgroundStyle, textLight, skyBlue } = useModeColor();
    const [timeCountDown, setTimeCountDown] = useState(0);
    const { isModel, setModel } = modelStore();
    useEffect(() => {
        if (timeCountDown > 0) {
            setTimeout(() => {
                setTimeCountDown(timeCountDown - 1);
            }, 1000);
        }
    }, [timeCountDown]);

    return (
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, backgroundStyle]}>
            <Text style={[styles.title, { color: textLight }]}>Verify Email</Text>
            <Text style={[styles.content, { color: textLight }]}>Code has been sent to: {''}</Text>
            <View style={[styles.containerOTP,]}>
                <OTP
                    codeCount={4}
                    containerStyle={styles.otpWrapper}
                    otpStyles={{ ...styles.otpInput }}
                    textContentType='telephoneNumber'
                />
            </View>

            {
                timeCountDown > 0 ? (
                    <>
                        <Text style={[{ color: textLight }]}>The code will expire after: {timeCountDown}</Text>
                    </>
                ) : (
                    <>
                        <Text style={[styles.content, { color: textLight }]}>Didn't get OTP code?</Text>
                        <TouchableOpacity
                            onPress={() => { setTimeCountDown(5) }}
                        >
                            <Text style={[styles.content, { color: skyBlue, textDecorationLine: 'underline' }]}>Resend code</Text>
                        </TouchableOpacity>
                    </>
                )
            }
            <ButtonComponent label='Verify OTP' disabled={timeCountDown <= 0} />
            <TouchableOpacity
                onPress={() => {
                    setModel(false);
                }}
            >
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <ArrowLongLeft size={40} />
                    <Text style={{ color: textLight }}>BACK</Text>
                    <View style={{ width: 30, height: 5, borderColor: textLight, borderWidth: 2 }}>

                    </View>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    containerOTP: {
        width: '90%',
        height: '15%',
        alignItems: 'center',
        paddingTop: 20,
        borderRadius: 25,
        // backgroundColor: 'black'

    },
    otpWrapper: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: 20,
        width: '90%',
    },
    otpInput: {
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0)",
        fontSize: 20,
        textAlign: "center",
        fontWeight: '600',
        boxShadow: "2 3 10 1 #bbbbbb",
        color: '#46BEF1'
    },
    title: {
        fontSize: SIZES.h0,
        fontWeight: '500',
        marginBottom: 15
    },
    content: {
        fontSize: SIZES.h4,
        fontWeight: '400',
        marginBottom: 15
    }
});

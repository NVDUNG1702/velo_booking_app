import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import OTP from 'react-native-otp-form'
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import ButtonComponent from '../../../components/ButtonComponent';
import { SIZES } from '../../../constans/size';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamListLogin } from '../../../navigations/LoginNavigation';
import { signupStore } from '../../../../stores/auth/signup.store';
import HeaderComponent from '../../../components/HeaderComponent';
import LayoutComponent from '../../../layouts/LayoutComponent';
import LottieView from 'lottie-react-native';
import { ToastError } from '../../../untils/ToastMessage/toast';
import LoadingComponent from '../../../components/LoadingComponent';
const animationJson = require('../../../assets/json/sendMail.json');


type OTPSignUpProps = {
    navigation: StackNavigationProp<StackParamListLogin, 'optSignUp'>
}

export default function OTPSignUp({ navigation }: OTPSignUpProps) {
    const { backgroundStyle, textLight, skyBlue } = useModeColor();
    const [timeCountDown, setTimeCountDown] = useState(120);
    const { signup, dataSignUp, checkDataSignUp, isLoading } = signupStore();
    const [otp, setOtp] = useState('');

    useEffect(() => {
        if (timeCountDown > 0) {
            setTimeout(() => {
                setTimeCountDown(timeCountDown - 1);
            }, 1000);
        }
    }, [timeCountDown]);

    const handleReSendCode = () => {
        if (!dataSignUp) {
            ToastError('ReSend Code Error', 'Somethink grong!');
            navigation.goBack();
            return;
        };

        checkDataSignUp(dataSignUp);
        setTimeCountDown(120);
    }

    const handleSignup = () => {
        if (dataSignUp) {
            signup({ ...dataSignUp, otp });
        }
    }



    return (
        <LayoutComponent>
            <LoadingComponent loading={isLoading} />
            <HeaderComponent navigation={navigation} />
            <View style={[{ flex: 0.9, alignItems: 'center', justifyContent: 'center' }, backgroundStyle]}>

                <LottieView
                    source={animationJson}
                    autoPlay
                    style={{ width: '100%', height: '30%' }}
                />
                <View style={{ width: '100%', height: '70%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Text style={[styles.title, { color: textLight }]}>Verify Email</Text>
                    <Text style={[styles.content, { color: textLight, marginBottom: 0 }]}>Code has been sent to: </Text>
                    <Text style={[styles.content, { color: textLight, fontWeight: '600' }]}>{dataSignUp?.email}</Text>
                    <View style={[styles.containerOTP,]}>
                        <OTP
                            codeCount={6}
                            containerStyle={styles.otpWrapper}
                            otpStyles={{ ...styles.otpInput }}
                            textContentType='telephoneNumber'
                            // onChange={(e) => onChangOtp(e.nativeEvent.text)}
                            onTyping={setOtp}
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
                                    onPress={handleReSendCode}
                                >
                                    <Text style={[styles.content, { color: skyBlue, textDecorationLine: 'underline' }]}>Resend code</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }
                    <ButtonComponent
                        label='Verify OTP'
                        disabled={timeCountDown <= 0 || otp.length !== 6}
                        onPress={handleSignup}
                    />
                </View>

            </View>
        </LayoutComponent>
    )
}

const styles = StyleSheet.create({
    containerOTP: {
        width: '100%',
        // height: '15%',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: 15
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
        boxShadow: "2 2 10 2 rgba(225, 225, 225, 0.5)",
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

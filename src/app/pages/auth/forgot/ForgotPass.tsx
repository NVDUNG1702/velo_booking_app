import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OTP from 'react-native-otp-form';
import OTPModelComponent from '../../../components/OTPModelComponent';


export default function ForgotPass() {
    return (
        <View>
            <OTPModelComponent />
        </View>
    )
}

const styles = StyleSheet.create({})
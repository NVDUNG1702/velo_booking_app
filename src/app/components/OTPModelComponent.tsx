import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OTP from 'react-native-otp-form'

type OTPModelComponentProps = {
    loading?: boolean
}

export default function OTPModelComponent({ loading = true }: OTPModelComponentProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={loading}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <OTP
                    codeCount={4}
                    containerStyle={{
                        width: '90%',
                        height: 100,
                        backgroundColor: '#575757',
                        justifyContent: 'center',
                        alignItems: 'center',
                        filter: 'blur(10)',
                        boxShadow: '1 1 10 3 rgba(115, 115, 115, 0.5)',
                        borderRadius: 10
                    }}
                    otpStyles={{
                        borderWidth: 1,
                        borderColor: '#1c1c1c',
                        backgroundColor: '#575757',
                        // filter: 'blur(30)',
                    }}
                // style={{ color: 'white' }}
                />
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({})
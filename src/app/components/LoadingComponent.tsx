import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import LottieView from 'lottie-react-native';
import loadingAnimation from '../assets/json/loading.json';

interface LoadingProps {
    loading: boolean,
}

export default memo(function LoadingComponent({ loading }: LoadingProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={loading}
        // onRequestClose={() => {
        //     Alert.alert('Modal has been closed.');
        //     setLoading(!loading);
        // }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                <LottieView source={loadingAnimation} style={{ width: 500, height: 500 }} autoPlay />
            </View>
        </Modal>
    )
});

const styles = StyleSheet.create({})
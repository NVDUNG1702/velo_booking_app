import { ImageBackground, ImageURISource, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { useModeColor } from '../hooks/ColorMode/UseModeTheme';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import Toast from 'react-native-toast-message';
import ToastItemComponent from '../components/ToastItemComponent';
import { SIZES } from '../constans/size';
interface LayoutAppProps {
    children: React.ReactNode,
}

export default function LayoutApp({ children }: LayoutAppProps) {
    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
            {children}
        </View>
    )
}
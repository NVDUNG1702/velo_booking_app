import { SafeAreaView, StyleSheet } from 'react-native';
import { useModeColor } from '../hooks/ColorMode/UseModeTheme';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import Toast from 'react-native-toast-message';
import ToastItemComponent from '../components/ToastItemComponent';
interface PropsLayoutApp {
    children: React.ReactNode
}

export default function LayoutApp({ children }: PropsLayoutApp) {

    const { isDarkMode } = useModeColor();


    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={[styles.container, backgroundStyle]}>
            {children}
            <Toast config={{
                success: ({ text1, text2 }) => (
                    <ToastItemComponent text1={text1} text2={text2} type='success' />
                ),
                error: ({ text1, text2 }) => (
                    <ToastItemComponent text1={text1} text2={text2} type='error' />
                ),
                info: ({ text1, text2 }) => (
                    <ToastItemComponent text1={text1} text2={text2} type='info' />
                ),
            }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    }
})
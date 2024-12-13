import React from 'react';
import {
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import Toast, { BaseToastProps, ToastConfig } from 'react-native-toast-message';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useModeColor } from '../hooks/ColorMode/UseModeTheme';
import ToastItemComponent from '../components/ToastItemComponent';

interface LayoutComponentProps {
    children: React.ReactNode;
    fullView?: boolean;
    urlBackground?: any;  // Có thể sửa nếu có kiểu xác định
    backgroundStatusBar?: string;
    style?: ViewStyle; // Cho phép tùy chỉnh thêm kiểu giao diện từ bên ngoài
}

export default function LayoutComponent({
    children,
    fullView = false,
    backgroundStatusBar,
    style,
}: LayoutComponentProps) {
    const { isDarkMode } = useModeColor();

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const statusBarBackgroundColor = backgroundStatusBar || (isDarkMode ? Colors.darker : Colors.lighter);
    const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';

    const toastConfig: ToastConfig = {
        success: (props: BaseToastProps) => (
            <ToastItemComponent text1={props.text1 || ''} text2={props.text2} type="success" />
        ),
        error: (props: BaseToastProps) => (
            <ToastItemComponent text1={props.text1 || ''} text2={props.text2} type="error" />
        ),
        info: (props: BaseToastProps) => (
            <ToastItemComponent text1={props.text1 || ''} text2={props.text2} type="info" />
        ),
    };

    return (
        <View style={[styles.fullContainer, style]}>
            <StatusBar
                translucent={!!backgroundStatusBar}
                barStyle={statusBarStyle}
                backgroundColor={statusBarBackgroundColor}
            />

            {!fullView ? (
                <SafeAreaView style={[styles.container, backgroundStyle]}>
                    {children}
                </SafeAreaView>
            ) : (
                <View style={[backgroundStyle, styles.container]}>{children}</View>
            )}

            <Toast  config={toastConfig} />
        </View>
    );
}

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
    },
});

import { ImageBackground, ImageURISource, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { useModeColor } from '../hooks/ColorMode/UseModeTheme';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import Toast from 'react-native-toast-message';
import ToastItemComponent from '../components/ToastItemComponent';
import { SIZES } from '../constans/size';

interface LayoutComponentProps {
    children: React.ReactNode,
    fullView?: boolean,
    urlBackground?: ImageURISource,
    backgroundStatusBar?: string
}

export default function LayoutComponent({ children, fullView = false, urlBackground, backgroundStatusBar }: LayoutComponentProps) {
    const { isDarkMode } = useModeColor();

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <ImageBackground style={{ width: '100%', height: '100%' }}
                source={urlBackground}
            >
                {
                    !fullView
                        ? (
                            <SafeAreaView style={[styles.container, backgroundStyle]}>
                                <StatusBar
                                    barStyle={!isDarkMode ? "dark-content" : "light-content"}
                                    backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
                                />
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
                        ) : (
                            <View style={[backgroundStyle, {flex: 1}]}>
                                <StatusBar
                                    translucent={!!backgroundStatusBar}
                                    barStyle={!isDarkMode ? "dark-content" : "light-content"}
                                    backgroundColor={!backgroundStatusBar ? isDarkMode ? Colors.darker : Colors.lighter : backgroundStatusBar}
                                />
                                {children}
                            </View>
                        )
                }
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    }
})
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useModeColor } from '../hooks/ColorMode/UseModeTheme';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React from 'react';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    }
})
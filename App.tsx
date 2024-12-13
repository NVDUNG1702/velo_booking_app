/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import Navigation from './src/app/navigations/Navigation';
import { modeThemeStore } from './src/stores/zustandStore';
import { useEffect } from 'react';
import LayoutApp from './src/app/layouts/LayoutApp';
import { useModeColor } from './src/app/hooks/ColorMode/UseModeTheme';
import './src/globals/font.global';
import MapLibreGL from "@maplibre/maplibre-react-native";
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

Platform.OS === 'android' && MapLibreGL.setAccessToken(null);

export const App = () => {
    const { initializeMode } = modeThemeStore();
    const { isMode } = useModeColor();

    useEffect(() => {
        initializeMode();
    }, [isMode])

    return (
        <SafeAreaProvider>
            <LayoutApp >
                <Navigation />
            </LayoutApp>
        </SafeAreaProvider>
    )
}

export default App;

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

export const App = () => {
    const { initializeMode } = modeThemeStore();
    const { isMode } = useModeColor();

    useEffect(() => {
        initializeMode();
    }, [isMode])

    return (
        <LayoutApp >
            <Navigation />
        </LayoutApp>
    )
}

export default App;

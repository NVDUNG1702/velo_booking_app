import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import Dashboard from '../pages/dashboard';
import LoginNavigation from './LoginNavigation';

export const navigationRef = createNavigationContainerRef();
const Stack = createStackNavigator();

export type StackParamListNav = {
    Dashboard: undefined,
    Login: undefined
}

const Navigation = () => {
    return (
        <NavigationContainer ref={navigationRef} >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='dashboard' component={Dashboard} />
                <Stack.Screen name='login' component={LoginNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

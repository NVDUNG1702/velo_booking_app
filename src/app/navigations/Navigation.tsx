import { createStackNavigator } from '@react-navigation/stack';
import { createNavigationContainerRef, NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import Dashboard from '../pages/dashboard';
import LoginNavigation from './LoginNavigation';
import React from 'react';

export type StackParamListNav = {
    dashboard: undefined,
    login: undefined
}

export const navigationRef = createNavigationContainerRef<StackParamListNav>();

const Stack = createStackNavigator();

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

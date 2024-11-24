import { createStackNavigator } from '@react-navigation/stack';
import { createNavigationContainerRef, NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import Intro from '../pages/intro';
import LoginNavigation from './LoginNavigation';
import React from 'react';
import BottomTabNavigation from './BottomTabNavigation';

export type StackParamListNav = {
    dashboard: undefined,
    login: undefined,
    navHome: undefined,
    intro: undefined
}

export const navigationRef = createNavigationContainerRef<StackParamListNav>();

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer ref={navigationRef} >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='intro' component={Intro} />
                <Stack.Screen name='login' component={LoginNavigation} />
                <Stack.Screen name='navHome' component={BottomTabNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

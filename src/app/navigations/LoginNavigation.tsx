import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ForgotPass, Signin, Signup } from '../pages/auth/index';

const Stack = createStackNavigator();

export type StackParamListLogin = {
    signin: undefined,
    signup: undefined,
    forgotPass: undefined
};

export default function LoginNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='signin' component={Signin} />
            <Stack.Screen name='signup' component={Signup} />
            <Stack.Screen name='forgotPass' component={ForgotPass} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
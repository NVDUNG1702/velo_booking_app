import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../../../components/HeaderComponent'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackParamListLogin } from '../../../navigations/LoginNavigation'
import InputComponent from '../../../components/InputComponent'
import UserIcon from '../../../assets/IconComponents/UserIcon'
import EmailIcon from '../../../assets/IconComponents/EmailIcon'
import PhoneIcon from '../../../assets/IconComponents/PhoneIcon'
import InfoIcon from '../../../assets/IconComponents/InfoIcon'
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme'
import LockIcon from '../../../assets/IconComponents/LockIcon'
import ButtonComponent from '../../../components/ButtonComponent'
import LogoSVG from '../../../assets/svg/Logo.svg';
import { SIZES } from '../../../constans/size'
import { useSafeAreaStyle } from '../../../hooks/size/usesafeArea'
import useSignup from '../../../hooks/auth/useSignup'
import { Controller } from 'react-hook-form'
import LoadingComponent from '../../../components/LoadingComponent'
import OTPModelComponent from '../../../components/OTPModelComponent'
import LayoutComponent from '../../../layouts/LayoutComponent'

interface PropSigup {
  navigation: StackNavigationProp<StackParamListLogin, 'signup'>
}

export default function Signup({ navigation }: PropSigup) {

  const { backgroundStyle, textLight, darkGrayLight, skyBlue } = useModeColor();
  const { heightSafeArea } = useSafeAreaStyle();
  const { control, handleSubmit, isLoading, errors, countryCode, setCountryCode } = useSignup();

  const handleGoBack = () => {
    navigation.goBack();
  }


  return (
    <LayoutComponent>
      <View style={[styles.container, backgroundStyle]}>
        <LoadingComponent loading={isLoading} />
        {/* <OTPModelComponent email={getValues().email} /> */}
        <HeaderComponent navigation={navigation} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ width: '100%', height: heightSafeArea * 0.95 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.containerContent, { minHeight: heightSafeArea * 0.80 }]}>
            <LogoSVG width={'25%'} height={'10%'} />
            <View style={[styles.titleContainer]}>
              <Text style={[{ color: textLight }, styles.title]}>Sign Up</Text>
            </View>
            <View style={[styles.formContainer]}>
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value, onBlur } }) => (
                  <InputComponent
                    Icon={UserIcon}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors?.username?.message}
                    placeholder="Enter user name"
                    onBlur={onBlur}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value, onBlur } }) => (
                  <InputComponent
                    Icon={EmailIcon}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors?.email?.message}
                    placeholder="Enter your mail"
                    onBlur={onBlur}
                  />
                )}
              />

              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value, onBlur } }) => (
                  <InputComponent
                    Icon={PhoneIcon}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors?.phone?.message}
                    placeholder="Enter your phone number"
                    onBlur={onBlur}
                    type='phone'
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                  />
                )}
              />

              <Controller
                control={control}
                name="full_name"
                render={({ field: { onChange, value, onBlur } }) => (
                  <InputComponent
                    Icon={InfoIcon}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors?.full_name?.message}
                    placeholder="Enter your full name"
                    onBlur={onBlur}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value, onBlur } }) => (
                  <InputComponent
                    Icon={LockIcon}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors?.password?.message}
                    placeholder="Enter your password"
                    onBlur={onBlur}
                    type="password"
                  />
                )}
              />

            </View>
            <ButtonComponent
              label='hello'
              marginT={10}
              marginB={5}
              onPress={handleSubmit}
            />
            <Text style={{ marginTop: 30, color: darkGrayLight }}>
              Your have an account?
            </Text>
            <TouchableOpacity
              onPress={handleGoBack}
              style={{ marginBottom: 55 }}
            >
              <Text style={{ color: skyBlue, textDecorationLine: 'underline' }}>Sign in now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </LayoutComponent>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

  },
  formContainer: {
    width: '90%',
  },
  titleContainer: {
    width: '90%',
  },
  title: {
    fontSize: SIZES.t34,
    fontWeight: '600'
  },
  containerContent: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30
  }
})
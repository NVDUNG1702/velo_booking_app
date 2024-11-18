import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
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

interface PropSigup {
  navigation: StackNavigationProp<StackParamListLogin, 'signup'>
}

export default function Signup({ navigation }: PropSigup) {

  const { backgroundStyle } = useModeColor();

  return (
    <View style={[styles.container, backgroundStyle]}>
      <HeaderComponent navigation={navigation} title='SignUp' />
      <View style={[styles.formContainer]}>
        <InputComponent Icon={UserIcon} placeholder='Enter user name' />
        <InputComponent Icon={EmailIcon} placeholder='Enter your mail' />
        <InputComponent Icon={PhoneIcon} placeholder='Enter your phone number' />
        <InputComponent Icon={InfoIcon} placeholder='Enter your full name' />
        <InputComponent Icon={LockIcon} placeholder='Enter your password' type='password' />
      </View>
      <ButtonComponent label='hello' marginT={10} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formContainer: {
    width: '90%'
  }
})
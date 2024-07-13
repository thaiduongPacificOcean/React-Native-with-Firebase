import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
import LoginForm from '../components/loginScreen/LoginForm';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lottie}>
        <Lottie source={require('../assets/animations/Lottie4.json')} autoPlay loop />
      </View>
      <LoginForm />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      lottie: {
        height: 300,
        width: 300,
      },
})
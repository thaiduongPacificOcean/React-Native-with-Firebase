import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
import SignUpForm from '../components/signupScreen/SignUpForm';
const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lottie}>
        <Lottie source={require('../assets/animations/Lottie4.json')} autoPlay loop />
      </View>
      <SignUpForm />
    </View>
  )
}

export default SignUpScreen

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
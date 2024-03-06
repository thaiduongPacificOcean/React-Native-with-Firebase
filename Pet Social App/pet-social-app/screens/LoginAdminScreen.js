import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { CommonActions } from '@react-navigation/native';

const LoginAdminScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity>
        <Text>LoginAdminScreen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginAdminScreen

const styles = StyleSheet.create({})
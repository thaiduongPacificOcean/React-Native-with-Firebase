import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading'
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';
export default function signIn() {

  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', "Please fill all the fields");
      return;
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    console.log('Sign in response : ', response);
    if (!response.success) {
      Alert.alert('Sign In', response.msg);
    }
  }


  return (
    <CustomKeyboardView>
      <StatusBar style='dark' />
      <View className="flex-1 gap-12" style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}>

        <View className="items-center">
          <Image source={require('../assets/images/login.png')} style={{ height: hp(25) }} resizeMode='contain' />
        </View>
        <View className="gap-10">
          <Text style={{ fontSize: hp(4) }} className="font-bold text-center tracking-wider text-neutral-800">Sign In</Text>
          <View className="gap-4">
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Octicons name="mail" size={hp(2.7)} color="grey" />
              <TextInput
                onChangeText={value => emailRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Email Address'
                placeholderTextColor={'grey'}
              />
            </View>
          </View>
          <View className="gap-3">
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Octicons name="lock" size={hp(2.7)} color="grey" />
              <TextInput
                onChangeText={value => passwordRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Password'
                placeholderTextColor={'grey'}
                secureTextEntry
              />
            </View>
            <Text style={{ fontSize: hp(1.8) }} className="text-right font-semibold text-neutral-500">
              Forgot Password
            </Text>
          </View>

          <View>
            {
              loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <TouchableOpacity onPress={handleLogin}>
                  <View style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-xl justify-center items-center">
                    <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">Login</Text>
                  </View>
                </TouchableOpacity>
              )
            }
          </View>


          <View className="flex-row justify-center">
            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Don't have account?</Text>
            <Pressable onPress={() => router.push('signUp')}>
              <Text style={{ fontSize: hp(1.8) }} className="font-bold"> Sign Up</Text>
            </Pressable>
          </View>

        </View>
      </View>
    </CustomKeyboardView>
  )
}
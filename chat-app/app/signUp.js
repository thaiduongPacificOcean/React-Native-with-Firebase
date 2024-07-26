import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading'
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function signUp() {

  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSignUp = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert('Sign Up', "Please fill all the fields");
      return;
    }
    setLoading(true);
    const response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current)
    setLoading(false);
    console.log('got result : ', response);
    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
  }


  return (
    <CustomKeyboardView>
      <StatusBar style='dark' />
      <View className="flex-1 gap-12" style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}>
        <View className="items-center">
          <Image source={require('../assets/images/register.png')} style={{ height: hp(25) }} resizeMode='contain' />
        </View>
        <View className="gap-10">
          <Text style={{ fontSize: hp(4) }} className="font-bold text-center tracking-wider text-neutral-800">Sign Up</Text>
          <View className="gap-4">
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Feather name="user" size={hp(2.7)} color="grey" />
              <TextInput
                onChangeText={value => usernameRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Username'
                placeholderTextColor={'grey'}
              />
            </View>
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
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Feather name="image" size={hp(2.7)} color="grey" />
              <TextInput
                onChangeText={value => profileRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Profile url'
                placeholderTextColor={'grey'}
              />
            </View>
          </View>


          <View>
            {
              loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <TouchableOpacity onPress={handleSignUp}>
                  <View style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-xl justify-center items-center">
                    <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">Sign Up</Text>
                  </View>
                </TouchableOpacity>
              )
            }
          </View>


          <View className="flex-row justify-center">
            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Already have account?</Text>
            <Pressable onPress={() => router.push('signIn')}>
              <Text style={{ fontSize: hp(1.8) }} className="font-bold"> Login</Text>
            </Pressable>
          </View>

        </View>
      </View>
    </CustomKeyboardView>
  )
}
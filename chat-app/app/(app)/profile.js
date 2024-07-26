import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import ProfileHeader from '../../components/ProfileHeader';
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../../context/authContext';
import { Feather } from '@expo/vector-icons';

export default function profile() {
  const { user } = useAuth();
  console.log(user);
  return (
    <View className='flex-1 bg-white'>
      <ProfileHeader user={user} />
      <View className='flex justify-center items-center'>
        <Image source={user?.profileUrl} style={{ height: 180, width: 180, borderRadius: 90 }} />
        <Text
          style={{
            textAlign: 'center',
            color: '#303030',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 6
          }}
        >
          {user?.username}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#606060',
            fontSize: 14
          }}
        >
          @{user?.username}
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 52,
            borderRadius: 26,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 26,
            backgroundColor: '#202020',
            marginTop: 40
          }}
        >
          <Feather name="log-out" size={24} color="white" />
          <Text
            style={{
              fontWeight: 'bold',
              color: '#d0d0d0'
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
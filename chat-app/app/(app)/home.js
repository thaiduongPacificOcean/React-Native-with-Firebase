import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatList from '../../components/ChatList';
import Loading from '../../components/Loading';
import { useAuth } from '../../context/authContext'
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';

export default function Home() {

  const { user } = useAuth();
  console.log('user data : ', users);
  const [users, setUsers] = useState([1, 2, 3]);

  useEffect(() => {
    if (user?.uid)
      getUsers();
  }, [])

  const getUsers = async () => {
    const q = query(usersRef, where('userId', '!=', user?.uid));
    const querySnap = await getDocs(q);
    let data = [];
    querySnap.forEach(doc => {
      data.push({ ...doc.data() });
    });
    setUsers(data);
  }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='light' />
      {
        users.length > 0 ? (
          <View>
            <ChatList users={users} currentUser={user} />
          </View>
        ) : (
          <View className='flex items-center' style={{ top: hp(30) }}>
            <Loading size={hp(5)} />
          </View>

        )
      }
    </View>
  )
}
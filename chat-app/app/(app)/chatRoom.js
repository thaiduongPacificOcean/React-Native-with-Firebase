import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import { getRoomId } from '../../ultils/common';
import { setDoc, doc, Timestamp, getDoc, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebaseConfig';

export default function chatRoom() {

  const item = useLocalSearchParams(); //second user
  const { user } = useAuth();// user loggin
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef('');
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    createRoomIfNoExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, 'rooms', roomId);
    const messageRef = collection(docRef, 'messgages');
    const q = query(messageRef, orderBy('createdAt', 'asc'));
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });
    const KeyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', updateScrollView
    )
    return () => {
      unsub();
      KeyboardDidShowListener.remove();
    }
  }, []);

  useEffect(() =>{
    updateScrollView();
  },[messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true })
    }, 100)
  }

  const createRoomIfNoExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    const roomRef = doc(db, 'rooms', roomId);
    await setDoc(roomRef, {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    });
  }
  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, 'rooms', roomId);
      const messageRef = collection(docRef, 'messgages');
      textRef.current = "";
      if (inputRef) {
        inputRef?.current?.clear();
      }

      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date())
      })
      console.log('new message id : ', newDoc.id);
    } catch (e) {
      Alert.alert('Message', e.message)
    }
  }

  return (
    <CustomKeyboardView inChat={true}>
      <View className='flex-1 bg-white'>
        <StatusBar style='dark' />
        <ChatRoomHeader user={item} router={router} />
        <View className='h-2 border-b border-neutral-200' />
        <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
          <View className='flex-1'>
            <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
          </View>
          <View className='pt-2' style={{ marginBottom: hp(1.7) }}>
            <View className='flex-row justify-between mx-3 bg-white border p-2 border-neutral-300 rounded-full pl-5'>
              <TextInput placeholder='Type Message'
                className='flex-1 mr-2'
                style={{ fontSize: hp(2) }}
                onChangeText={value => textRef.current = value}
                ref={inputRef}
              />
              <TouchableOpacity onPress={handleSendMessage}>
                <View className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                  <Feather name='send' size={hp(2.7)} color={'#737373'} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>

  )
}
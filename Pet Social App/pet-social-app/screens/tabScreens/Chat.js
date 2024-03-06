import { Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { db, auth } from '../../firebaseConfig'
import { collection, doc, setDoc, addDoc, getDoc, collectionGroup, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import HeaderChat from '../../components/chat/HeaderChat';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { format } from 'date-fns';

// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

const Chat = ({ route }) => {
  const navigation = useNavigation();
  const { user, chatId, currentUserLogin } = route.params;
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState('')
  console.log(currentUserLogin)
  console.log(chatId)

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const storage = getStorage();
  console.log(previewImage);
  console.log(imageUri);
  console.log(previewImage);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      showImagePreview(result.assets[0].uri);
      setImageUri(result.assets[0].uri);

    }
  };
  const showImagePreview = (uri) => {
    setPreviewImage(uri);
    setPreviewVisible(true);
  };
  const closeImagePreview = () => {
    setPreviewVisible(false);
    setPreviewImage('');
    setImageUri('');
  };


  // lấy tin nhắn 

  useEffect(() => {
    const messageRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messageRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesData);
    });

    return unsubscribe;
  }, [chatId]);

  // const sendMessage = async () => {
  //   Keyboard.dismiss();
  //   const messageRef = collection(doc(db, 'chats', chatId), 'messages');

  //   await addDoc(messageRef, {
  //     timestamp: serverTimestamp(),
  //     text: input,
  //     user: {
  //       _id: auth.currentUser.uid,
  //       username: currentUserLogin.username,
  //       email: currentUserLogin.email,
  //       profile_picture: currentUserLogin.profile_picture,
  //     }
  //   });
  //   setInput("")
  // }

  const sendMessage = async () => {
    Keyboard.dismiss();
    const messageRef = collection(doc(db, 'chats', chatId), 'messages');
    
      

    if (previewImage) {
      const fileUri = imageUri;
      const fileExtension = fileUri.split('.').pop(); // Lấy đuôi file
      const fileName = `${Date.now()}.${fileExtension}`; // Đổi tên file để tránh trùng lặp
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${fileName}`);
  
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      console.log('File available at', downloadUrl);
      // Nếu có hình ảnh được chọn, gửi nó cùng với tin nhắn
      await addDoc(messageRef, {
        timestamp: serverTimestamp(),
        image: downloadUrl,
        user: {
          _id: auth.currentUser.uid,
          username: currentUserLogin.username,
          email: currentUserLogin.email,
          profile_picture: currentUserLogin.profile_picture,
        },
      });
      // Đóng modal xem trước hình ảnh
      setPreviewVisible(false);
      setPreviewImage('');
    } else if (input.trim() !== '') {
      // Nếu không có hình ảnh, chỉ gửi tin nhắn văn bản
      await addDoc(messageRef, {
        timestamp: serverTimestamp(),
        text: input,
        user: {
          _id: auth.currentUser.uid,
          username: currentUserLogin.username,
          email: currentUserLogin.email,
          profile_picture: currentUserLogin.profile_picture,
        },
      });
    }
    setInput('');
  };

  return (
    <View style={styles.container}>
      <HeaderChat user={user} />
      <ScrollView>
        {messages && messages.map((message, index) => (
          <View style={message.user._id === auth.currentUser.uid ? styles.reciever : styles.sender} key={index}>
            <Text style={{fontSize: 10, color: 'grey'}}>{message.timestamp && format(message.timestamp.toMillis(), 'dd/MM/yyyy HH:mm')}</Text>
            <Text>{message.text}</Text>
            {message.image && (
              <TouchableOpacity onPress={() => showImagePreview(message.image)}>
                <Image source={{ uri: message.image }} style={{ width: 200, height: 200 }} />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name='image-outline' size={24} color='#B36B39' />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={sendMessage}
          placeholder='Nhập tin nhắn...'
        >
        </TextInput>
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name='send' size={24} color='#B36B39' />
        </TouchableOpacity>
      </View>
      {previewVisible ? <View style={styles.modalContainer}>
        <Image source={{ uri: previewImage }} style={{ width: '100%', height: 300, alignSelf: 'center' }} />
        <TouchableOpacity onPress={closeImagePreview} style={styles.closeButton}>
          <Text style={{ color: 'white' }}>Hủy</Text>
        </TouchableOpacity>
      </View> : null}
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ECECEC',
    borderColor: 'transparent',
    padding: 10,
    color: 'grey',
    borderRadius: 30
  },
  reciever: {
    backgroundColor: '#FFA54F',
    maxWidth: '80%',
    position: 'relative',
    alignSelf: 'flex-end',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    marginBottom: 15,

  },
  sender: {
    backgroundColor: '#DDD',
    maxWidth: '80%',
    position: 'relative',
    alignSelf: 'flex-start',
    borderRadius: 10,
    padding: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  recieverText: {

  },
  senderText: {

  },
  modalContainer: {
  },
  imagePreviewContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: 200,
    backgroundColor: 'black',
    zIndex: 12,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#B36B39',
    padding: 10,
    borderRadius: 5,
  },
})
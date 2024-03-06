import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/myPostDetail/Header';
import Body from '../components/myPostDetail/Body';
import Comments from '../components/myPostDetail/Comments';
import { Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { doc, updateDoc, arrayUnion, collection, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const MyDetailPostScreen = ({ route }) => {

  const { post } = route.params;
  const navigation = useNavigation();
  const [currentUserLogin, setCurrentUserLogin] = useState(null)
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        console.log('User is logged in', user.uid);
        getUserData(user.uid);
      } else {
        setCurrentUserLogin(null);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const getUserData = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setCurrentUserLogin(userDoc.data());
    }
  };


  return (
    <View style={styles.container}>
      <Header post={post} />
      <Body post={post} />
      <Comments post={post} />
    </View>
  )
}

export default MyDetailPostScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{ useEffect, useState } from 'react'
import { db } from '../firebaseConfig'
import { collection, doc, setDoc , getDoc, collectionGroup, onSnapshot, query , orderBy} from "firebase/firestore"; 
import { auth } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';
import HeaderHomeChat from '../components/homeChat/HeaderHomeChat'
import CustomListItem from '../components/homeChat/CustomListItem'

const HomeChatScreen = () => {
  
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
        <View>
          <HeaderHomeChat navigation={navigation} currentUserLogin={currentUserLogin}/>
          <View style={{ padding: 10}}>
            <Text style={{ fontWeight: '600'  }}>Tin nhắn</Text>
          </View>
        </View>
        <CustomListItem navigation={navigation} currentUserLogin={currentUserLogin}/>
      </View>
  )
}

export default HomeChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 40,
    },


})
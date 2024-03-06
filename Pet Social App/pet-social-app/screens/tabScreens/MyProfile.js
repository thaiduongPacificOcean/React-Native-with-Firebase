import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native'
import React,{useState, useEffect} from 'react'
import Header from '../../components/myProfile/Header'
import ProfileBody from '../../components/myProfile/ProfileBody'
import Button from '../../components/myProfile/Button'
import ProfileInfo from '../../components/myProfile/ProfileInfo'
import ListPet from '../../components/myProfile/ListPet'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { db } from '../../firebaseConfig'
import { collection, doc, setDoc , getDoc, collectionGroup, onSnapshot, query , orderBy} from "firebase/firestore"; 
import { auth } from '../../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import ListButton from '../../components/myProfile/ListButton'
import { Divider } from 'react-native-elements';

const MyProfile = () => {
  
  const navigation = useNavigation();  
  
  const [currentUserLogin, setCurrentUserLogin] = useState(null)
  
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user && user.uid) {
          console.log('User is logged in MyProfile Screen', user.uid);
          getUserData(user.uid);
        } else {
          setCurrentUserLogin(null);
        }
      });
  
      return () => {
        unsubscribeAuth();
      };
    }, [])
  );

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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header currentUserLogin={currentUserLogin}/>
        <ProfileBody currentUserLogin={currentUserLogin}/>
        <ProfileInfo currentUserLogin={currentUserLogin}/>
        <Button currentUserLogin={currentUserLogin}/>
        <Info currentUserLogin={currentUserLogin}/>
        <ListPet currentUserLogin={currentUserLogin}/>
      </ScrollView>
    </SafeAreaView>
  )
}
const Info = ({currentUserLogin}) => {
  const [petOfUserLogin, setpetOfUserLogin] = useState(null)

  useEffect(() => { 
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const petsRef = collection(userRef, 'pets');
    const unsubscribe = onSnapshot(petsRef, orderBy('createdAt','desc'), (snapshot) => {
    const petsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    setpetOfUserLogin(petsData);
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.infoContainer}>
      <View>
        <TouchableOpacity style={styles.info}>
          <Text style={styles.number}>{currentUserLogin && currentUserLogin.follower.length.toString()}</Text>
          <Text style={styles.text}>Followers</Text>
        </TouchableOpacity>
      </View>
      <View >
        <TouchableOpacity style={styles.info}>
          <Text style={styles.number}>{petOfUserLogin && petOfUserLogin.length.toString()}</Text>
          <Text style={styles.text}>Pets</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.info}>
          <Text style={styles.number}>{currentUserLogin && currentUserLogin.following.length.toString()}</Text>
          <Text style={styles.text}>Following</Text>
        </TouchableOpacity>
      </View>
   </View>
  )
}
export default MyProfile

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDDDDD',
    flex: 1
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  button: {
    width: 140,
    height: 40,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0099FF',
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  buttonFollow: {
    width: 140,
    height: 40,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: '#0099FF'
  },
  buttonText: {
    color: '#0099FF'
  },
  buttonTextFollow: {
    color: '#fff'
  },
  number: {
    fontSize: 25,
    fontWeight: '600'
  },
  text: {
    color: 'grey',
    fontSize: 15
  }
})
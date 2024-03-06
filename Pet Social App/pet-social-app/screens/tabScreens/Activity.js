import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { updateDoc , doc , arrayUnion , arrayRemove , collection , FieldValue , query, getDoc, getDocs} from 'firebase/firestore';
import { auth , db } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth'
import Notifications from './Notifications';
import Header from '../../components/activity/Header';

const Activity = () => {
    
  const navigation = useNavigation();
  
  const [currentUserLogin, setCurrentUserLogin] = useState(null);
  const [close, setClose] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [shouldFetchUsers, setShouldFetchUsers] = useState(false);
  // console.log('Tất cả người dùng ',allUsers);
  // console.log('NGƯỜI DÙNG HIỆN TẠI', currentUserLogin);
  
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
  }, [shouldFetchUsers]);

  const getUserData = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setCurrentUserLogin(userDoc.data());
    }
  };

  useEffect(() => {
    if (currentUserLogin) {
    const fetchUsers = async () => {
      try {
        const usersQuery = query(collection(db, 'users'));
        const usersQuerySnapshot = await getDocs(usersQuery);
        const allUsers = usersQuerySnapshot.docs.map((userDoc) => ({
          id: userDoc.id,
          ...userDoc.data(),
        }));
  
        setAllUsers(allUsers);
  
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };
    setShouldFetchUsers(false);
    fetchUsers();
  }
  }, [currentUserLogin]); 

  const handleFollow = async (userId) => {
    const isFollowing = !currentUserLogin.following.includes(userId);
    const userDocRef = doc(db, 'users', currentUserLogin.owner_userid);
    const userFollowedDocRef = doc(db, 'users', userId);
    try {
      updateDoc(userDocRef, {
        following: isFollowing 
          ? arrayUnion(userId)
          : arrayRemove(userId)
      });
      updateDoc(userFollowedDocRef, {
        follower: isFollowing 
          ? arrayUnion(currentUserLogin.owner_userid)
          : arrayRemove(currentUserLogin.owner_userid)
      });

      setShouldFetchUsers(true);
      console.log('Bạn đã follow người dùng có id là :', userId);
    } 
    catch (error) {
      console.error('Lỗi nút follow : ', error)
    }
  };
  const handlePress = (userID) => {
    userID != auth.currentUser.uid ? navigation.navigate('Profile',{userID}) : navigation.navigate('MyProfile');
  }
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={{margin: 10}} showsVerticalScrollIndicator={false}>
            <Notifications currentUserLogin={currentUserLogin}/>
            <Text style={{fontWeight: 'bold', paddingVertical: 10}}>
                Gợi ý cho bạn
            </Text>
            {allUsers && allUsers.map((user) => (
              user.id != auth.currentUser.uid && (
              <View key={user.id} >
              {close ? null : (
                <View
                  style={{
                    paddingVertical: 10,
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                  }} >
                  <View>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        maxWidth: '64%',
                      }} onPress={() => handlePress(user.id)}>
                      <Image
                        source={{uri: user.profile_picture}}
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 100,
                          marginRight: 10,
                        }}
                      />
                      <View style={{width: '100%'}}>
                        <Text style={styles.username}>
                          {user.fullname}
                        </Text>
                        <Text style={styles.fullname}>
                          {user.username}
                        </Text>
                        <Text style={styles.fullname}>
                          Sugggested for you
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {currentUserLogin.following.includes(user.id) ? 
                      <TouchableOpacity 
                        onPress={() => handleFollow(user.id)}
                        style={{width: 90}}>
                        <View style={styles.following}>
                          <Text style={{color: 'black'}}>
                            Following
                          </Text>
                        </View>
                      </TouchableOpacity>
                      : 
                      <>
                        <TouchableOpacity
                          onPress={() => handleFollow(user.id)}
                          style={{width: 68,}}>
                          <View
                            style={styles.follow}>
                            <Text style={{color: 'white'}}>
                              Follow
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{paddingHorizontal: 10}}>
                          <AntDesign
                            name="close"
                            style={{fontSize: 14, color: 'black', opacity: 0.8}}
                          />
                        </TouchableOpacity>
                      </>
                    }
                  </View>
                </View>
              )}
            </View>
            )))}
      </ScrollView>
    </View>
  )
}

export default Activity

const styles = StyleSheet.create({
    container : {
      flex: 1,
      backgroundColor: 'white'
    },
    activity : {
        fontSize: 20,
          fontWeight: 'bold',
          borderBottomWidth: 0.5,
          borderBottomColor: '#DEDEDE',
          padding: 10,
    },
    username : {
      fontSize: 14, 
      fontWeight: 'bold'
    },
    fullname : {
      fontSize: 12, 
      opacity: 0.5
    },
    following: {
      width: '100%',
      height: 30,
      borderRadius: 5,
      backgroundColor: null,
      borderWidth: 1,
      borderColor: '#DEDEDE',
      justifyContent: 'center',
      alignItems: 'center',
    },
    follow: {
      width: '100%',
      height: 30,
      borderRadius: 5,
      backgroundColor: '#3493D9',
      borderWidth:  0,
      borderColor: '#DEDEDE',
      justifyContent: 'center',
      alignItems: 'center',
    }
})
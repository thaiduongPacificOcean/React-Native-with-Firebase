import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{ useState , useEffect} from 'react'
import Header from '../../components/profileUser/Header'
import ProfileBody from '../../components/profileUser/ProfileBody'
import ProfileInfo from '../../components/profileUser/ProfileInfo'
import Status from '../../components/profileUser/Status'
import ListPet from '../../components/profileUser/ListPet'
import { useNavigation } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { db } from '../../firebaseConfig'  
import { collection, doc, setDoc , getDoc, collectionGroup, onSnapshot, query , orderBy , updateDoc, arrayUnion, arrayRemove} from "firebase/firestore"; 
import { Divider } from 'react-native-elements';

const Profile = ({route}) => {

  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const {userID} = route.params;

  const [currentUserLogin, setCurrentUserLogin] = useState(null);
  const [close, setClose] = useState(false);
  const [shouldFetchUsers, setShouldFetchUsers] = useState(false);
  
  // Lấy thông tin của user
  useEffect(() => {
    const getUser = async () => {
      try {
        const userDocRef = doc(db, 'users', userID);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          console.log('Thông tin của user: ', userData);
          setUser(userData)
        } else {
          console.log('User không tồn tại trong Firestore');
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin user: ', error);
      }
    };
    getUser();
}, [userID]);

  // Lấy thông tin user đang đăng nhập

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

  const handleFollow = async (userId) => {
    const isFollowing = !currentUserLogin.following.includes(userId);
    const userDocRef = doc(db, 'users', currentUserLogin.owner_userid);
    const userFollowedDocRef = doc(db, 'users', userId);
    try {
      await updateDoc(userDocRef, {
        following: isFollowing 
          ? arrayUnion(userId)
          : arrayRemove(userId)
      });
      await updateDoc(userFollowedDocRef, {
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
  useEffect(() => {
    console.log('shouldFetchUsers:', shouldFetchUsers);
    if (shouldFetchUsers) {
      setShouldFetchUsers(false); // Đặt lại giá trị để tránh việc kích hoạt vô hạn
    }
  }, [shouldFetchUsers]);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header user={user}/>
        <ProfileBody user={user}/>
        <ProfileInfo user={user}/>
        <Info user={user} />
        <Button user={user} currentUserLogin={currentUserLogin} handleFollow= {handleFollow}/>
        <Divider width={1} orientation='horizontal' color='#DDD'/>
        <ListPet user={user}/>
      </ScrollView>
    </SafeAreaView>
  )
}
const Info = ({user}) => {
  const [petOfUserLogin, setpetOfUserLogin] = useState(null)

  useEffect(() => { 
    if (user) { 
    const userRef = doc(db, 'users', user.owner_userid);
    const petsRef = collection(userRef, 'pets');
    const unsubscribe = onSnapshot(petsRef, orderBy('createdAt','desc'), (snapshot) => {
    const petsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    setpetOfUserLogin(petsData);
    });
    return unsubscribe;
  }
  }, [user]);
  return (
    <View style={styles.infoContainer}>
      <View>
        <TouchableOpacity style={styles.info}>
          <Text style={styles.number}>{user && user.follower.length.toString()}</Text>
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
          <Text style={styles.number}>{user && user.following.length.toString()}</Text>
          <Text style={styles.text}>Following</Text>
        </TouchableOpacity>
      </View>
   </View>
  )
}

const Button = ({currentUserLogin , user , handleFollow}) => {
  return (
    <View style={styles.buttonContainer}>
      <View>
        <TouchableOpacity style={styles.buttonFollow}>
          <Text style={styles.buttonTextFollow}>Nhắn tin</Text>
        </TouchableOpacity>
      </View>
      <View>
        {currentUserLogin && currentUserLogin.following.includes(user.owner_userid) ? 
          <TouchableOpacity style={styles.button} onPress={() => handleFollow(user.owner_userid)}>
            <Text style={styles.buttonText}>Đang theo dõi</Text>
          </TouchableOpacity> :
          <TouchableOpacity style={styles.buttonFollow} onPress={() => handleFollow(user.owner_userid)}>
            <Text style={styles.buttonTextFollow}>Theo dõi</Text> 
          </TouchableOpacity>  
        }
      </View>
   </View>
  )
}
export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDDDDD',
    flex: 1
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyContent: 'center',
    marginTop: 30,
    paddingHorizontal: 30,

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
    borderWidth: 1.5,
    borderColor: '#B36B39',
    borderRadius: 10,
    backgroundColor: '#fff',
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
    backgroundColor: '#B36B39',
    marginRight: 5
  },
  buttonText: {
    color: '#B36B39',
    fontWeight: '500'
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
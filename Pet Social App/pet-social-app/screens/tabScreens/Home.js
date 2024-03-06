import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect , useState , useCallback} from 'react'
import { auth } from "../../firebaseConfig";
import Header from '../../components/home/Header';
import TopTabView from '../../components/home/TopTabView';
import Stories from '../../components/home/Stories';
import Post from '../../components/home/Post';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseConfig'
import { collection, doc, setDoc , getDoc, collectionGroup, onSnapshot, query , orderBy, getDocs , where} from "firebase/firestore"; 
import { onAuthStateChanged } from 'firebase/auth'
import SearchForm from '../../components/home/SearchForm';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Home = () => {

  const navigation = useNavigation();
  
  const [currentUserLogin, setCurrentUserLogin] = useState(null)
  const [feedPosts, setFeedPosts] = useState([]);


    
  // Lấy currentUser

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
    
// 
  // useEffect(() => {
  //     const getFeedPosts = async () => {
  //     try {
  //       const userCollectionRef = collection(db, 'users');
  //       const userDocRef = doc(userCollectionRef, auth.currentUser.uid);
  //       const userDocSnapshot = await getDoc(userDocRef);

  //       if (userDocSnapshot.exists()) {
  //         const userFollowing = userDocSnapshot.data().following || [];
  //         // Lấy tất cả các bài post của người dùng hiện tại và những người mà người dùng đang theo dõi
  //         const postsQuery = query(
  //           collectionGroup(db, 'posts'),
  //           where('owner_id', 'in', [auth.currentUser.uid, ...userFollowing]),
  //           orderBy('createdAt', 'desc')
  //         );

  //         const postsQuerySnapshot = await getDocs(postsQuery);

  //         const postsData = postsQuerySnapshot.docs.map((postDoc) => ({
  //           id: postDoc.id,
  //           ...postDoc.data(),
  //         }));

  //         console.log('Posts of followed users:', postsData);
  //         setFeedPosts(postsData);
  //       } else {
  //         console.log('User not found');
  //       }
  //       return () => unsubscribe();
  //     } catch (error) {
  //       console.error('Error fetching feed posts: ', error);
  //     }
  //   };

  //   getFeedPosts();
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const getFeedPosts = async () => {
  //       try {
  //         const userCollectionRef = collection(db, 'users');
  //         const userDocRef = doc(userCollectionRef, auth.currentUser.uid);
  //         const userDocSnapshot = await getDoc(userDocRef);

  //         if (userDocSnapshot.exists()) {
  //           const userFollowing = userDocSnapshot.data().following || [];
  //           // Lấy tất cả các bài post của người dùng hiện tại và những người mà người dùng đang theo dõi
  //           const postsQuery = query(
  //             collectionGroup(db, 'posts'),
  //             where('owner_id', 'in', [auth.currentUser.uid, ...userFollowing]),
  //             orderBy('createdAt', 'desc')
  //           );

  //           const postsQuerySnapshot = await getDocs(postsQuery);

  //           const postsData = postsQuerySnapshot.docs.map((postDoc) => ({
  //             id: postDoc.id,
  //             ...postDoc.data(),
  //           }));

  //           console.log('Posts of followed users:', postsData);
  //           setFeedPosts(postsData);
  //         } else {
  //           console.log('User not found');
  //         }
  //       } catch (error) {
  //         console.error('Error fetching feed posts: ', error);
  //       }
  //     };

  //     getFeedPosts();
  //   }, [])
  // );

  // useFocusEffect(
  //   React.useCallback(() => {
  //       const getFeedPosts = async () => {
  //           try {
  //             const userCollectionRef = collection(db, 'users');
  //             const userDocRef = doc(userCollectionRef, auth.currentUser.uid);
  //             const userDocSnapshot = await getDoc(userDocRef);
    
  //             if (userDocSnapshot.exists()) {
  //               const userFollowing = userDocSnapshot.data().following || [];
  //               // Lấy tất cả các bài post của người dùng hiện tại và những người mà người dùng đang theo dõi
  //               const postsQuery = query(
  //                 collectionGroup(db, 'posts'),
  //                 where('owner_id', 'in', [auth.currentUser.uid, ...userFollowing]),
  //                 ...(selectedPetType ? [where('type', '==', selectedPetType)] : []),
  //                 orderBy('createdAt', 'desc')
  //               );
    
  //               const postsQuerySnapshot = await getDocs(postsQuery);
    
  //               const postsData = postsQuerySnapshot.docs.map((postDoc) => ({
  //                 id: postDoc.id,
  //                 ...postDoc.data(),
  //               }));
    
  //               console.log('Posts of followed users:', postsData);
  //               setFeedPosts(postsData);
  //             } else {
  //               console.log('User not found');
  //             }
  //           } catch (error) {
  //             console.error('Error fetching feed posts: ', error);
  //           }
  //       };
  //     getFeedPosts();
  //   }, [selectedPetType])
  // );

  

  return (
    <SafeAreaView style={styles.container}>
        <Header currentUserLogin={currentUserLogin}/>
        <SearchForm />
        <TopTabView/>
    </SafeAreaView>
  )
}


export default Home

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#DDDDDD',
    flex: 1
  },
  
})
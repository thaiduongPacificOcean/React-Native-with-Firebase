import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Post from './Post'
import { collection, doc, setDoc , getDoc, collectionGroup, onSnapshot, query , orderBy, getDocs , where} from "firebase/firestore"; 
import { db } from '../../firebaseConfig'
import { auth } from "../../firebaseConfig";

const TopTabView = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator 
        screenOptions={({route}) => ({
                tabBarLabelStyle: {
                    fontSize: 14,
                    textTransform: "capitalize",
                    color: 'grey' 
                },
                tabBarItemStyle: {
                    flexDirection: 'row',
                },
                tabBarIndicatorStyle : {
                    height: 1, 
                    backgroundColor: '#B36B39',
                },
                tabBarIcon: ({focused , colour}) => {
                    let iconName;
                    if (route.name === 'Friends'){
                        iconName = focused ? "people" : "people-outline";
                        colour = focused ? "#B36B39" : "grey";
                    }
                    else if(route.name === 'TimeLine') {
                        iconName = focused ? "timer" : "timer-outline";
                        colour = focused ? "#B36B39" : "grey";
                    }
                    return (
                        <Ionicons name = {iconName} color={colour} size={22}/>
                    )
                }
            })}>
        <Tab.Screen name='TimeLine' component={TimeLine} />
        <Tab.Screen name='Friends' component={Friends}/>
    </Tab.Navigator>
  )
}

    

const TimeLine = () => {
    const [feedPosts, setFeedPosts] = useState([]);
    useEffect(() => {
    const getFeedPosts = async () => {
        try {
            const postsQuery = query(
                collectionGroup(db, 'posts'),
                orderBy('createdAt', 'desc')
              );

        const unsubscribe = onSnapshot(postsQuery, (postsQuerySnapshot) => {
            const postsData = postsQuerySnapshot.docs.map((postDoc) => ({
            id: postDoc.id,
            ...postDoc.data(),
            }));

            console.log('All Posts:', postsData);
            setFeedPosts(postsData);
        });

        return () => unsubscribe();
        } catch (error) {
        console.error('Error fetching feed posts: ', error);
        }
    };

    getFeedPosts();
    }, []);

    return (
        <ScrollView style={{marginTop: 20}} showsVerticalScrollIndicator={false}>
          {feedPosts && feedPosts.map((post, index) => (
            <Post 
                post = {post} 
                key = {index}
                />
          ))}
        </ScrollView>
    )
}
const Friends = () => {
    
    const [feedPosts, setFeedPosts] = useState([]);
    
    useEffect(() => {
        const getFeedPosts = async () => {
        try {
            const userCollectionRef = collection(db, 'users');
            const userDocRef = doc(userCollectionRef, auth.currentUser.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userFollowing = userDocSnapshot.data().following || [];
                const postsQuery = query(
                collectionGroup(db, 'posts'),
                where('owner_id', 'in', [auth.currentUser.uid, ...userFollowing]),
                orderBy('createdAt', 'desc')
                );

                const postsQuerySnapshot = await getDocs(postsQuery);

                const postsData = postsQuerySnapshot.docs.map((postDoc) => ({
                id: postDoc.id,
                ...postDoc.data(),
                }));

                console.log('Posts of followed users:', postsData);
                setFeedPosts(postsData);
            } else {
                console.log('User not found');
            }
            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching feed posts: ', error);
        }
    };

    getFeedPosts();
    }, []);

    return (
        <ScrollView style={{marginTop: 20}} showsVerticalScrollIndicator={false}>
          {feedPosts && feedPosts.map((post, index) => (
            <Post 
                post = {post} 
                key = {index}
                />
          ))}
        </ScrollView>
    )
}
export default TopTabView

const styles = StyleSheet.create({})
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, {useEffect , useState} from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { auth , db} from '../../firebaseConfig'
import { query , where , limit, collection , onSnapshot , serverTimestamp, Timestamp ,addDoc, setDoc ,doc, getDoc, collectionGroup, orderBy} from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { ResizeMode, Video } from 'expo-av'


const BottomTabView = ({petOfUser , user}) => {

    const navigation = useNavigation();
    const [postOfPet, setpostOfPet] = useState(null)

        useEffect(() => { 
            const userRef = doc(db, 'users', user.owner_userid);
            const petRef = doc(userRef, 'pets', petOfUser.petID);
            const postsRef = collection(petRef, 'posts');

            const unsubscribe = onSnapshot(postsRef, orderBy('createdAt','asc'), (snapshot) => {
            const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
            setpostOfPet(postsData);
            });
            return unsubscribe;
        }, []);

    // Videos
    const [videoOfPet, setVideoOfPet] = useState(null)
        useEffect(() => { 
            const userRef = doc(db, 'users', user.owner_userid);
            const petRef = doc(userRef, 'pets', petOfUser.petID);
            const videosRef = collection(petRef, 'videos');

            const unsubscribe = onSnapshot(videosRef, orderBy('createdAt','desc'), (snapshot) => {
                const videosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
                setVideoOfPet(videosData);
            });
            
            return unsubscribe;
        }, []);
        
    const Tab = createMaterialTopTabNavigator();

    const handlePress = (post) => {
        navigation.navigate('DetailPostScreen',{post});
    }
    const handlPressVideo = (video) => {
        navigation.navigate('DetailVideoScreen', {video});
    }
    const Posts = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.postView}>
                {postOfPet && postOfPet.map((post,index)=>(
                    <TouchableOpacity onPress={() => handlePress(post)} key={index}>
                        <View 
                            style={{
                                width: Dimensions.get('screen').width / 2.1 , 
                                height: 180,
                                marginVertical: 2,
                                marginHorizontal: 2,
                                borderRadius: 10,
                            }}
                    >
                        <Image source={{uri: post.imageUrl}} style={{height:'100%', width:'100%',borderRadius: 10, }} />
                    </View>
                    </TouchableOpacity>
                ))}
            </View>
            </ScrollView>
        )
    }
    const Videos = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.postView}>
                {videoOfPet && videoOfPet.map((video,index)=>(
                    <TouchableOpacity onPress={() => handlPressVideo(video)} key={index}>
                        <View 
                            style={{
                                width: Dimensions.get('screen').width / 2.1 , 
                                height: 180,
                                marginVertical: 2,
                                marginHorizontal: 2,
                                borderRadius: 10,
                            }}
                        >
                            <Video 
                                source={{uri: video.videoUrl}} 
                                style={{height:'100%', width:'100%',borderRadius: 10}} 
                                resizeMode= {ResizeMode.COVER}
                                // isLooping
                                // shouldPlay
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            </ScrollView>
        )
    }
  return (
    <Tab.Navigator 
        screenOptions={({route}) => ({
                tabBarShowLabel: false,
                tabBarIndicatorStyle : {
                    height: 1, 
                    backgroundColor: 'black'
                },
                tabBarIcon: ({focused , colour}) => {
                    let iconName;
                    if (route.name === 'Posts'){
                        iconName = focused ? "ios-apps-sharp" : "ios-apps-sharp";
                        colour = focused ? "black" : "grey";
                    }
                    else if(route.name === 'Videos') {
                        iconName = focused ? "ios-play-circle" : "ios-play-circle-outline";
                        colour = focused ? "black" : "grey";
                    }
                    return (
                        <Ionicons name = {iconName} color={colour} size={22}/>
                    )
                }
            })}>
        <Tab.Screen name='Posts' component={Posts} />
        <Tab.Screen name='Videos' component={Videos}/>
    </Tab.Navigator>
  )
}

export default BottomTabView

const styles = StyleSheet.create({
    postView : {
        width: '100%',
        height: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 5,
    }
})
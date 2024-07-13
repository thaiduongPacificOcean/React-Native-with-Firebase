import { Animated, Easing, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ResizeMode, Video } from 'expo-av';
import { collection, doc, setDoc, getDoc, collectionGroup, onSnapshot, query, orderBy, getDocs, where, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../../firebaseConfig'
import { auth } from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
const VideoItem = ({ video, index, isActive }) => {
    const navigation = useNavigation();
    const getMusicNoteAnim = (animationValue, isRotatedLeft) => {
        return {
            transform: [
                {
                    translateX: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [8, -16]
                    })
                },
                {
                    translateY: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -32]
                    })
                },
                {
                    rotate: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', isRotatedLeft ? '-45deg' : '45deg']
                    })
                }
            ],
            opacity: animationValue.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [0, 1, 0]
            })
        }
    };
    // animation
    const discAnimatedValue = useRef(new Animated.Value(0)).current;
    const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
    const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;

    const musicNoteAnimation1 = getMusicNoteAnim(musicNoteAnimatedValue1, false);
    const musicNoteAnimation2 = getMusicNoteAnim(musicNoteAnimatedValue2, true);

    const discAnimation = {
        transform: [{
            rotate: discAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            })
        }]
    }
    useEffect(() => {
        Animated.loop(
            Animated.timing(discAnimatedValue, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: false
            })).start();
        Animated.loop(
            Animated.sequence([
                Animated.timing(musicNoteAnimatedValue1, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: false
                }),
                Animated.timing(musicNoteAnimatedValue2, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: false
                })
            ])
        ).start();
    }, [discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2])
    //
    const handleLike = video => {

        const currentLikeStatus = !video.like_by_users.includes(auth.currentUser.uid)
        const userDocRef = doc(db, 'users', video.owner_id);
        const petDocRef = doc(userDocRef, 'pets', video.petID);
        const postDocRef = collection(petDocRef, 'videos');
        const specificPostDocRef = doc(postDocRef, video.id);

        try {
            updateDoc(specificPostDocRef, {
                like_by_users: currentLikeStatus
                    ? arrayUnion(auth.currentUser.uid)
                    : arrayRemove(auth.currentUser.uid)
            });
            console.log(auth.currentUser.uid, 'Đã like bài viết có id post là :', video.id)
        }
        catch (error) {
            console.error('Lỗi nút like bài viết: ', error)
        }
    }
    const handlePress = async (video) => {
        navigation.navigate('DetailVideoScreen', { video })
    }
    const handlePressAvatar = async (userID) => {
        console.log(userID);
        console.log(auth.currentUser.uid);
        try {
            userID == auth.currentUser.uid ? navigation.navigate('MyProfile') : navigation.navigate('Profile',{userID});
        }
        catch (e) {
            console.log(e);
        }
    }
    console.log(video.caption, '+', isActive);
    return (
        <View style={styles.videoContainer} key={index}>
            <Video
                source={{ uri: video.videoUrl }}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay
            />
            <View style={styles.bottomSection}>
                <View style={styles.bottomLeftSection}>
                    <Text style={styles.channelName}>{video.petName}</Text>
                    <Text style={styles.caption}>{video.caption}</Text>
                    <View style={styles.musicNameContainer}>
                        <Image
                            source={require('../../assets/images/music-note.png')}
                            style={styles.musicNameIcon}
                        />
                        <Text style={styles.musicName}>Music Song</Text>
                    </View>
                </View>
                <View style={styles.bottomRightSection}>
                    <Animated.Image source={require('../../assets/images/floating-music-note.png')}
                        style={[styles.floatingMusicNote, musicNoteAnimation1]}
                    />
                    <Animated.Image source={require('../../assets/images/floating-music-note.png')}
                        style={[styles.floatingMusicNote, musicNoteAnimation2]}
                    />
                    <Animated.Image source={require('../../assets/images/disc.png')}
                        style={[styles.musicDisc, discAnimation]}
                    />
                </View>
            </View>
            <VerticalBar video={video} handleLike={handleLike} handlePress={handlePress} handlePressAvatar={handlePressAvatar}/>
        </View>
    )
}
const VerticalBar = ({ video, handleLike, handlePress, handlePressAvatar}) => {
    return (
        <View style={styles.verticalBar}>
            <View style={[styles.verticalBarItem, styles.avatarContainer]}>
                <TouchableOpacity onPress={() => handlePressAvatar(video.owner_id)}>
                    <Image source={{ uri: video.profile_picture }} style={styles.avatar} />
                    <View style={styles.followButton}>
                        {/* <Image source={require('../../assets/images/plus-button.png')} style={styles.followIcon} /> */}
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.verticalBarItem}>
                <TouchableOpacity onPress={() => handleLike(video)}>
                    {video.like_by_users.includes(auth.currentUser.uid) ? <AntDesign name="heart" size={25} color="red" /> : <AntDesign name="hearto" size={25} color="#fff" />}
                </TouchableOpacity>
                <Text style={styles.verticalBarText}>{video.like_by_users.length.toString()}</Text>
            </View>
            <View style={styles.verticalBarItem}>
                <TouchableOpacity onPress={() => handlePress(video)}>
                    <AntDesign name="message1" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.verticalBarText}>{video.comments.length.toString()}</Text>
            </View>
            <View style={styles.verticalBarItem}>
                <Image source={require('../../assets/images/reply.png')} style={styles.verticalBarIcon} />
                <Text style={styles.verticalBarText}>Share</Text>
            </View>
        </View>
    )
}
export default VideoItem

const styles = StyleSheet.create({
    videoContainer: {
        width: '100%',
        height: 820,
    },
    video: {
        position: 'absolute',
        width: '100%',
        height: '100%',

    },
    bottomSection: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    bottomLeftSection: {
        flex: 4,
    },
    bottomRightSection: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    channelName: {
        color: 'white',
        fontWeight: 'bold'
    },
    caption: {
        color: 'white',
        marginVertical: 8,
    },
    musicNameContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    musicName: {
        color: 'white'
    },
    musicNameIcon: {
        width: 12,
        height: 12,
        marginRight: 8
    },
    musicDisc: {
        width: 40,
        height: 40,
    },
    verticalBar: {
        position: 'absolute',
        right: 8,
        bottom: 72,
    },
    verticalBarItem: {
        marginBottom: 24,
        alignItems: 'center',
    },
    verticalBarIcon: {
        width: 32,
        height: 32
    },
    verticalBarIconCmt: {
        width: 25,
        height: 25
    },
    verticalBarText: {
        color: 'white',

    },
    avatarContainer: {
        marginBottom: 48,

    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24
    },
    followButton: {
        position: 'absolute',
        bottom: -8,
    },
    followIcon: {
        width: 21,
        height: 21
    },
    floatingMusicNote: {
        position: 'absolute',
        right: 40,
        bottom: 16,
        width: 16,
        height: 16,
        tintColor: 'white',
    }
})

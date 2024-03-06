import { Animated, Easing, Image, ScrollView, StatusBar, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { collection, doc, setDoc, getDoc, collectionGroup, onSnapshot, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from '../../firebaseConfig'
import { auth } from "../../firebaseConfig";
import VideoItem from '../../components/reel/VideoItem';

const windowHeight = Dimensions.get('window').height;
const Reel = () => {
  const [feedVideos, setFeedVideos] = useState([]);

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  useEffect(() => {
    const getFeedPosts = async () => {
      try {
        const postsQuery = query(
          collectionGroup(db, 'videos'),
          orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(postsQuery, (postsQuerySnapshot) => {
          const videosData = postsQuerySnapshot.docs.map((postDoc) => ({
            id: postDoc.id,
            ...postDoc.data(),
          }));

          console.log('All Videos:', videosData);
          setFeedVideos(videosData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching feed videos: ', error);
      }
    };

    getFeedPosts();
  }, []);
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.floor(offsetY / windowHeight);
    setActiveVideoIndex(index);
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={200}
        showsVerticalScrollIndicator={false}
      >
        {feedVideos && feedVideos.map((video, index) => (
          <VideoItem video={video} key={index} isActive={activeVideoIndex === index} />
        ))}
      </ScrollView>
    </View>
  )
}

export default Reel

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
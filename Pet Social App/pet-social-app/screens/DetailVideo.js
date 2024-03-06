import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/videoView/Header'
import Body from '../components/videoView/Body'

const DetailVideo = ({route}) => {
  const video = route.params;
  console.log(video);
  return (
    <View style={styles.container}>
      <Header />
      <Body video={video}/>
    </View>
  )
}

export default DetailVideo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
})
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ResizeMode, Video } from 'expo-av';

const Body = ({video}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Video
                source={{ uri: video && video}}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay
            />
      </View>
    </View>
  )
}

export default Body

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  imageView: {
    height: 700,
    width: '100%',
  },
  video: {
    height: '100%',
    width: '100%',
  }
})
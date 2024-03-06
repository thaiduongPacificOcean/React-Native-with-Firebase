import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Body = ({image}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image source={{uri: image && image}} style={styles.image}/>
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
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  }
})
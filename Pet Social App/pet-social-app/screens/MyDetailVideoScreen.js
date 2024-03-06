import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/myVideoDetail/Header';
import Body from '../components/myVideoDetail/Body';
import Comments from '../components/myVideoDetail/Comments';

const MyDetailVideoScreen = ({route}) => {
  const { video } = route.params;

  return (
    <View style={styles.container}>
      <Header video={video} />
      <Body video={video} />
      <Comments video={video} />
    </View>
  )
}

export default MyDetailVideoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
      },
})
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Divider } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'

const BodyCommentsScreen = ({post, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
        <View style={{ height: 60 , width: 60 , padding : 5 , borderColor : '#3B68E6', borderWidth: 2 ,borderRadius: 30}} >
          <Image source={{uri: post.profile_picture}} style={{ height: '100%' , width: '100%' , borderRadius: 25 ,resizeMode: 'cover'}}/>
        </View>
        <View style={styles.content}>
          <View style={{flexDirection:'row', alignItems: 'center' , alignContent: 'center'}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5 , marginRight: 10}}>{post.username}</Text>
            <AntDesign name='circledown' color='#3B68E6'/>
          </View>
          <Text>{post.caption}</Text>
        </View>
      </View>
      <Divider width={1} orientation='vertical'/>
      <ScrollView style={{marginBottom: 5}}>
        {post.comments.map((comment , index)=> (
          <>
              <View style={styles.commentContainer} key={index}>
              <Image source={{uri: comment.userCommentImg}} style={{ height: 40 , width: 40 , borderRadius: 20, resizeMode: 'cover'}}/>
              <View style={styles.content}>
                <Text style={{fontWeight: 'bold'}}>{comment.username}</Text>
                <Text>{comment.content}</Text>
              </View>
            </View>
            <Divider width={1} orientation='vertical'/>  
          </>
        ))}
      </ScrollView>
    </View>
  )
}

export default BodyCommentsScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    marginTop : 10,
    flex: 1,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    width: 320,
    width: '100%'
  },
  content: {
    marginLeft: 20,
    width: '100%'
  }
})
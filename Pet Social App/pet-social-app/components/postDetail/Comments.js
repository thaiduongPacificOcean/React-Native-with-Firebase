import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Divider } from 'react-native-elements';
import { format } from 'date-fns';

const Comments = ({post}) => {
  const navigatiob = useNavigation();
  const time = new Date(post.createdAt.toMillis()).toLocaleString();
  return (
    <View style= {styles.container}>
      <View style={styles.commentContainer}>
            <View style={{ height: 50 , width: 50 , padding : 2 , borderColor : '#3B68E6', borderWidth: 2 ,borderRadius: 30}} >
              <Image source={{uri: post.profile_picture}} style={{ height: '100%' , width: '100%' , borderRadius: 25 ,resizeMode: 'cover'}}/>
            </View>
            <View style={styles.content}>
              <View style={{flexDirection:'row', alignItems: 'center' , alignContent: 'center'}}>
                <Text style={{fontWeight: 'bold', marginBottom: 5 , marginRight: 5, marginTop: 2}}>{post.username}</Text>
                <AntDesign name='circledown' color='#3B68E6' size={10}/>
              </View>
              <Text>{post.caption}</Text>
              <Text style={styles.time}>{time}</Text>
            </View>
      </View>
      <Divider width={1} orientation='horizontal' color='#d1d1d1'/>
      <ScrollView showsVerticalScrollIndicator={false}>
        {post.comments.map((comment , index)=> (
          <View key={index}>
            <>  
              <Divider width={1} orientation='horizontal' color='#d1d1d1'/>
              <View style={styles.commentContainer}>
              <Image source={{uri: comment.userCommentImg}} style={{ height: 30 , width: 30 , borderRadius: 15, resizeMode: 'cover'}}/>
              <View style={styles.content}>
                <Text style={{fontWeight: 'bold'}}>{comment.username}</Text>
                <Text>{comment.content}</Text>
                <Text style={styles.time}>{format(comment.timestamp.toMillis(), 'dd/MM/yyyy HH:mm')}</Text>
              </View>
              </View>
            <Divider width={1} orientation='vertical'/>  
            </>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default Comments

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    flex: 1
  },
  commentContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    width: 320,
    width: '100%'
  },
  content: {
    marginLeft: 20,
    width: '100%',
  },
  time: {
    fontSize: 10,
    color: 'grey',
    marginTop: 2
  }
})
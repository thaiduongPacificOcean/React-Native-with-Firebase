import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Divider } from 'react-native-elements';

const Comments = ({post}) => {
    const navigatiob = useNavigation();
  const time = new Date(post.createdAt.toMillis()).toLocaleString();
  return (
    <View style= {styles.container}> 
      <Divider width={1} orientation='horizontal' color='#d1d1d1'/>
      <View style={styles.title}>
        <Text style={styles.titleText}>Tất cả bình luận</Text>
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
                <Text style={styles.time}>{time}</Text>
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
      },
      title : {
        marginVertical: 10
      },
      titleText : {
        fontWeight: '500',
        fontSize : 15
      }
})
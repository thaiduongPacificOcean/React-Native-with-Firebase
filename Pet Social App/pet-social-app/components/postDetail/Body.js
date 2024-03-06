import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Body = ({post}) => {
  const time = new Date(post.createdAt.toMillis()).toLocaleString();
  const navigation = useNavigation();
  handlePressImage = (image) => {
    navigation.navigate("DetaiImageScreen",{image});
  }
  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <TouchableOpacity onPress={() => handlePressImage(post.imageUrl)}>
          <View style={styles.image}>
            <Image source={{uri: post.imageUrl}} style={styles.postImage}/>
          </View>
        </TouchableOpacity>
        <View style={styles.info}>
          <View style={styles.petInfo}>
            <Text style={styles.fullName}>{post.petName} </Text>
            <View style={styles.user}>
              <Image source={{uri: post.profile_picture}} style={styles.avatar}/>
              <Text style={styles.userName}>{post.username}</Text>
            </View>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.petName}>{post.type}</Text>
          </View>
          <View style={styles.postInfo}>
            <View style={styles.like}>
              <Image source={{uri: 'https://img.icons8.com/metro/26/like.png'}} style={styles.icon}/>
              <Text style={styles.number}>{post.like_by_users.length.toString()}</Text>
            </View>
            <Divider width={1} orientation='vertical' color='#d0d0d0'/>
            <View style={styles.like}>
              <Image source={{uri: 'https://img.icons8.com/metro/26/comments.png'}} style={styles.iconCmt}/>
              <Text style={styles.number}>{post.comments.length.toString()}</Text>
            </View>
          </View>
        </View>
      </View>
      <Divider width={1} orientation='horizontal' color='#d0d0d0'/>
    </View>
  )
}

export default Body

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  bodyContainer : {
    marginBottom: 20,
    flexDirection: 'row',
  },
  image : {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginRight: 20,
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20
  },
  info: {

  },
  petInfo: {
    marginBottom: 20
  },
  user: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  avatar: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 10
  },
  fullName: {
    fontSize: 18,
    fontWeight: '600'
  },
  petName: {
    color: 'grey'
  },
  time: {
    color: 'grey',
    fontSize: 12
  },
  postInfo : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  like: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8
  },
  iconCmt: {
    width: 15,
    height: 15,
    marginRight: 8
  }

})
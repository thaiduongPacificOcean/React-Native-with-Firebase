import { StyleSheet, Text, View , Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

const ProfileBody = ({user}) => {
const defaultImage = 'https://www.chanchao.com.tw/images/default.jpg'
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Image source={{uri: user ? user.profile_picture : defaultImage}} style={styles.userImage}/>
        </View>
      </View>
      <View style={styles.nameContainer}>
        <View>
          <Text style={styles.fullname}>{user && user.fullname}</Text>
        </View>
        <View>
          <Text style={styles.describe}>{user && user.describe}</Text>
        </View>
      </View>
    </View>
  )
}

export default ProfileBody

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 0.5,
    width: 120,
    height: 120,
    padding: 2,
    borderRadius: 60
  },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 60

  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  fullname: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  describe: {
    color: 'grey'
  }


})
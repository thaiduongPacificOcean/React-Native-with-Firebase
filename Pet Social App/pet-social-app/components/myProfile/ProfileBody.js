import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import React from 'react'

const ProfileBody = ({currentUserLogin}) => {
const defaultImage = 'https://www.chanchao.com.tw/images/default.jpg'

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Image source={{uri: currentUserLogin ? currentUserLogin.profile_picture : defaultImage}} style={styles.userImage}/>
        </View>
      </View>
      <View style={styles.nameContainer}>
        <View>
          <Text style={styles.fullname}>{currentUserLogin && currentUserLogin.fullname}</Text>
        </View>
        <View>
          <Text style={styles.describe}>{currentUserLogin && currentUserLogin.describe}</Text>
        </View>
      </View>
    </View>
  )
}

export default ProfileBody

const styles = StyleSheet.create({
  container: {
    
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#B36B39',
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
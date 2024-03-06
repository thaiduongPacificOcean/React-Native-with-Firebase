import { StyleSheet, Text, View , Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

const ProfileBody = ({petOfUser , user}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.petImage}>
          <Image style={styles.petImg} 
          source={{uri: petOfUser && petOfUser.petImageUrl}}/>
        </View>
        <View style={styles.infoPet}>
          <Text style={styles.petName}>{petOfUser && petOfUser.petName}</Text>
          <View style={styles.userInfo}>
            <Image source={{uri:user && user.profile_picture}}
              style={styles.userImg}
            />
            <Text style={styles.userName}>{user && user.username}</Text>
          </View>
          <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
            <Text style={styles.text}>{petOfUser && petOfUser.petName}</Text>
            <Text style={styles.text}> {petOfUser && petOfUser.type}</Text>
          </View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title}>GIỐNG LOÀI</Text>
          <Text style={styles.color}>{petOfUser.detail}</Text>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>MÀU</Text>
          <Text style={styles.color}>{petOfUser.primaryColor} {petOfUser.secondColor}</Text>
        </View>
      </View>
    </View>
  )
}

export default ProfileBody

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  profileContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10
  },
  petImage: {
    borderRadius: 60,
    width: 120,
    height: 120,
    padding: 2,
    marginLeft: 10,
    marginRight: 25
  },
  petImg : {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 60,
  },
  infoPet: {

  },
  userInfo : {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  userImg: {
    width: 20,
    height: 20,
     resizeMode: 'cover',
     borderRadius: 15,
     marginRight: 8,
     marginVertical: 10
  },
  userName : {
    fontWeight:'500',
    color: 'grey'

  },
  petName: {
    color: 'black',
    fontWeight: '700',
    fontSize: 25
  },
  number: {
    color: '#B36B39',
    fontSize: 30,
    fontWeight: '500',
    marginRight: 5
  },
  text : {
    color: 'grey'
  },
  infoContainer : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  titleView : {
    marginRight: 70
  },
  title: {
    color: 'grey',
    fontSize: 16,
    marginBottom: 5
  },
  color: {
    fontWeight: '500',
    fontSize: 16
  }
})
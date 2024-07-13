import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { query, where, limit, collection, onSnapshot, serverTimestamp, Timestamp, addDoc, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { format } from 'date-fns'

const DetailUser = ({ route }) => {

  const navigation = useNavigation();
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Header navigation={navigation} user={user} />
      <Body user={user} />
    </View>
  )
}
const Header = ({ navigation, user }) => {
  const handleDelete = (user) => {
    Alert.alert(
      '🔔 Thông báo:', 'Bạn có chắc chắn muốn gỡ tài khoản này không ?',
      [{
        text: 'OK',
        onPress: () => onDelete(user),
        style: 'cancel',
      },
      {
        text: 'Hủy',
      }]
    )
  }
  const onDelete = async (user) => {
    try {
      const userDocRef = doc(db, 'users', user.owner_userid);
      await deleteDoc(userDocRef);
      navigation.goBack();
      console.log('Đã xóa tài khoản với ID:', user.id);
    } catch (error) {
      console.error('Lỗi khi xóa bài tài khoản:', error);
    }
  };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.iconHeader}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <AntDesign name='arrowleft' size={30} color='#fff' />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
        </View>
        <View style={styles.iconView}>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={() => handleDelete(user)}>
            <MaterialCommunityIcons name="delete" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const Body = ({ user }) => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>User ID: </Text>
          <Text style={styles.infoTitleText}> "{user.owner_userid}"</Text>
        </View>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Email:</Text>
          <Text style={styles.infoTitleText}> "{user.email}"</Text>
        </View>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Created At:</Text>
          <Text style={styles.infoTitleText}> "{user.timestamp && format(user.timestamp.toMillis(), 'dd/MM/yyyy HH:mm')}"</Text>
        </View>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Full Name: </Text>
          <Text style={styles.infoTitleText}> "{user.fullname}"</Text>
        </View>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Username: </Text>
          <Text style={styles.infoTitleText}> "{user.username}"</Text>
        </View>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Describe: </Text>
          <Text style={styles.infoTitleText}> "{user.describe}"</Text>
        </View>
      </View>
      <View style={styles.imageView}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Image</Text>
        </View>
        <TouchableOpacity>
          <Image style={styles.image} source={{ uri: user.profile_picture }} />
        </TouchableOpacity>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Followers: </Text>
          <Text style={styles.infoTitleText}> "{user.follower.length}"</Text>
        </View>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Following: </Text>
          <Text style={styles.infoTitleText}> "{user.following.length}"</Text>
        </View>
      </View>
    </View>
  )
}
export default DetailUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD'
  },
  headerContainer: {
    backgroundColor: '#B36B39',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginVertical: 5
  },
  titleText: {
    color: 'grey',
    fontWeight: '500'
  },
  bodyContainer: {
    padding: 20
  },
  image: {
    height: 100,
    width: 100
  },
  img: {
    width: '100%',
    height: '100%'
  },
  bodyContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    flex: 1
  },
  imageView: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  reportInfo: {
    marginVertical: 5
  },
  info: {
    flexDirection: 'row'
  },
  infoTitle: {
    fontWeight: '500',
    color: 'grey'
  },
  infoTitleText: {
  },
  
})
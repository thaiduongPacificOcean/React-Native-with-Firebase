import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/admin/Header';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Setting = () => {
  const SignOut = async () => {
    await AsyncStorage.removeItem("@user");
    await signOut(auth);
    console.log("Sign Out Success");
  };
  const defaultImage = 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg'

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.pcontainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Image source={{ uri: defaultImage }} style={styles.userImage} />
          </View>
        </View>
        <View style={styles.nameContainer}>
          <View>
            <Text style={styles.fullname}>Admin</Text>
          </View>
          <View>
            <Text style={styles.describe}>adminpetsocial@gmail.com</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.cardContainer}>
              <View style={styles.iconView}>
                <Feather name="headphones" size={24} color="#B36B39" />
              </View>
              <View>
                <Text style={{ fontSize: 16 }}>Team of Service</Text>
              </View>
              <View>
                <AntDesign name="right" size={18} color="grey" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.cardContainer}>
              <View style={styles.iconView}>
                <MaterialIcons name="privacy-tip" size={24} color="#B36B39" />
              </View>
              <View>
                <Text style={{ fontSize: 16 }}>Privacy Policy</Text>
              </View>
              <View>
                <AntDesign name="right" size={18} color="grey" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.cardContainer}>
              <View style={styles.iconView}>
                <AntDesign name="Safety" size={24} color="#B36B39" />
              </View>
              <View>
                <Text style={{ fontSize: 16 }}>Account Safety</Text>
              </View>
              <View>
                <AntDesign name="right" size={18} color="grey" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 30 }} onPress={() => SignOut()}>
          <View style={styles.card}>
            <View style={styles.cardContainer}>
              <View style={styles.iconView}>
                <AntDesign name="logout" size={24} color="#B36B39" />
              </View>
              <View>
                <Text style={{ fontSize: 18 }}>Đăng xuất</Text>
              </View>
              <View>
                <AntDesign name="right" size={18} color="grey" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDD',
    flex: 1
  },
  pcontainer: {

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
  },
  card: {
    height: 70,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    marginBottom: 15
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center'
  },
  iconView: {
    height: 36,
    width: 36,
    padding: 5,
    backgroundColor: '#d0d0d0',
    borderRadius: 18,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  }
})
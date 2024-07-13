import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingScreen = () => {
  const navigation = useNavigation();

  const SignOut = async () => {
    await AsyncStorage.removeItem("@user");
    await signOut(auth);
    console.log("Sign Out Success");
  };
  const handlePressLoginAdmin = () => {
    navigation.navigate('LoginAdminScreen');
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Body SignOut={SignOut} handlePressLoginAdmin={handlePressLoginAdmin}/>
    </SafeAreaView>
  )
}

const Header = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <AntDesign name='arrowleft' size={30} color='#fff' />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Setting</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}></Text>
        </View>
      </View>
    </View>
  )
}
const Body = ({ SignOut , handlePressLoginAdmin}) => {
  return (
    <View style={styles.bodyContainer}>
      <TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.cardContainer}>
            <View style={styles.iconView}>
              <Entypo name="back-in-time" size={24} color="#B36B39" />

            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Transaction History</Text>
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
              <MaterialIcons name="language" size={24} color="#B36B39" />
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Change Language</Text>
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
      <TouchableOpacity onPress={() => handlePressLoginAdmin()}>
        <View style={styles.card}>
          <View style={styles.cardContainer}>
            <View style={styles.iconView}>
              <Entypo name="help-with-circle" size={24} color="#B36B39" />
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Administration</Text>
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
              <Text style={{ fontSize: 16 }}>Đăng xuất</Text>
            </View>
            <View>
              <AntDesign name="right" size={18} color="grey" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0D0D0',
  },
  headerContainer: {
    backgroundColor: '#B36B39',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
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

  },
  titleText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500'
  },
  bodyContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
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
  }
})
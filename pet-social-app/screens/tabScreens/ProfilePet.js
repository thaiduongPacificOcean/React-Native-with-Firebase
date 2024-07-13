import { Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  StyleSheet,
  ScrollView, } from 'react-native'
import React from 'react'
import Header from '../../components/profilePet/Header'
import ProfileBody from '../../components/profilePet/ProfileBody'
import BottomTabView from '../../components/profilePet/BottomTabView'
import ListButton from '../../components/profilePet/ListButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ProfilePet = ({route}) => {
  const navigation = useNavigation();
  const {petOfUser, user} = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <Header petOfUser={petOfUser}/>
      <ProfileBody petOfUser={petOfUser} user = {user}/>
      <BottomTabView petOfUser={petOfUser} user={user}/>      
    </SafeAreaView>
  )
}

export default ProfilePet

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#DDDDDD',
    flex: 1,
  },
  
})
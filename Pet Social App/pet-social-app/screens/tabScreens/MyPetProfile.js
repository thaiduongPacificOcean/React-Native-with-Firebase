import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/myPetProfile/Header';
import ProfileBody from '../../components/myPetProfile/ProfileBody';
import ListButton from '../../components/myPetProfile/ListButton';
import BottomTabView from '../../components/myPetProfile/BottomTabView';

const MyPetProfile = ({route}) => {

  const navigation = useNavigation();
  const {petOfUser, currentUserLogin} = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
        <Header petOfUser={petOfUser} currentUserLogin={currentUserLogin}/>
        <ProfileBody petOfUser={petOfUser} currentUserLogin={currentUserLogin}/>
        <ListButton petOfUser={petOfUser} currentUserLogin={currentUserLogin}/>
        <BottomTabView petOfUser={petOfUser} currentUserLogin={currentUserLogin}/>
    </SafeAreaView>
  )
}

export default MyPetProfile

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#DDDDDD',
    flex: 1
  },
})
import { StyleSheet, Text, View, SafeAreaView, Image,   } from 'react-native'
import React,{useState} from 'react'
import RNPickerSelect from 'react-native-picker-select';
import AddNewPet from '../../components/newPet/AddNewPet'
const CreatePetProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AddNewPet/>
    </SafeAreaView>
  )
}

export default CreatePetProfileScreen

const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
})
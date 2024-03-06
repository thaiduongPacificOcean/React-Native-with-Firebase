import { SafeAreaView , StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddNewPost from '../../components/newPost/AddNewPost'

const NewPostScreen = ({route}) => {
  const {petOfUser} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <AddNewPost petOfUser ={petOfUser}/>
    </SafeAreaView>
  )
}

export default NewPostScreen

const styles = StyleSheet.create({
  container : {
    flex: 1,
    paddingTop: 32,
  }
})
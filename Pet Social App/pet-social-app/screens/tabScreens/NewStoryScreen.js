import { StyleSheet, Text, View , SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import AddNewStory from '../../components/newStory/AddNewStory'

const NewStoryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <AddNewStory />
    </SafeAreaView>
  )
}

export default NewStoryScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: 32,
      }
})
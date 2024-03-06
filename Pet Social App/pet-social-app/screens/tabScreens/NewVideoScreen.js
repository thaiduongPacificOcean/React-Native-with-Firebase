import { StyleSheet, Text, View , SafeAreaView} from 'react-native'
import React from 'react'
import AddNewVideo from '../../components/newVideo/AddNewVideo'

const NewVideoScreen = ({route}) => {
  const {petOfUser} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <AddNewVideo petOfUser ={petOfUser}/>
    </SafeAreaView>
  )
}

export default NewVideoScreen

const styles = StyleSheet.create({
  container : {
    flex: 1,
    paddingTop: 32,
  }
})

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/detailImage/Header'
import Body from '../components/detailImage/Body'

const DetaiImageScreen = ({route}) => {
  const navigation = useNavigation();
  const {image} = route.params;
  return (
    <View style={styles.container}>
      <Header />
      <Body image={image}/>
    </View>
  )
}

export default DetaiImageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
})
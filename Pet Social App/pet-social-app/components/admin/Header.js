import { StyleSheet, Text, View , Image, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Icon name='sort-variant' size={28} color={'#fff'}/>
      <Text style={styles.fullname}>Admin</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#B36B39',
    marginBottom: 10
  },
  fullname: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
})
import { StyleSheet, Text, View , Image, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const Header = ({currentUserLogin}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Icon name='sort-variant' size={28} />
      <Text style={styles.fullname}>{currentUserLogin && currentUserLogin.fullname}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  fullname: {
    color: '#B36B39',
    fontWeight: 'bold',
    fontSize: 14
  },
  avt : {
    height: 25,
    width: 25,
    resizeMode: 'cover',
    borderRadius: 12
  }
})
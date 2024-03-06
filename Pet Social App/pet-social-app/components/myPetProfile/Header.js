import { StyleSheet, Text, View , Image, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Header = ({petOfUser, currentUserLogin}) => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
            <AntDesign name='arrowleft' size={30} color='#B36B39'/>
          </TouchableOpacity>
        </View>
      </View>
    )
}
export default Header

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  searchContainer :{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  username : {
    color: '#B36B39',
    fontSize: 16
  },
  iconContainer : {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: '#B36B39',
    marginLeft: 10
  }
})
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
              <AntDesign name='arrowleft' size={30} color='#fff'/>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
      headerContainer : {
        backgroundColor: 'black',
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
        marginBottom: 10
      },
      header :{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      title : {
    
      },
      titleText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500'
      },
})
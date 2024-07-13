import { StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useNavigation } from '@react-navigation/native'

const HeaderChat = ({user}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
              <AntDesign name='arrowleft' size={30} color='#fff'/>
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>{user && user.fullname}</Text>
          </View>
          <View style={styles.title}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{marginRight: 10}}>
              <Ionicons name="call" size={20} color='#fff'/>    
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
                 <FontAwesome name="video-camera" color='#fff' size={20}/>    
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}

export default HeaderChat

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#D0D0D0',
      },
      headerContainer : {
        backgroundColor: '#B36B39',
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
        flexDirection: 'row',
    
      },
      titleText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500'
      },
})
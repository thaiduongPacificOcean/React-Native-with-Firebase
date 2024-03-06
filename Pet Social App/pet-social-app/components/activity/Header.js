import { StyleSheet, Text, View , Image, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Ionicons } from '@expo/vector-icons';

const Header = ({user}) => {
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
            <Text style={styles.titleText}>Thông báo</Text>
          </View>
          <View style={styles.title}>
            
          </View>
        </View>
    </View>
    )
}

export default Header

const styles = StyleSheet.create({
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

  },
  titleText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500'
  },
})
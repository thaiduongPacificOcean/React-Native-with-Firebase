import { StyleSheet, Text, View, TouchableOpacity , Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Button = ({currentUserLogin}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('EditScreen',{currentUserLogin})}>
        <View style={styles.buttonStatus}>
          <Text style={styles.text}>Chỉnh sửa thông tin cá nhân</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CreatePetProfileScreen')}>
        <View style={styles.buttonStatus}>
          <Text style={styles.text}>Tạo hồ sơ thú cưng</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  buttonStatus: {
    marginVertical: 10,
    marginRight: 10,
    backgroundColor: '#B87C45',
    width: 'auto',
    height: 40,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  text: {
    color: '#fff'
  },
  icon : {
    width: 20,
    height: 20
  }
})
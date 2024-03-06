import { StyleSheet, Text, View ,TouchableOpacity  } from 'react-native'
import React from 'react'

const Notifications = ({currentUserLogin}) => {
  return (
    <View>
      {/* Thông báo */}
      <Text style={{fontWeight: 'bold'}}>Thông báo mới</Text>
      <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <TouchableOpacity>        
              {/* <Text>{currentUserLogin && currentUserLogin.username}</Text> */}
          </TouchableOpacity>
          <Text>Thanh Tùng started following you</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>        
              {/* <Text>{currentUserLogin && currentUserLogin.username}</Text> */}
          </TouchableOpacity>
          <Text>Tường Anh started following you</Text>
      </View>
      {/* Thông báo */}
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({})
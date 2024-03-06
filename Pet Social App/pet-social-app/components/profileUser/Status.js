import { StyleSheet, Text, View , Button, Image} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const Status = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity >
        <View style={styles.buttonStatus}>
          <Text style={styles.text}>Đang theo dõi</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.buttonStatus}>
          <Text style={styles.text}>Nhắn tin</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.buttonStatus}>
          <Image source={require('../../assets/images/user-plus.png')} style={styles.icon}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Status

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  buttonStatus: {
    marginVertical: 10,
    marginRight: 10,
    backgroundColor: '#c2c2c2',
    width: 'auto',
    height: 30,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  text: {

  },
  icon : {
    width: 20,
    height: 20
  }
})
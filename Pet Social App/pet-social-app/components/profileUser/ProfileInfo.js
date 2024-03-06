import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import React from 'react'

const ProfileInfo = ({user}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/gg.png')} style={styles.icon}/>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/fb.png')} style={styles.icon}/>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/linked.png')} style={styles.icon}/>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/insta.png')} style={styles.icon}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default ProfileInfo

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  iconContainer :{
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 30,
    height: 30,
    padding: 5
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10
  }
})
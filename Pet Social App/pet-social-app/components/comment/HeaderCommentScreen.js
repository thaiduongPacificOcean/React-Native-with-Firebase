import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HeaderCommentScreen = ({navigation}) => {
  return (
    <View style={styles.headerContainer}>
          <View style={styles.headerContainerLeft}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <AntDesign name='arrowleft' size={30}/>
            </TouchableOpacity>
            <Text style={{marginLeft: 30 , fontSize: 20, fontWeight:'600'}}>Bình luận</Text>
          </View>
          <View style={styles.headerContainerRight}>
            <TouchableOpacity onPress={()=>{navigation.navigate('HomeChatScreen')}} style={{marginRight: 15}}>
              <Ionicons name='send' size={20} color={'grey'}/>
            </TouchableOpacity>
          </View>
        </View>
  )
}

export default HeaderCommentScreen

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 10
  },
  headerContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})
import { SafeAreaView, StyleSheet, Text, View , TouchableOpacity , Image} from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const AddNewPost = ({petOfUser}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header navigation= {navigation}/>
      <FormikPostUploader petOfUser = {petOfUser}/>
    </View>
  )
}
const Header = ({navigation}) => (
  <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name='arrowleft' size={30} color='grey'/>
      </TouchableOpacity>
      <Text style={styles.headerText}>BÀI VIẾT MỚI</Text>
      <Text></Text>
  </View>
)
export default AddNewPost

const styles = StyleSheet.create({
  container:{
    marginHorizontal: 10,
    marginTop: 10
},
headerContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems : 'center',
    marginBottom: 20
},
icongoBack : {
    width: 30,
    height: 30,
},
headerText:{
    fontSize: 20,
    color: 'grey',
    fontWeight: '500',
    marginRight: 25
}
})
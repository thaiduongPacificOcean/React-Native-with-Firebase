import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import FormikPetUploader from './FormikPetUploader'

const AddNewPet = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FormikPetUploader />
    </View>
  )
}
const Header = ({navigation}) => (
  <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={{uri:'https://img.icons8.com/ios-glyphs/90/111111/back.png'}}
                  style={styles.icongoBack}
          />
      </TouchableOpacity>
      <Text style={styles.headerText}>Tạo hồ sơ mới cho thú cưng</Text>
      <Text></Text>
  </View>
)
export default AddNewPet

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
    fontSize: 30,
    color: 'black',
    marginRight: 25
}
})
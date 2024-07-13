import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import React from 'react'
import FormikStoryUploader from './FormikStoryUploader'
import { useNavigation } from '@react-navigation/native';

const AddNewStory = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Header navigation= {navigation}/>
      <FormikStoryUploader/>
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
      <Text style={styles.headerText}>Thêm khoảnh khắc</Text>
      <Text></Text>
  </View>
)
export default AddNewStory

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
    color: 'black',
    marginRight: 25

}
})
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Stories = ({story}) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity style={{marginBottom: 70, marginTop: 5}}>
        <View style={styles.imgStory}> 
          <Image style={styles.story} source={{uri: story.imageUrl}}/>
        </View>
        <Text style={styles.strName}>
                  {story.username}
        </Text>
      </TouchableOpacity>
    </>
    
  )
}

export default Stories

const styles = StyleSheet.create({
  imgStory : {
    width: 70,
    height: 70,
    padding: 2,
    marginLeft: 15,
    borderColor: '#B36B39',
    borderWidth: 2.5,
    borderRadius: 40,
  },  
  story: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 40,
  },
  strName: {
    color: 'grey',
    textAlign :'center',
    fontSize: 12,
    justifyContent:'center',
    alignContent:'center'
  },
})
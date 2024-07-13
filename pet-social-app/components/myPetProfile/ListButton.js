import { StyleSheet, Text, View , TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ListButton = ({petOfUser, currentUserLogin}) => {
    const navigation = useNavigation();
    const handlePress = (petOfUser) => {
        navigation.navigate('EditPetInfoScreen', {petOfUser});
    }
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => handlePress(petOfUser)}>
            <View style={styles.iconContainer}>
                <Image source={require('../../assets/images/post.png')} style={styles.icon}/>
                <Text style={styles.text}>Edit</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('NewPostScreen', {petOfUser})}>
            <View style={styles.iconContainerPlusIcon}>
                <Image source={require('../../assets/images/camera.png')} style={styles.plusIcon}/>
                <View style={styles.unreadBadge}>
                    <Image source={require('../../assets/images/plus-icon.png')} style={{width : 10, height : 10, tintColor: '#B36B39'}}/>
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('NewVideoScreen',{petOfUser})}>
            <View style={styles.iconContainer}>
                <Image source={require('../../assets/images/heart.png')} style={styles.icon}/>
                <Text style={styles.text}>Add Video</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default ListButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20,
    },
    iconContainer: {
        alignItems: 'center'
    },
    iconContainerPlusIcon: {
        alignItems: 'center',
        backgroundColor: '#B36B39',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center'
    },
    plusIcon: {
        width: 25,
        height: 25,
        tintColor: 'white'
    },
    icon : {
        width: 25,
        height: 25, 
        tintColor: '#B36B39'
    },
    text: {
        color: 'grey',
        fontSize: 10,
        marginTop: 5
    },
    textAdd: {
        color: 'grey',
        fontSize: 10,
    },
    unreadBadge:{
        position: 'absolute',
        backgroundColor : '#fff',
        left: 45,
        bottom: 0,
        width: 20,
        height : 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      },
})
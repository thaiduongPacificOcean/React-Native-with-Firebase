import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View , Animated  } from 'react-native'
import React, {useState , useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

const StoryScreen = ({route}) => {
  const {user} = route.params;
    
  useEffect(() => {
    let timer = setTimeout(() => {
        navigation.goBack();
    },5000);

    Animated.timing(progress,{
        toValue: 5,
        duration: 5000,
        useNativeDriver: false
    }).start();
    return () => clearTimeout(timer);
  }, [])

  const [progress, setProgress] = useState(new Animated.Value(0))

  const progressAnimation = progress.interpolate({
    inputRange: [0 , 5],
    outputRange : ['0%' ,'100%']
  });
  return (
    <View style={styles.container}>
        <View style={styles.storyContainer}>
            <View style={styles.storyDivider}>
                <Animated.View style={{height: '100%',
                    width: progressAnimation,
                    backgroundColor: '#ffffff'}}>
                </Animated.View>
            </View>
            <View style={styles.userView}>
                <View style={styles.storyImgContainer}>
                    <Image source={{uri : user.profile_picture}} style={styles.storyImg}/>
                </View>
                <View style={styles.userName}>
                    <Text style={{color: '#ffffff' , fontSize: 16}}>{user.username}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                        <Ionicons name="close" size={25} color='#ffffff'/>
                    </TouchableOpacity>
                </View>
            </View>
            <Image source={{uri : user.profile_picture}} style={{ height: 600 , width: '100%' , position : 'absolute'}}/>
            <View style={styles.input}>
                <TextInput placeholder='Gửi tin nhắn' placeholderTextColor='#fff' style={styles.textInput}>
                </TextInput>
                <TouchableOpacity onPress={()=> navigation.navigate('HomeChatScreen')}>
                  <Feather name='send' color='#fff' size={30}/>   
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default StoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
},
storyContainer: {
    backgroundColor: 'black',
    height: '100%',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
},
storyDivider: {
    position: 'absolute',
    width: '95%',
    backgroundColor: 'gray',
    height: 3,
    top: 18
},
storyTimeOut : {
    
},
userView: {
    padding: 20,
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 0,
    alignItems: 'center',
    width: '90%',
},
storyImgContainer: {
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
},
storyImg: {
    width: '92%',
    height: '92%',
    borderRadius: 100,
    resizeMode: 'contain',
    backgroundColor: '#f36100'
},
userName : {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginLeft: 15
},
input : {
    position: 'absolute',
    left: 0,
    bottom: 0 , 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,
    width: '95%'
},
textInput: {
    borderColor: '#ffffff',
    borderRadius: 25,
    width: '85%',
    height: 50,
    paddingLeft: 20,
    borderWidth: 1,
    fontSize: 15,
    color: '#fff'
},

})
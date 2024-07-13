import { StyleSheet, Text, TouchableOpacity, View , Image, TextInput, PermissionsAndroid } from 'react-native'
import React, {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import {auth, db} from '../firebaseConfig'
import { collection, doc, updateDoc , getDocs, collectionGroup, onSnapshot, query , orderBy} from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';

const EditVideoScreen = ({route}) => {
  const navigation = useNavigation();
  const {video} = route.params;
  const [videoUri, setVideoUri] = useState('');
  const storage = getStorage();
  const [videoInfo, setVideoInfo] = useState({
      caption: video.caption,
      videoUri: video.videoUrl,
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };
  console.log(videoUri)

  const saveVideoToFirebase = async () => {
    try {
        if (videoUri) {
        const fileUri = videoUri;
        const fileExtension = fileUri.split('.').pop(); // Lấy đuôi file
        const fileName = `${Date.now()}.${fileExtension}`; // Đổi tên file để tránh trùng lặp
        const response = await fetch(fileUri);
        const blob = await response.blob();
        const storageRef = ref(storage, `videos/${fileName}`);
        
        await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(storageRef);
        console.log('File available at', downloadUrl);
    
        // 
        const userDocRef = doc(db, 'users', video.owner_id);
        const petsCollectionRef = doc(userDocRef, 'pets', video.petID);
        const videosCollectionRef = collection(petsCollectionRef, 'videos');
        const videoDocRef = doc(videosCollectionRef, video.id);
    
        await updateDoc(videoDocRef, {
          videoUrl: downloadUrl,
          caption: videoInfo.caption,
        });
      }
      else {
        const userDocRef = doc(db, 'users', video.owner_id);
        const petsCollectionRef = doc(userDocRef, 'pets', video.petID);
        const videosCollectionRef = collection(petsCollectionRef, 'videos');
        const videoDocRef = doc(videosCollectionRef, video.id);
    
          await updateDoc(videoDocRef, {
            caption: videoInfo.caption,
          });
      }
        navigation.navigate('MyProfile');
    }
    catch (error) {
      console.log('Lỗi khi cập nhật thông tin bài viết',error)
    }
 };
  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='close-outline' size={40}/>
        </TouchableOpacity>
        <Text style={{fontSize: 20}}>Chỉnh sửa bài viết</Text>
        <TouchableOpacity onPress={saveVideoToFirebase}>
          <Ionicons name='checkmark' size={35} color='#3493D9'/>
        </TouchableOpacity>
      </View>
      <View style={{padding :10 }}>
        <Text style={styles.text}>Caption</Text>
        <TextInput 
          placeholder='caption'
          defaultValue={video.caption}         
          style={styles.textInput}
          onChangeText={(text) => setVideoInfo({ ...videoInfo, caption: text })}
        />
      </View>
      <View style={{alignItems: 'center' , padding: 20}}>
        {videoUri ? <Video
                source={{ uri: videoUri }}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay
            /> : 
            <Video
            source={{ uri: video.videoUrl }}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay
        />}
        <TouchableOpacity onPress={pickImage}>
          <Text style={{color:'#3493D9'}}>
              Thay đổi video 
          </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default EditVideoScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: 40,
    paddingHorizontal: 10
  },
  text: {
    fontSize: 16 , opacity: 0.5 , marginBottom: 5
  },
  textInput: {
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
    height: 40
  },
  video: {
    width: '100%', 
    height: 450, 
    resizeMode: 'cover', 
    marginBottom: 10
  }
})
import { StyleSheet, Text, TouchableOpacity, View , Image, TextInput, PermissionsAndroid } from 'react-native'
import React, {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import {auth, db} from '../firebaseConfig'
import { collection, doc, updateDoc , getDocs, collectionGroup, onSnapshot, query , orderBy} from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';

const EditPostScreen = ({route}) => {
  const navigation = useNavigation();
  const {post} = route.params;
  const [imageUri, setImageUri] = useState('');
  const storage = getStorage();
  const [postInfo, setPostInfo] = useState({
      caption: post.caption,
      imageUri: post.imageUrl,
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  console.log(imageUri)

  const saveImageToFirebase = async () => {
    try {
        if (imageUri) {
        const fileUri = imageUri;
        const fileExtension = fileUri.split('.').pop(); // Lấy đuôi file
        const fileName = `${Date.now()}.${fileExtension}`; // Đổi tên file để tránh trùng lặp
        const response = await fetch(fileUri);
        const blob = await response.blob();
        const storageRef = ref(storage, `images/${fileName}`);
        
        await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(storageRef);
        console.log('File available at', downloadUrl);
    
        // 
        const userDocRef = doc(db, 'users', post.owner_id);
        const petsCollectionRef = doc(userDocRef, 'pets', post.petID);
        const postsCollectionRef = collection(petsCollectionRef, 'posts');
        const postDocRef = doc(postsCollectionRef, post.id);
    
        await updateDoc(postDocRef, {
          imageUrl: downloadUrl,
          caption: postInfo.caption,
        });
      }
      else {
        const userDocRef = doc(db, 'users', post.owner_id);
        const petsCollectionRef = doc(userDocRef, 'pets', post.petID);
        const postsCollectionRef = collection(petsCollectionRef, 'posts');
        const postDocRef = doc(postsCollectionRef, post.id);
    
          await updateDoc(postDocRef, {
            caption: postInfo.caption,
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
        <TouchableOpacity onPress={saveImageToFirebase}>
          <Ionicons name='checkmark' size={35} color='#3493D9'/>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center' , padding: 20}}>
        {imageUri  ? < Image source={{uri:imageUri}} style={styles.avatar}/> : < Image source={{uri:post.imageUrl}} style={styles.avatar}/>}
        <TouchableOpacity onPress={pickImage}>
          <Text style={{color:'#3493D9'}}>
              Thay đổi ảnh bài viết
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{padding :10 }}>
        <Text style={styles.text}>Caption</Text>
        <TextInput 
          placeholder='caption'
          defaultValue={post.caption}         
          style={styles.textInput}
          onChangeText={(text) => setPostInfo({ ...postInfo, caption: text })}
        />
      </View>
    </View>
  )
}

export default EditPostScreen

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
  avatar: {
    width:80, height: 80 , resizeMode: 'cover', borderRadius: 40, marginBottom: 10
  }
})
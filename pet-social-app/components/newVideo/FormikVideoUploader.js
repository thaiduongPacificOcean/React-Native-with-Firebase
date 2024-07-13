import { StyleSheet, TextInput, View, TouchableOpacity, Button, Image} from 'react-native'
import React , {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {Formik} from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { auth ,db} from '../../firebaseConfig'
import { query , where , limit, collection , onSnapshot , serverTimestamp, Timestamp ,addDoc, setDoc ,doc} from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker';
import { connectStorageEmulator, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { ResizeMode, Video } from 'expo-av';

const PLACEHOLDER_IMG = 'https://legaltracking.com.mx/wp-content/uploads/2020/01/placeholder-900x600.png'
const FormikVideoUploader = ({petOfUser}) => {
    const navigation = useNavigation();
    const storage = getStorage();
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)
    const [videoUri, setVideoUri] = useState('');
    
    const getUsername = async () => {
      const user = auth.currentUser;
      const q = query(collection(db, 'users'), where('owner_userid', '==', user.uid), limit(1));
      const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.forEach((doc) => {
              setCurrentLoggedInUser({
                  username: doc.data().username,
                  fullname: doc.data().fullname,
                  profile_picture: doc.data().profile_picture,
                  owner_id: doc.data().owner_userid,
                  email: doc.data().email
      });
      console.log(currentLoggedInUser);
    });
  });

      return unsubscribe;
  };

  useEffect(()=>{
      getUsername()
  },[]);

  // Hàm pick Video
  const pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setVideoUri(result.assets?.[0]?.uri || '');
        console.log(videoUri);
      }
    } catch (error) {
      console.error('Lỗi khi chọn video:', error);
    }
  };
  // Hàm lưu video vào Firebase
  const uploadVideoToFirebase = async (caption) => {
    try {
      const petID = petOfUser.petID;
      const userDocRef = doc(db, 'users', currentLoggedInUser.owner_id);
      const petsCollectionRef = doc(userDocRef, 'pets', petID);
      const videosCollectionRef = collection(petsCollectionRef, 'videos');
  
      const fileUri = videoUri;
      const fileExtension = fileUri.split('.').pop();
      const fileName = `${Date.now()}.${fileExtension}`;
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `videos/${fileName}`);
        
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
  
      const newVideo = {
        videoUrl: downloadUrl,
        username: currentLoggedInUser.username,
        caption: caption,
        profile_picture: currentLoggedInUser.profile_picture,
        owner_id: auth.currentUser.uid,
        petID: petID,
        createdAt: serverTimestamp(),
        like: 0,
        like_by_users: [],
        comments: [],
        type: petOfUser.type,
        fullname: currentLoggedInUser.fullname,
        petName: petOfUser.petName
      };
      const videoRef = await addDoc(videosCollectionRef, newVideo);
      console.log("Check Id created : " + newVideo.id);
      navigation.goBack();
    }
    catch (error) {
      console.log('Lỗi khi đăng video' , error);
    }
  }
  return (
    <Formik
        initialValues={{caption: ''}}
        onSubmit={values => { 
            uploadVideoToFirebase(values.caption)
        }}
        validateOnMount={true}
    >
        {({handleBlur,handleChange,handleSubmit,values,errors, isValid})=>
            <>
                <View style={styles.form}>
                  <View style={styles.caption}>
                    <TextInput placeholder='Viết nội dung ... ' 
                      style={styles.input}
                      placeholderTextColor={'grey'} 
                      multiline={true}
                      onChangeText={handleChange('caption')}
                      onBlur={handleBlur('caption')}
                      value={values.caption}
                    />      
                  </View>                           
                    <TouchableOpacity onPress={pickVideo}>
                        
                        {videoUri ? (
                          <Video 
                            source={{uri : videoUri }} 
                            style={styles.video} 
                            resizeMode= {ResizeMode.COVER} 
                            isLooping
                            shouldPlay
                          />  
                        ):(
                          <Image source={{uri: PLACEHOLDER_IMG}} 
                                style={{
                                    width: '100%',
                                    height: 280,
                                    borderRadius: 10,
                                }}
                        />
                        )}
                    </TouchableOpacity>
                </View>
                <Divider/>
                <Button title='Đăng video' onPress={handleSubmit} disabled={!isValid} color={'#B36B39'}/>
            </>
        }
    </Formik>
  )
}

export default FormikVideoUploader

const styles = StyleSheet.create({
  form: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  caption: {
    marginVertical: 20,
    height: 80,
  },
  input: {
    padding: 20,
    backgroundColor: '#ddd',
    height: '100%',
    borderRadius: 10
  },
  video : {
    width: '100%',
    height: 500,

    borderRadius: 10,
  }
})
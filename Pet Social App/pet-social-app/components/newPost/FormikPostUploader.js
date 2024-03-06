import { StyleSheet, TextInput, View, TouchableOpacity, Button, Image} from 'react-native'
import React , {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {Formik} from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { auth ,db} from '../../firebaseConfig'
import { query , where , limit, collection , onSnapshot , serverTimestamp, Timestamp ,addDoc, setDoc ,doc} from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker';
import { connectStorageEmulator, getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';

const PLACEHOLDER_IMG = 'https://legaltracking.com.mx/wp-content/uploads/2020/01/placeholder-900x600.png'

const FormikPostUploader = ({petOfUser}) => {
  
    const navigation = useNavigation();
    const [thumbnailUrl, setthumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)
    const [imageUri, setImageUri] = useState('');
    const storage = getStorage();

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

    // Hàm pick Image từ máy
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
      console.log('Đường dẫn hình : ',imageUri)

    // Hàm đăng bài viết  
    const uploadPostToFirebase = async (caption) => {
      try {

          const petID = petOfUser.petID;

          const userDocRef = doc(db, 'users', currentLoggedInUser.owner_id);
          const petsCollectionRef = doc(userDocRef, 'pets', petID);
          const postsCollectionRef = collection(petsCollectionRef, 'posts');

          const fileUri = imageUri;
          const fileExtension = fileUri.split('.').pop(); // Lấy đuôi file
          const fileName = `${Date.now()}.${fileExtension}`; // Đổi tên file để tránh trùng lặp
          const response = await fetch(fileUri);
          const blob = await response.blob();
          const storageRef = ref(storage, `images/${fileName}`);
          
          await uploadBytes(storageRef, blob);
          const downloadUrl = await getDownloadURL(storageRef);
          console.log('File available at', downloadUrl); 
          
          console.log("Check Email : "+ auth.currentUser.email);
          console.log("Check ID : "+ currentLoggedInUser.owner_id);
          console.log("Check fullname : "+ currentLoggedInUser.fullname);
          console.log("Check fullname : "+ currentLoggedInUser.username);

          const newPost = {
            imageUrl: downloadUrl,
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
          const postRef = await addDoc(postsCollectionRef, newPost);
          console.log("Check Id created : " + newPost.id);
          navigation.goBack();
        } 
        catch(error) {
          console.log('Lỗi khi đăng bài' , error);
        }
      }
  return (
    <Formik
        initialValues={{caption: ''}}
        onSubmit={values => { 
            uploadPostToFirebase(values.caption)
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
                    <TouchableOpacity onPress={pickImage}>
                        <Image source={{uri:validUrl.isUri(imageUri )? imageUri :PLACEHOLDER_IMG}} 
                                style={{
                                    width: '100%',
                                    height: 280,
                                    borderRadius: 10,

                                }}
                        />  
                    </TouchableOpacity>
                </View>
                <Divider/>
                <Button title='Đăng bài' onPress={handleSubmit} disabled={!isValid} color={'#B36B39'}/>
            </>
        }
    </Formik>
  )
}

export default FormikPostUploader

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
  }
})
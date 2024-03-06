import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { auth, db } from '../firebaseConfig'
import { collection, doc, updateDoc, getDocs, collectionGroup, onSnapshot, query, orderBy } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';


const EditScreen = ({ route }) => {

  const navigation = useNavigation();
  const { currentUserLogin } = route.params;
  const [imageUri, setImageUri] = useState('');
  const storage = getStorage();

  const [userInfo, setUserInfo] = useState({
    username: currentUserLogin.username,
    fullname: currentUserLogin.fullname,
    imageUri: currentUserLogin.profile_picture,
    describe: currentUserLogin.describe,
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
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          profile_picture: downloadUrl,
          username: userInfo.username,
          fullname: userInfo.fullname,
          describe: userInfo.describe,
        });
        const petsQuery = collection(userRef, 'pets');
        const petsSnapshot = await getDocs(petsQuery);
        // const postsQuery = query(collection(petsQuery, 'posts'));
        // const snapshot = await getDocs(postsQuery);
        // snapshot.forEach(docRef => {
        //   updateDoc(docRef.ref, {
        //     profile_picture: downloadUrl,
        //     username: userInfo.username,
        //     fullname: userInfo.fullname,
        //   });
        // });
        petsSnapshot.forEach(async (petDoc) => {
          const petId = petDoc.id;
          const postsQuery = query(collection(petsQuery, petId, 'posts'));

          const postsSnapshot = await getDocs(postsQuery);

          postsSnapshot.forEach(async (postDoc) => {
            await updateDoc(postDoc.ref, {
              profile_picture: downloadUrl,
              username: userInfo.username,
              fullname: userInfo.fullname,
              describe: userInfo.describe,
            });
          });
        });
      }
      else {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          username: userInfo.username,
          fullname: userInfo.fullname,
          describe: userInfo.describe,
        });
        const petsQuery = collection(userRef, 'pets');
        const petsSnapshot = await getDocs(petsQuery);
        // const postsQuery = query(collection(petsQuery, 'posts'));
        // const snapshot = await getDocs(postsQuery);
        // snapshot.forEach(docRef => {
        //   updateDoc(docRef.ref, {
        //     profile_picture: downloadUrl,
        //     username: userInfo.username,
        //     fullname: userInfo.fullname,
        //   });
        // });
        petsSnapshot.forEach(async (petDoc) => {
          const petId = petDoc.id;
          const postsQuery = query(collection(petsQuery, petId, 'posts'));

          const postsSnapshot = await getDocs(postsQuery);

          postsSnapshot.forEach(async (postDoc) => {
            await updateDoc(postDoc.ref, {
              username: userInfo.username,
              fullname: userInfo.fullname,
              describe: userInfo.describe,
            });
          });
        });
      }
      navigation.navigate('MyProfile');
    }
    catch (error) {
      console.log('Lỗi khi cập nhật thông tin người dùng', error);
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
          <Ionicons name='close-outline' size={40} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>Chỉnh sửa thông tin</Text>
        <TouchableOpacity onPress={saveImageToFirebase}>
          <Ionicons name='checkmark' size={35} color='#3493D9' />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', padding: 20 }}>
        {imageUri ? < Image source={{ uri: imageUri }} style={styles.avatar} /> : < Image source={{ uri: currentUserLogin.profile_picture }} style={styles.avatar} />}
        <TouchableOpacity onPress={pickImage}>
          <Text style={{ color: '#3493D9' }}>
            Thay đổi ảnh đại diện
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.text}>Tên người dùng</Text>
        <TextInput
          placeholder='Tên người dùng'
          defaultValue={currentUserLogin.fullname}
          style={styles.textInput}
          onChangeText={(text) => setUserInfo({ ...userInfo, fullname: text })}
        />
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.text}>Tên tài khoản</Text>
        <TextInput
          placeholder='Tên tài khoản'
          defaultValue={currentUserLogin.username}
          style={styles.textInput}
          onChangeText={(text) => setUserInfo({ ...userInfo, username: text })}

        />
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          placeholder={currentUserLogin.email}
          style={styles.textInput}
        />
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.text}>Mô tả</Text>
        <TextInput
          placeholder='Thêm mô tả'
          defaultValue={currentUserLogin.describe}
          style={styles.textInput}
          onChangeText={(text) => setUserInfo({ ...userInfo, describe: text })}

        />
      </View>
    </View>
  )
}

export default EditScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: 40,
    paddingHorizontal: 10
  },
  text: {
    fontSize: 16, opacity: 0.5, marginBottom: 5
  },
  textInput: {
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
    height: 40
  },
  avatar: {
    width: 80, height: 80, resizeMode: 'cover', borderRadius: 40, marginBottom: 10
  }
})
import { StyleSheet, TextInput, View, TouchableOpacity, Button, Image , Text, ScrollView, Pressable} from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import {Formik} from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { auth ,db} from '../../firebaseConfig'
import { query , where , limit, collection , onSnapshot , serverTimestamp, Timestamp ,addDoc, setDoc ,doc, updateDoc} from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons'
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign'

const PLACEHOLDER_IMG = 'https://legaltracking.com.mx/wp-content/uploads/2020/01/placeholder-900x600.png'

const FormikPetUploader = () => {
  const [petInfo, setPetInfo] = useState({
    imageUri: '',
    name: '',
    primaryColor: 'Vàng',
    secondColor: 'Vàng',
    describe: '',
    birthDate: new Date(),
    type: 'Dog',
    detail: '',
    sex: '',
  });
  const navigation = useNavigation();
  const [thumbnailUrl, setthumbnailUrl] = useState(PLACEHOLDER_IMG)
    
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)
    const [imageUri, setImageUri] = useState('');
    const storage = getStorage();
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const getUsername = async () => {
        const user = auth.currentUser;
        const q = query(collection(db, 'users'), where('owner_userid', '==', user.uid), limit(1));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
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
      console.log(imageUri)

    // 
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || petInfo.birthDate;
      setShowDatePicker(false);
      setPetInfo({ ...petInfo, birthDate: currentDate });
    };
  
    // Hàm đăng bài viết  
    
    const uploadPetInfoToFirebase = async () => {
        try {

          const userDocRef = doc(db, 'users', currentLoggedInUser.owner_id);

          const petsCollectionRef = collection(userDocRef, 'pets');

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

          const newPet = {
            petImageUrl: downloadUrl,
            petName: petInfo.name,
            birthDate: petInfo.birthDate,
            type: petInfo.type,
            describe: petInfo.describe,
            username: currentLoggedInUser.username,
            profile_picture: currentLoggedInUser.profile_picture,
            owner_id: auth.currentUser.uid,
            createdAt: serverTimestamp(),
            petID: '',
            detail: petInfo.detail,
            sex: petInfo.sex,
            primaryColor: petInfo.primaryColor,
            secondColor: petInfo.secondColor
          };
          const petRef = await addDoc(petsCollectionRef, newPet);
          
          // Cập nhật trường petID với giá trị là ID của document
          await updateDoc(petRef, {
            petID: petRef.id,
          });

          console.log("Check Id created : " + newPet.id);
          navigation.goBack();
        } 
        catch(error) {
          console.log(error);
        }
      }
  
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='arrowleft' size={30} color='grey'/>
        </TouchableOpacity>
        <Text style={{fontSize: 18, color: 'grey', fontWeight:'500' }}>TẠO HỒ SƠ</Text>
        <TouchableOpacity onPress={uploadPetInfoToFirebase}>
          <Ionicons name='checkmark' size={35} color='#B36B39'/>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 80}}>
        <View>
          <View style={{alignItems: 'center' , padding: 20}}>
            {imageUri  ? < Image source={{uri:imageUri}} style={styles.avatar}/> : < Image source={{uri: PLACEHOLDER_IMG}} style={styles.avatar}/>}
            <TouchableOpacity onPress={pickImage}>
              <Text style={{color:'#3493D9'}}>
                  Cập nhật ảnh đại diện cho thú cưng
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{padding :10 }}>
            <Text style={styles.text}>Tên thú cưng</Text>
            <TextInput 
              placeholder=''
              style={styles.textInput}
              onChangeText={(text) => setPetInfo({ ...petInfo, name: text })}
            />
          </View>
          <View style={styles.color}>
            <Text style={styles.text}>Màu sắc</Text>
            <View style={styles.pickerView}>
              <Picker
                selectedValue={petInfo.primaryColor}
                onValueChange={(itemValue, itemIndex) =>
                  setPetInfo({...petInfo, primaryColor: itemValue})
                }
                style={styles.picker}
                >
                <Picker.Item label="Vàng" value="Vàng" />
                <Picker.Item label="Đỏ" value="Đỏ" />
                <Picker.Item label="Nâu" value="Nâu" />
                <Picker.Item label="Đen" value="Đen" />
                <Picker.Item label="Trắng" value="Trắng" />
                <Picker.Item label="Hồng" value="Hồng" />
                <Picker.Item label="Xám" value="Xám" />
              </Picker>
              <Picker
                selectedValue={petInfo.secondColor}
                onValueChange={(itemValue, itemIndex) =>
                  setPetInfo({...petInfo, secondColor: itemValue})
                }
                style={styles.picker}
                >
                <Picker.Item label="Vàng" value="Vàng" />
                <Picker.Item label="Đỏ" value="Đỏ" />
                <Picker.Item label="Nâu" value="Nâu" />
                <Picker.Item label="Đen" value="Đen" />
                <Picker.Item label="Trắng" value="Trắng" />
                <Picker.Item label="Hồng" value="Hồng" />
                <Picker.Item label="Xám" value="Xám" />
              </Picker>
            </View>
          </View>
          <View style={{padding :10 }}>
            <Text style={styles.text}>Mô tả</Text>
            <TextInput 
              placeholder='Vd: Sở thích'
              style={styles.textInput}
              onChangeText={(text) => setPetInfo({ ...petInfo, describe: text })}
            />
          </View>
          <View style={{padding :10 }}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.text}>Ngày sinh</Text>
            </TouchableOpacity>
              <TextInput 
                placeholder='00/00/0000'
                style={styles.textInput}
                value={petInfo.birthDate.toLocaleString()}
                onFocus={() => setShowDatePicker(true)}
              />
            {showDatePicker && (
            <DateTimePicker
              value={petInfo.birthDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}
          </View>
          <View style={{paddingHorizontal :10}}>
            <Text style={styles.text}>Loại</Text>
            <Picker
              selectedValue={petInfo.type}
              onValueChange={(itemValue, itemIndex) =>
                setPetInfo({...petInfo, type: itemValue})
              }
              style={styles.picker}>
              <Picker.Item label="Dog" value="Dog" />
              <Picker.Item label="Cat" value="Cat" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          <View style={{padding :10 }}>
            <Text style={styles.text}>Chi tiết</Text>
            <TextInput 
              placeholder='Vd: Husky, Chihua-hua'
              style={styles.textInput}
              onChangeText={(text) => setPetInfo({ ...petInfo, detail: text })}
            />
          </View>
          <View style={{padding :10 }}>
            <Text style={styles.text}>Giới tính</Text>
            <Picker
              selectedValue={petInfo.sex}
              onValueChange={(itemValue, itemIndex) =>
                setPetInfo({...petInfo, sex: itemValue})
              }
              style={styles.picker}
              >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default FormikPetUploader

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 30
  },
  text: {
    fontSize: 16 , opacity: 0.5 , marginBottom: 5
  },
  textInput: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#CDCDCD',
    height: 50,
    padding: 10,
    borderRadius: 2,
    backgroundColor: '#DDD'
  },
  avatar: {
    width: 100, 
    height: 100 , 
    resizeMode: 'cover', 
    borderRadius: 50, 
    marginBottom: 10
  },
  color: {
    paddingHorizontal: 10
  },
  pickerView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  picker: {
    width: '49%',
    backgroundColor: '#ddd',
    borderRadius: 2
  }
})
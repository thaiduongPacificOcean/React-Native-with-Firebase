import { StyleSheet, Text, TouchableOpacity, View , Image, TextInput, PermissionsAndroid, ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import {auth, db} from '../firebaseConfig'
import { collection, doc, updateDoc , getDocs, collectionGroup, onSnapshot, query , orderBy} from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons'
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { format } from 'date-fns';

const PLACEHOLDER_IMG = 'https://legaltracking.com.mx/wp-content/uploads/2020/01/placeholder-900x600.png'

const EditPetInfoScreen = ({route}) => {

    const navigation = useNavigation();
    const {petOfUser} = route.params;
    const [petImageUrl, setPetImageUrl] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [editedBirthDate, setEditedBirthDate] = useState(petOfUser.birthDate.toMillis());
    const storage = getStorage();

    const [petInfo, setPetInfo] = useState({
        petImageUrl: petOfUser.petImageUrl,
        petName: petOfUser.petName,
        primaryColor: petOfUser.primaryColor,
        secondColor: petOfUser.secondColor,
        birthDate: petOfUser.birthDate,
        type: petOfUser.type,
        detail: petOfUser.detail,
        sex: petOfUser.sex,
        describe: petOfUser.describe
      });
      console.log(petInfo.birthDate);
    
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || editedBirthDate;
        setShowDatePicker(false);
        setEditedBirthDate(currentDate);
        setPetInfo({ ...petInfo, birthDate: currentDate });
      };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setPetImageUrl(result.assets[0].uri);
        }
    };
    console.log(petImageUrl)
    const uploadPetInfoToFirebase = async () => {
        try {
            if(petImageUrl) {
                const fileUri = petImageUrl;
                const fileExtension = fileUri.split('.').pop(); // Lấy đuôi file
                const fileName = `${Date.now()}.${fileExtension}`; // Đổi tên file để tránh trùng lặp
                const response = await fetch(fileUri);
                const blob = await response.blob();
                const storageRef = ref(storage, `images/${fileName}`);
                await uploadBytes(storageRef, blob);
                const downloadUrl = await getDownloadURL(storageRef);
                console.log('File available at', downloadUrl);
                
                const userRef = doc(db, 'users', auth.currentUser.uid);
                const petsCollectionRef = doc(userRef, 'pets', petOfUser.petID);

                await updateDoc(petsCollectionRef, {
                    petImageUrl: downloadUrl,
                    petName: petInfo.petName,
                    primaryColor: petInfo.primaryColor,
                    secondColor: petInfo.secondColor,
                    birthDate: petInfo.birthDate,
                    type: petInfo.type,
                    detail: petInfo.detail,
                    sex: petInfo.sex,
                    describe: petInfo.describe
                });
            }
            else {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                const petsCollectionRef = doc(userRef, 'pets', petOfUser.petID);
                await updateDoc(petsCollectionRef, {
                    petName: petInfo.petName,
                    primaryColor: petInfo.primaryColor,
                    secondColor: petInfo.secondColor,
                    birthDate: petInfo.birthDate,
                    type: petInfo.type,
                    detail: petInfo.detail,
                    sex: petInfo.sex,
                    describe: petInfo.describe
                });
            }
        navigation.goBack();
        }
        catch (error) {
            console.log('Lỗi khi chỉnh sửa thông tin pet',error);
        }
    }


  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='arrowleft' size={30} color='grey'/>
        </TouchableOpacity>
        <Text style={{fontSize: 18, color: 'grey', fontWeight:'500' }}>CHỈNH SỬA</Text>
        <TouchableOpacity onPress={uploadPetInfoToFirebase}>
          <Ionicons name='checkmark' size={35} color='#B36B39'/>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 80}}>
        <View>
          <View style={{alignItems: 'center' , padding: 20}}>
            {petImageUrl ? < Image source={{uri:petImageUrl}} style={styles.avatar}/> : < Image source={{uri: petOfUser.petImageUrl}} style={styles.avatar}/>}
            <TouchableOpacity onPress={pickImage}>
              <Text style={{color:'#3493D9'}}>
                  Cập nhật ảnh đại diện cho thú cưng
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{padding :10 }}>
            <Text style={styles.text}>Tên thú cưng</Text>
            <TextInput 
              placeholder= ''
              defaultValue={petInfo.petName}
              style={styles.textInput}
              onChangeText={(text) => setPetInfo({ ...petInfo, petName: text })}
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
              defaultValue={petInfo.describe}
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
                value={ editedBirthDate
                    ? format(new Date(editedBirthDate), 'dd/MM/yyyy HH:mm')
                    : ''}
                onFocus={() => setShowDatePicker(true)}
              />
            {showDatePicker && (
            <DateTimePicker
              value={editedBirthDate
                ? new Date(editedBirthDate)
                : new Date()}
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
              defaultValue={petInfo.detail}
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

export default EditPetInfoScreen

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
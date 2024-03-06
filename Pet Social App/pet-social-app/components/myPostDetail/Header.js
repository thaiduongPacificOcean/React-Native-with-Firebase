import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { query , where , limit, collection , onSnapshot , serverTimestamp, Timestamp ,addDoc, setDoc ,doc , deleteDoc } from 'firebase/firestore'
import { auth ,db} from '../../firebaseConfig'
const Header = ({post}) => {
    const navigation = useNavigation();
  
  const handleDelete = (post) => {
    Alert.alert(
      '🔔 Thông báo:', 'Bạn có chắc chắn muốn xóa bài viết này không ?' ,
      [{
          text : 'OK',
          onPress: () => onDelete(post),
          style : 'cancel',
      },
      {
          text : 'Hủy',
      }]
    )
  }
  const onDelete = async (post) => {
    try {
      const userDocRef = doc(db, 'users', post.owner_id);
      const petsCollectionRef = doc(userDocRef, 'pets', post.petID);
      const postsCollectionRef = collection(petsCollectionRef, 'posts');
  
      const postDocRef = doc(postsCollectionRef, post.id);
      await deleteDoc(postDocRef);
      navigation.goBack();
      console.log('Đã xóa bài đăng với ID:', post.id);
    } catch (error) {
      console.error('Lỗi khi xóa bài đăng:', error);
    }  
  };
  return (
    <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
              <AntDesign name='arrowleft' size={30} color='#fff'/>
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>Bài viết của {post.petName}</Text>
          </View>
            <View style={styles.iconView}>
              <TouchableOpacity style={{marginRight: 10}} onPress={() => handleDelete(post)}>
                <MaterialCommunityIcons name="delete" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer : {
        backgroundColor: '#B36B39',
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
        marginBottom: 10
      },
      header :{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      title : {
    
      },
      titleText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500'
      },
      
})
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { Divider } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { query, where, limit, collection, onSnapshot, serverTimestamp, Timestamp, addDoc, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';

const DetailReport = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header navigation={navigation} item={item} />
      <Body item={item} />
    </View>
  )
}
const Header = ({ navigation, item }) => {
  const handleDelete = (item) => {
    Alert.alert(
      '🔔 Thông báo:', 'Bạn có chắc chắn muốn gỡ bỏ bài viết này không ?',
      [{
        text: 'OK',
        onPress: () => onDelete(item),
        style: 'cancel',
      },
      {
        text: 'Hủy',
      }]
    )
  }
  const onDelete = async (item) => {
    try {
      const userDocRef = doc(db, 'users', item.owner_id);
      const petsCollectionRef = doc(userDocRef, 'pets', item.petID);
      const postsCollectionRef = collection(petsCollectionRef, 'posts');

      const postDocRef = doc(postsCollectionRef, item.id);
      await deleteDoc(postDocRef);
      navigation.goBack();
      console.log('Đã xóa bài đăng với ID:', item.id);
    } catch (error) {
      console.error('Lỗi khi xóa bài đăng:', error);
    }
  };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.iconHeader}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <AntDesign name='arrowleft' size={30} color='#fff' />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
        </View>
        <View style={styles.iconView}>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={() => handleDelete(item)}>
            <MaterialCommunityIcons name="delete" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const Body = ({ item }) => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Post ID: </Text>
          <Text style={styles.infoTitleText}> "{item.postId}"</Text>
        </View>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Caption:</Text>
          <Text style={styles.infoTitleText}> "{item.postInfo.caption}"</Text>
        </View>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Created At:</Text>
          <Text style={styles.infoTitleText}> "{item.postInfo.createdAt && format(item.postInfo.createdAt.toMillis(), 'dd/MM/yyyy HH:mm')}"</Text>
        </View>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Owner ID: </Text>
          <Text style={styles.infoTitleText}> "{item.postInfo.owner_id}"</Text>
        </View>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Pet ID: </Text>
          <Text style={styles.infoTitleText}> "{item.postInfo.petID}"</Text>
        </View>
      </View>
      <View style={styles.imageView}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Hình ảnh</Text>
        </View>
        <TouchableOpacity>
          <Image style={styles.image} source={{ uri: item.postInfo.imageUrl }} />
        </TouchableOpacity>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Lý do báo cáo: </Text>
          <Text style={styles.infoTitleText}> "{item.reason}"</Text>
        </View>
      </View>

    </View>
  )
}
export default DetailReport

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD'
  },
  headerContainer: {
    backgroundColor: '#B36B39',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {

  },
  titleText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500'
  },
  bodyContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    flex: 1
  },
  imageView: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  reportInfo: {
    marginVertical: 5
  },
  info: {
    flexDirection: 'row'
  },
  infoTitle: {
    fontWeight: '500',
    color: 'grey'
  },
  infoTitleText: {
  },
  iconHeader: {
    width: 25,
    height: 25,
    marginRight: 8,
    tintColor: 'grey'
  },
  title: {
    marginVertical: 10
  },
  titleText: {
    fontWeight: '500',
    color: 'grey'
  }
})
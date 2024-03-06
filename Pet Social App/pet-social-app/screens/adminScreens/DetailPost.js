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

const DetailPost = ({ route }) => {
  const navigation = useNavigation();
  const { post } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header navigation={navigation} post={post} />
        <Body post={post} />
      </ScrollView>
    </View>
  )
}
const Header = ({ navigation, post }) => {
  const handleDelete = (post) => {
    Alert.alert(
      '🔔 Thông báo:', 'Bạn có chắc chắn muốn gỡ bài viết này không ?',
      [{
        text: 'OK',
        onPress: () => onDelete(post),
        style: 'cancel',
      },
      {
        text: 'Hủy',
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
        <View style={styles.iconHeader}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <AntDesign name='arrowleft' size={30} color='#fff' />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
        </View>
        <View style={styles.iconView}>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={() => handleDelete(post)}>
            <MaterialCommunityIcons name="delete" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const Body = ({ post }) => {
  return (
      <View style={styles.bodyContainer}>
        <View style={styles.infoPostView}>
          <View style={styles.infoPost}>
            <Text style={styles.infoTitle}>Post ID: </Text>
            <Text style={styles.infoTitleText}> "{post.id}"</Text>
          </View>
        </View>
        <View style={styles.infoPostView}>
          <View style={styles.infoPost}>
            <Text style={styles.infoTitle}>Created At: </Text>
            <Text style={styles.infoTitleText}> "{post.createdAt && format(post.createdAt.toMillis(), 'dd/MM/yyyy HH:mm')}"</Text>
          </View>
        </View>
        <View style={styles.infoPostView}>
          <View style={styles.infoPost}>
            <Text style={styles.infoTitle}>Username: </Text>
            <Text style={styles.infoTitleText}> "{post.username}"</Text>
          </View>
        </View>
        <View style={styles.infoPostView}>
          <View style={styles.infoPost}>
            <Text style={styles.infoTitle}>Owner ID: </Text>
            <Text style={styles.infoTitleText}> "{post.owner_id}"</Text>
          </View>
        </View>
        <View style={styles.imageView}>
          <TouchableOpacity>
            <Image style={styles.image} source={{ uri: post.profile_picture }} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoPostView}>
          <View style={styles.infoPost}>
            <Text style={styles.infoTitle}>Pet Name: </Text>
            <Text style={styles.infoTitleText}> "{post.petName}"</Text>
          </View>
        </View>
        <View style={styles.infoPostView}>
          <View style={styles.infoPost}>
            <Text style={styles.infoTitle}>Username: </Text>
            <Text style={styles.infoTitleText}> "{post.username}"</Text>
          </View>
        </View>
        <View style={styles.imageView}>
          <TouchableOpacity>
            <Image style={styles.image} source={{ uri: post.imageUrl }} />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <View style={styles.postInfo}>
            <View style={styles.like}>
              <Image source={{ uri: 'https://img.icons8.com/metro/26/like.png' }} style={styles.icon} />
              <Text style={styles.number}>{post.like_by_users.length.toString()} Yêu Thích</Text>
            </View>
            <Divider width={2} orientation='vertical' color='#d0d0d0' />
            <View style={styles.like}>
              <Image source={{ uri: 'https://img.icons8.com/metro/26/comments.png' }} style={styles.iconCmt} />
              <Text style={styles.number}>{post.comments.length.toString()} Bình luận</Text>
            </View>
          </View>
        </View>
      </View>
  )
}
export default DetailPost

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
    marginBottom: 10,
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
    padding: 30,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10
  },
  imageView: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20
  },
  info: {

  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  like: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHeader: {
    width: 25,
    height: 25,
    marginRight: 8,
    tintColor: 'grey'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: 'grey'
  },
  iconCmt: {
    width: 15,
    height: 15,
    marginRight: 8,
    tintColor: 'grey'
  },
  number: {
    color: 'grey'
  },
  infoPostView: {
    margin: 5
  },
  infoPost: {
    flexDirection: 'row'
  },
  infoTitle: {
    fontWeight: '500',
    color: 'grey'
  },
  infoTitleText: {

  },
  title: {
    marginVertical: 10
  },
  titleText: {
    fontWeight: '500',
    fontSize: 15
  }
})
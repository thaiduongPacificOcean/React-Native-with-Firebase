import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { auth , db } from '../../firebaseConfig';
import { updateDoc , doc , arrayUnion , arrayRemove , collection , FieldValue} from 'firebase/firestore';
import { Divider } from 'react-native-elements';
import { format } from 'date-fns';
import Share from '../../services/Share';

const Post = ({post}) => {
  const navigation = useNavigation();
  //
  const handleLike = post => {
    
    const currentLikeStatus = !post.like_by_users.includes(auth.currentUser.uid) 
    const userDocRef = doc(db, 'users', post.owner_id);
    const petDocRef = doc(userDocRef, 'pets', post.petID);
    // const postDocRef = collection(petDocRef, 'posts', post.id);
    const postDocRef = collection(petDocRef, 'posts');
    const specificPostDocRef = doc(postDocRef, post.id);

    try {
      updateDoc(specificPostDocRef, {
        like_by_users: currentLikeStatus 
          ? arrayUnion(auth.currentUser.uid)
          : arrayRemove(auth.currentUser.uid)
      });
    console.log(auth.currentUser.uid , 'Đã like bài viết có id post là :', post.id)
    } 
    catch (error) {
      console.error('Lỗi nút like bài viết: ', error)
    }
  }
  const handleUserPress = async (post) => {
    navigation.navigate('CommentScreen', {post});
  }
  //
  const handleUserPressProfile = async (userID) => {

    userID == auth.currentUser.uid ? navigation.navigate('MyProfile') : navigation.navigate('Profile', {userID});
  }
  // 
  const handlePostDetail = async (post) => {
    navigation.navigate('DetailPostScreen', {post});
  }
  return (
    <View style={styles.container}>
      <HeaderPost post = {post} handleUserPressProfile={handleUserPressProfile}/>
      <Captions post = {post}/>
      <PostImage post = {post} handlePostDetail={handlePostDetail}/>
      <View style={{marginBottom: 20}}>
        <PostFooter post = {post} handleLike={handleLike} handleUserPress={handleUserPress} navigation = {navigation}/>
      </View>
      <Divider width={1} orientation='horizontal' color='#DDD'/>
    </View>
  )
}
const HeaderPost = ({post, handleUserPressProfile}) => {
  const navigation = useNavigation();
  const handleReport = (post) => {
    Alert.alert(
      'Thông báo ', 'Bạn có chắc chắn muốn báo cáo bài viết này không ?' ,
      [{
          text : 'OK',
          onPress: () => navigation.navigate('ReportScreen',post={post}),
          style : 'cancel',
      },
      {
          text : 'Hủy',
      }]
    )
  }
  return (
    <View style={styles.headerContainer}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Image 
          style= {styles.headerPostImg}
          source={{uri: post.profile_picture}}
        />
        <View>
          <TouchableOpacity onPress={() => handleUserPressProfile(post.owner_id)}>
            <Text style={styles.userName}>
              @{post.username}
            </Text>
          </TouchableOpacity>
        <Text style={{color: 'grey', fontSize: 10, marginHorizontal: 10}}>{post.createdAt && format(post.createdAt.toMillis(), 'dd/MM/yyyy HH:mm')}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleReport(post)}>
        <Text style={{color: 'black',fontWeight:'900',fontSize:20,paddingBottom: 5}}>...</Text>
      </TouchableOpacity>
    </View>
  )
}
const PostImage = ({post, handlePostDetail}) => {
  return (
    <TouchableOpacity onPress={() => handlePostDetail(post)}>
      <View style={{width:'100%',height:300, paddingHorizontal: 10}}>
      <Image
        source={{uri : post.imageUrl}}
        style={{height:'100%',resizeMode:'cover', borderRadius: 10}}
      />
      </View>
    </TouchableOpacity>
  )
}
const PostFooter = ({handleLike,post,handleUserPress}) => {
  return (
    <View style={{flexDirection:'row',padding: 10}}>
      <View style={styles.leftFooterIconContainer}>
        <TouchableOpacity onPress={() => handleLike(post)}>
          <Image style={styles.footerIcon} 
                source={{uri: post.like_by_users.includes(auth.currentUser.uid) ? postFooterIcons[0].likeImageUrl : postFooterIcons[0].imageUrl}}/>
        </TouchableOpacity>
        <Likes post = {post}/>
      </View>
      <View style={{flex:1 , alignItems: 'flex-end',justifyContent: 'flex-end', flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => handleUserPress(post)}
        style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'grey', fontSize: 12 , fontWeight: '600'}}>{post.comments.length.toLocaleString('en')}</Text>
          <Image style={styles.footerIconCommment}
                source={{uri: postFooterIcons[1].imageUrl}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Share.SharePost(post)}>
          <Image style={styles.footerIcon}
                source={{uri: postFooterIcons[2].imageUrl}}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const Icon = ({imgStyle,imgUrl}) => {
  <TouchableOpacity>
    <Image 
      style = {imgStyle}
      source = {{uri:imgUrl}}
    />
  </TouchableOpacity>
}
const Likes = ({post}) => (
  <View style={{flexDirectionL: 'row'}}>
    <Text style={{fontSize:12, fontWeight:600, color:'grey', marginLeft: 4}}>
    {post.like_by_users.length.toLocaleString('en')} lượt thích 
    </Text>
  </View>
)
const Captions = ({post}) => {
  return (
    <View style={{marginVertical: 8, paddingHorizontal: 10}}>
      <Text> {post.caption}</Text>
    </View>
  )
}
const CommentSections = () => {
  
}
const Comments = () => {
  
}

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl:'https://img.icons8.com/metro/26/like.png',
    likeImageUrl : 'https://img.icons8.com/metro/26/hearts.png'
  },
  {
    name: 'Comment',
    imageUrl:'https://img.icons8.com/metro/26/comments.png'
  },
  {
    name: 'Share',
    imageUrl:'https://img.icons8.com/metro/26/forward-arrow.png'
  },
  {
    name: 'Save',
    imageUrl:'https://img.icons8.com/fluency-systems-regular/60/111111/save.png',
    saveImageUrl : 'https://img.icons8.com/fluency-systems-filled/60/111111/save.png'
  },

]
export default Post

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 30,
    padding: 20,
    borderRadius: 20
  },
  headerContainer: {
    flexDirection:'row',
    padding: 5,
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal: 10
  },
  headerPostImg : {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  userName : {
    color: 'grey',
    justifyContent:'center',
    alignItems: 'center',
    marginLeft: 10,
    fontWeight: '500'
  },
  footerIcon:{
    width: 25,
    height: 25,
    tintColor: 'grey'
  },
  footerIconCommment:{
    width: 20,
    height: 20,
    marginHorizontal: 5,
    marginTop: 3,
    tintColor: 'grey'
  },
  leftFooterIconContainer:{
    flexDirection:'row',
    width: '32%',
    alignItems: 'center',
  },
})
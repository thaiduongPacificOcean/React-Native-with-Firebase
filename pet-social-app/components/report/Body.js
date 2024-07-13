import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Body = ({ post }) => {
  const navigation = useNavigation();
  const reportList = [
    {
      id: 1,
      value: 'Nội dung không phù hợp',
    },
    {
      id: 2,
      value: 'Ngôn từ gây thù ghét',
    },
    {
      id: 3,
      value: 'Đây là spam'
    },
    {
      id: 4,
      value: 'Khác'
    },
  ]
  const handlePresReport = (value) => {
    Alert.alert(
      'Thông báo ', 'Xác nhận báo cáo bài viết với lý do : '+ value,
      [{
        text: 'Báo cáo',
        onPress: () => sendReport(value),
        style: 'cancel',
      },
      {
        text: 'Hủy',
      }]
    )
  }
  const sendReport = async(value) => {
    try {
      const reportData = {
        postId: post.id, 
        postInfo: {
          caption : post.caption,
          imageUrl : post.imageUrl,
          owner_id: post.owner_id,
          petID : post.petID,
          createdAt : post.createdAt
        },
        reason: value,
        createdAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, 'report'), reportData);
      navigation.goBack();
      console.log('Báo cáo đã được thêm với ID: ', docRef.id);
    } catch (error) {
      console.error('Lỗi khi thêm báo cáo vào Firestore: ', error);
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Lý do báo cáo bài viết này?</Text>
        <Text style={styles.sub}>Báo cáo của bạn được ẩn danh. Nếu ai đó vi phạm quy tắc cộng đồng, đừng chần chừ mà hãy báo ngay cho chúng tôi !</Text>
      </View>
      <Divider width={1} orientation='horizontal' color='#DDD' />
      <View style={styles.report}>
        {reportList.map((item) => (
          <TouchableOpacity onPress={() => handlePresReport(item.value)} key={item.id}>
            <View style={styles.reportDetail}>
              <Text style={styles.reportText}>{item.value}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default Body

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '500'
  },
  sub: {
    color: 'grey',
    paddingVertical: 10,
    fontSize: 15,
    textAlign: 'justify'
  },
  report: {
    marginVertical: 10
  },
  reportDetail: {
    height: 40,
    marginBottom: 10,
    paddingVertical: 10,
  },
  reportText: {
    fontSize: 15
  }

})
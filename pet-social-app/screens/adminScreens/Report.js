import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import TopTabView from '../../components/admin/TopTabView';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/admin/Header';
import SearchForm from '../../components/admin/SearchForm';
import { format } from 'date-fns';

const Report = () => {
  const navigation = useNavigation();
  const handlePress = (item) => {
    navigation.navigate('DetailReport',{item})
  }
  const [reports, setReports] = useState([]);
  const getAllReports = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'report'));
      const reportList = [];
      querySnapshot.forEach((doc) => {
        reportList.push({ id: doc.id, ...doc.data() });
      });
      setReports(reportList);
      console.log('Danh sách báo cáo: ', reportList);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách báo cáo: ', error);
    }
  };

  useEffect(() => {
    getAllReports();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.report}>
        <Image source={{ uri: item.postInfo.imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.caption}>
          {item.postInfo.createdAt && format(item.postInfo.createdAt.toMillis(), 'dd/MM/yyyy HH:mm')}</Text>
          <Text>Lý do báo cáo : {item.reason}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Header/>
      <SearchForm/>
      <View style={styles.title}>
        <Text style={styles.titleText}>Danh sách các bài đăng bị báo cáo</Text>
      </View>
      <TopTabView />
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ padding: 10 }}
      />
    </View>
  )
}

export default Report

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD'
  },
  report: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500'
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  caption: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
})
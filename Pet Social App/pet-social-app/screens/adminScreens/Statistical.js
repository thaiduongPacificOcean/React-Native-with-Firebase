import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, Dimensions, Touchable, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopTabView from '../../components/admin/TopTabView'
import Header from '../../components/admin/Header';
import SearchForm from '../../components/admin/SearchForm';
import { AntDesign } from '@expo/vector-icons';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { collection, getDocs, serverTimestamp, query, where, orderBy, collectionGroup, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Statistical = () => {
  const navigation = useNavigation();
  const [userCount, setUserCount] = useState(null);
  const [postCount, setPostCount] = useState(null);
  const [videoCount, setVideoCount] = useState(null);
  const [messCount, setMessCount] = useState(null);
  const [reportCount, setReportCount] = useState(null);
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePress = () => {
    navigation.navigate('DetailTotalPost');
  }
  const handlePressUserCount = () => {
    navigation.navigate('DetailTotalUser');
  }

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const count = querySnapshot.size;
        setUserCount(count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchPostCount = async () => {
      try {
        const querySnapshot = await getDocs(collectionGroup(db, 'posts'));
        const count = querySnapshot.size;
        setPostCount(count);
      } catch (error) {
        console.error('Error fetching post count:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchVideoCount = async () => {
      try {
        const querySnapshot = await getDocs(collectionGroup(db, 'videos'));
        const count = querySnapshot.size;
        setVideoCount(count);
      } catch (error) {
        console.error('Error fetching post count:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchMessCount = async () => {
      try {
        const querySnapshot = await getDocs(collectionGroup(db, 'messages'));
        const count = querySnapshot.size;
        setMessCount(count);
      } catch (error) {
        console.error('Error fetching post count:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchReportCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'report'));
        const count = querySnapshot.size;
        setReportCount(count);
      } catch (error) {
        console.error('Error fetching post count:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchTopPosts = async () => {
      try {
        const postsQuery = query(
          collectionGroup(db, 'posts'),
          orderBy('like_by_users', 'desc'),
        );

        const querySnapshot = await getDocs(postsQuery);
        const topPostsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTopPosts(topPostsData);
      } catch (error) {
        console.error('Error fetching top posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReportCount();
    fetchTopPosts();
    fetchMessCount();
    fetchVideoCount()
    fetchPostCount();
    fetchUserCount();
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const chartData = [
    {
      type: 'Users',
      users: userCount,
    },
    {
      type: 'Posts',
      users: postCount,
    },
    {
      type: 'Videos',
      users: videoCount,
    },
    {
      type: 'Messages',
      users: messCount,
    },
    {
      type: 'Reports',
      users: reportCount,
    },
  ];
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <SearchForm />
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.statistical}>
            <TouchableOpacity onPress={() => handlePressUserCount()}>
              <View style={styles.statItem}>
                <Text style={styles.statText}>Total Users</Text>
                <Text style={styles.number}>{userCount}</Text>
                <View style={styles.icon}>
                  <AntDesign name="upcircle" size={16} color="green" />
                  <Text style={styles.per}> +{userCount}.00%</Text>
                </View>
                <Text style={styles.day}>Today</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress()}>
              <View style={styles.statItem}>
                <Text style={styles.statText}>Total Posts</Text>
                <Text style={styles.number}>{postCount}</Text>
                <View style={styles.icon}>
                  <AntDesign name="upcircle" size={16} color="green" />
                  <Text style={styles.per}> +0.0{postCount}%</Text>
                </View>
                <Text style={styles.day}>Today</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.statItem}>
                <Text style={styles.statText}>Total Videos</Text>
                <Text style={styles.number}>{videoCount}</Text>
                <View style={styles.icon}>
                  <AntDesign name="upcircle" size={16} color="#B36B39" />
                  <Text style={styles.per}> +{videoCount}.00%</Text>
                </View>
                <Text style={styles.day}>Today</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.statItem}>
                <Text style={styles.statText}>    Messages  </Text>
                <Text style={styles.number}>{messCount}</Text>
                <View style={styles.icon}>
                  <AntDesign name="upcircle" size={16} color="#B36B39" />
                  <Text style={styles.per}> +0.0{messCount}%</Text>
                </View>
                <Text style={styles.day}>Today</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.statItem}>
                <Text style={styles.statText}>    Report  </Text>
                <Text style={styles.number}>{reportCount}</Text>
                <View style={styles.icon}>
                  <AntDesign name="upcircle" size={16} color="#B36B39" />
                  <Text style={styles.per}> +{reportCount}.00%</Text>
                </View>
                <Text style={styles.day}>Today</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.chart}>
            <Text style={styles.chartTitle}>Chart</Text>
            <BarChart
              data={{
                labels: chartData.map(item => item.type),
                datasets: [
                  {
                    data: chartData.map(item => item.users),
                  },
                ],
              }}
              width={350}
              height={220}
              yAxisLabel=""
              chartConfig={chartConfig}
              bezier
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
export default Statistical

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',

  },
  statistical: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  statItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    margin: 5
  },
  statText: {
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center'
  },
  number: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10
  },
  per: {
    color: 'grey',
    marginLeft: 5
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  day: {
    fontSize: 12,
    color: 'grey',
    paddingHorizontal: 10
  },
  topLike: {
    marginVertical: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10
  },
  img: {
    height: 100,
    width: 100
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  info: {
    paddingHorizontal: 10
  },
  postInfo: {
    flexDirection: 'row',

  },
  postInfoTitle: {
    color: 'grey',
    fontWeight: '500'
  },
  chart: {
    marginVertical: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '500',
    margin: 10
  }
})
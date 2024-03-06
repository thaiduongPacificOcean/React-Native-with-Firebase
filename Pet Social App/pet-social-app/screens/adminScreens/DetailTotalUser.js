import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, Dimensions, Touchable, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/admin/Header'
import { collection, getDocs, serverTimestamp, query, where, orderBy, collectionGroup, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { startOfDay, endOfDay, format } from 'date-fns';

const DetailTotalUser = () => {
    const [todayUser, setTodayUser] = useState([]);
    const [AllUser, setAllUser] = useState([]);
    const [userCount, setUserCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchTodayUsers = async () => {
            try {
                const todayStart = startOfDay(new Date());
                const todayEnd = endOfDay(new Date());

                const postsQuery = query(
                    collection(db, 'users'),
                    where('timestamp', '>=', todayStart),
                    where('timestamp', '<=', todayEnd),
                );

                const querySnapshot = await getDocs(postsQuery);
                const topPostsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                const count = querySnapshot.size;
                setUserCount(count);
                setTodayUser(topPostsData);
            } catch (error) {
                console.error('Error fetching top posts:', error);
            } finally {
                setLoading(false);
            }
        }
        const fetchAllUsers = async () => {
            try {
                const postsQuery = query(
                    collection(db, 'users'),
                );
                const querySnapshot = await getDocs(postsQuery);
                const topPostsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAllUser(topPostsData);
            } catch (error) {
                console.error('Error fetching top posts:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAllUsers();
        fetchTodayUsers();
    }, []);
    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    const handlePressUser = (user) => {
        navigation.navigate('DetailUser', { user })
    }
    return (
        <View style={styles.container}>
            <Header />
            <View style={{ paddingHorizontal: 20 }}>
                <View style={styles.statistical}>
                    <TouchableOpacity>
                        <View style={styles.statItem}>
                            <Text style={styles.statText}>New Users</Text>
                            <Text style={styles.number}>{userCount}</Text>
                            <View style={styles.icon}>
                                <AntDesign name="upcircle" size={16} color="green" />
                                <Text style={styles.per}> +2.00%</Text>
                            </View>
                            <Text style={styles.day}>Today</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topLike}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title}>Today</Text>
                        <AntDesign name="exclamationcircleo" size={16} color="grey" />
                    </View>
                    {todayUser.map((user) => (
                        <TouchableOpacity key={user.id} onPress={() => handlePressUser(user)}>
                            <View style={styles.card}>
                                <View style={styles.img}>
                                    <Image source={{ uri: user.profile_picture }} style={styles.image} />
                                </View>
                                <View style={styles.info}>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Username : </Text>
                                        <Text>{user.username}</Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Email : </Text>
                                        <Text>{user.email}</Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Fullname : </Text>
                                        <Text>{user.fullname}</Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Date : </Text>
                                        <Text style={{ fontSize: 13 }}>{user.timestamp && format(user.timestamp.toMillis(), 'dd/MM/yyyy HH:mm')}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                    ))}
                </View>
                <View style={styles.topLike}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title}>All User</Text>
                        <AntDesign name="exclamationcircleo" size={16} color="grey" />
                    </View>
                    {AllUser.map((user) => (
                        <TouchableOpacity key={user.id} onPress={() => handlePressUser(user)}>
                            <View style={styles.card}>
                                <View style={styles.img}>
                                    <Image source={{ uri: user.profile_picture }} style={styles.image} />
                                </View>
                                <View style={styles.info}>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Username : </Text>
                                        <Text>{user.username}</Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Email : </Text>
                                        <Text>{user.email}</Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Fullname : </Text>
                                        <Text>{user.fullname}</Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Date : </Text>
                                        <Text style={{ fontSize: 13 }}>{user.timestamp && format(user.timestamp.toMillis(), 'dd/MM/yyyy HH:mm')}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailTotalUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD',
    },
    topLike: {
        marginVertical: 10,
        padding: 20
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
        margin: 3

    },
    postInfoTitle: {
        color: 'grey',
        fontWeight: '500'
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
})
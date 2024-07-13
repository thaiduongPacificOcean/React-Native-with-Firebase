import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, Dimensions, Touchable, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/admin/Header'
import { collection, getDocs, serverTimestamp, query, where, orderBy, collectionGroup, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { startOfDay, endOfDay } from 'date-fns';
import { format } from 'date-fns';

const DetailTotalPost = () => {
    const navigation = useNavigation();
    const [topPosts, setTopPosts] = useState([]);
    const [todayPosts, setTodayPosts] = useState([]);
    const [postCount, setPostCount] = useState(null);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTopPosts = async () => {
            try {
                const postsQuery = query(
                    collectionGroup(db, 'posts'),
                    orderBy('like_by_users', 'desc'),
                    limit(3)
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
        const fetchTodayPosts = async () => {
            try {
                const todayStart = startOfDay(new Date());
                const todayEnd = endOfDay(new Date());

                const postsQuery = query(
                    collectionGroup(db, 'posts'),
                    where('createdAt', '>=', todayStart),
                    where('createdAt', '<=', todayEnd),
                );

                const querySnapshot = await getDocs(postsQuery);
                const topPostsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                const count = querySnapshot.size;
                setPostCount(count);
                setTodayPosts(topPostsData);
            } catch (error) {
                console.error('Error fetching top posts:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTodayPosts();
        fetchTopPosts();
    }, []);
    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    const handlePressPost = (post) => {
        navigation.navigate('DetailPost', { post });

    }
    return (
        <View style={styles.container}>
            <Header />
            <View style={{ paddingHorizontal: 20 }}>
                <View style={styles.statistical}>
                    <TouchableOpacity>
                        <View style={styles.statItem}>
                            <Text style={styles.statText}>New Posts</Text>
                            <Text style={styles.number}>{postCount}</Text>
                            <View style={styles.icon}>
                                <AntDesign name="upcircle" size={16} color="green" />
                                <Text style={styles.per}> +0.05%</Text>
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
                    {todayPosts.map((post) => (
                        <TouchableOpacity key={post.id} onPress={() => handlePressPost(post)}>
                            <View style={styles.card}>
                                <View style={styles.img}>
                                    <Image source={{ uri: post.imageUrl }} style={styles.image} />
                                </View>
                                <View style={styles.info}>
                                    <View style={styles.userInfo}>
                                        <Text style={{ fontWeight: '500' }}>Thông tin bài viết</Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Caption : </Text>
                                        <Text>{post.caption}</Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Likes : </Text>
                                        <Text>{post.like_by_users.length}</Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Comments : </Text>
                                        <Text>{post.comments.length}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.topLike}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title}>Top Like Posts</Text>
                        <AntDesign name="exclamationcircleo" size={16} color="grey" />
                    </View>
                    {topPosts.map((post) => (
                        <TouchableOpacity key={post.id} onPress={() => handlePressPost(post)}>
                            <View style={styles.card}>
                                <View style={styles.img}>
                                    <Image source={{ uri: post.imageUrl }} style={styles.image} />
                                </View>
                                <View style={styles.info}>
                                    <View style={styles.userInfo}>
                                        <Text style={{ fontWeight: '500' }}>Thông tin bài viết</Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Caption : </Text>
                                        <Text>{post.caption}</Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Likes : </Text>
                                        <Text>{post.like_by_users.length}</Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text style={styles.postInfoTitle}>Comments : </Text>
                                        <Text>{post.comments.length}</Text>
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

export default DetailTotalPost

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
        margin: 2

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
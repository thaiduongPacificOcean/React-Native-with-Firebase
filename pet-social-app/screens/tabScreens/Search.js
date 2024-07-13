import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateDoc , doc , arrayUnion , arrayRemove , collection , FieldValue , query, getDoc, getDocs} from 'firebase/firestore';
import { auth , db } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth'

const Search = () => {
  const navigation = useNavigation();

  const [allUsers, setAllUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersQuery = query(collection(db, 'users'));
        const usersQuerySnapshot = await getDocs(usersQuery);
        const allUsers = usersQuerySnapshot.docs.map((userDoc) => ({
          id: userDoc.id,
          ...userDoc.data(),
        }));
  
        setAllUsers(allUsers);
        setOriginalUsers(allUsers);
  
      } catch (error) {
        console.error('Error fetching all users: ', error);
      }
    };
    fetchUsers();
  }, []);

  const handleUserPressProfile = async (userID) => {

    userID == auth.currentUser.uid ? navigation.navigate('MyProfile') : navigation.navigate('Profile', {userID});
  }
  const handleFilter = (searchItem) => {
    setSearchInput(searchItem);
    const filteredUsers = originalUsers.filter((user) =>
      user.username.toUpperCase().includes(searchItem.toUpperCase())
    );

    setAllUsers(filteredUsers);
    console.log('allUsers:', allUsers);
    console.log('originalUsers:', originalUsers);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
            <View style={styles.searchInputContainer}>
                <Icon name="magnify" size={24} color={'#B36B39'} />
                <TextInput
                    placeholderTextColor={'grey'}
                    placeholder="Search"
                    style={{flex: 1, marginLeft: 10}}
                    onChangeText={(text) => handleFilter(text)}
                    value= {searchInput}
                />
                <Icon name="sort-ascending" size={24} color={'#B36B39'} />
            </View>
      </View>
      <View style={styles.title}>
        <Text style ={styles.titleText}>Gợi ý cho bạn </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator ={false}>
        {allUsers && allUsers.map((user) => (
          user.id != auth.currentUser.uid && (
              <Card key={user.id} user={user} handleUserPressProfile={handleUserPressProfile}/>
          )
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
const Card = ({user, handleUserPressProfile}) => {
  return (
    <TouchableOpacity onPress={() => handleUserPressProfile(user.owner_userid)}>
        <View style={styles.card}>
          <View style={styles.cardContainer}>
            <View style={styles.cardLeftContainer}>
              <View style={styles.avatar}>
                <Image source={{uri: user.profile_picture}} 
                  style={styles.image}
                />
              </View>
              <View style ={styles.name}>
                <Text style ={styles.username}>{user.username}</Text>
                <Text style ={styles.fullname}>{user.fullname}</Text>
              </View>
            </View>
            <View style={styles.cardRightContainer}>
              <AntDesign name="right" size={18} color="#B36B39" />
            </View>
          </View>
          </View>
      </TouchableOpacity>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0d0d0',
    paddingTop: 35,
    paddingHorizontal: 20
  },
  mainContainer: {
    marginBottom: 20
  },
  searchInputContainer: {
    height: 50,
    backgroundColor:'#f2f2f2',
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card : {
    height: 70,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    marginBottom: 15
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardRightContainer: {

  },
  avatar: {
    marginRight: 10
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
    borderRadius: 25
  },
  name: {
    
  },
  username: {
    fontWeight: '500',
    fontSize: 16
  },
  fullname: {
    color: 'grey',
  },
  title: {
    marginVertical: 10,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'grey',
    fontWeight: '500'
  }  
})
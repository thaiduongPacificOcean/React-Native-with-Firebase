import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { query, where, limit, collection, onSnapshot, serverTimestamp, Timestamp, addDoc, setDoc, doc, getDoc, collectionGroup, orderBy } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'

const petCategories = [
  { name: 'Cat', icon: 'cat' },
  { name: 'Dog', icon: 'dog' },
  { name: 'Other', icon: 'ladybug' },
];


const ListPet = ({ user }) => {

  const navigation = useNavigation();

  const [petOfUserLogin, setpetOfUserLogin] = useState([])
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [filteredPets, setFilteredPets] = useState([]);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.owner_userid);
      const petsRef = collection(userRef, 'pets');
      const unsubscribe = onSnapshot(petsRef, orderBy('createdAt', 'desc'), (snapshot) => {
        const petsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setpetOfUserLogin(petsData);
        // Cập nhật danh sách thú cưng theo loại đã chọn
        if (selectedPetType) {
          const filteredPets = petsData.filter((pet) => pet.type === selectedPetType);
          setFilteredPets(filteredPets);
        }
      });
      return unsubscribe;
    }
  }, [user, selectedPetType]);

  return (
    <View style={styles.container}>
      <Category setSelectedPetType={setSelectedPetType} />
      {/* <Text style={{ marginVertical: 10, fontSize: 16, color: 'grey', textAlign: 'center' }}>Danh sách thú cưng</Text> */}
      <ScrollView style={{ marginBottom: 250 }}>
        {/* {petOfUserLogin && petOfUserLogin.map((petOfUser, index) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProfilePet', { petOfUser, user })} key={index}>
            <Card petOfUser={petOfUser} />
          </TouchableOpacity>
        ))} */}
        {filteredPets.length > 0
          ? filteredPets.map((petOfUser, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProfilePet', {
                  petOfUser,
                  user,
                })
              }
              key={index}>
              <Card petOfUser={petOfUser} />
            </TouchableOpacity>
          ))
          : <Text>No pets found for the selected type.</Text>
        }
      </ScrollView>
    </View>
  )
}
const Card = ({ petOfUser }) => {
  const defaultImage = 'https://www.chanchao.com.tw/images/default.jpg'
  const time = new Date(petOfUser.birthDate.toMillis()).toLocaleString();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: petOfUser ? petOfUser.petImageUrl : defaultImage }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: 20
          }}
        />
      </View>
      <View style={styles.cardDetailsContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{ fontWeight: 'bold', color: '#111', fontSize: 20 }}>
            {petOfUser.petName}
          </Text>
          {petOfUser.sex == 'Male'}<Icon name="gender-male" size={22} color={'grey'} />
        </View>
        <Text style={{ fontSize: 12, marginTop: 5, color: '#111' }}>
          Loại : {petOfUser.type}
        </Text>
        <Text style={{ fontSize: 10, marginTop: 5, color: 'grey' }}>
          Ngày sinh : {time}
        </Text>
        <View style={{ marginTop: 5, flexDirection: 'row' }}>
          <Icon name="map-marker" color={'#B36B39'} size={18} />
          <Text style={{ fontSize: 12, color: 'grey', marginLeft: 5 }}>
            Distance:7.8km
          </Text>
        </View>
      </View>
    </View>
  );
};
const Category = ({ setSelectedPetType }) => {
  const [selectedCategoryIndex, setSeletedCategoryIndex] = useState(0);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ color: 'grey', fontSize: 16, fontWeight: '500', marginVertical: 10, textAlign: 'center' }}>Danh sách thú cưng</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginTop: 10,
        }}>
        {petCategories.map((item, index) => (
          <View key={'pet' + index} style={{ alignItems: 'center', marginLeft: 20 }}>
            <TouchableOpacity
              onPress={() => {
                setSeletedCategoryIndex(index);
                setSelectedPetType(item.name); // Cập nhật loại thú cưng được chọn
              }}
              style={[
                styles.categoryBtn,
                {
                  backgroundColor:
                    selectedCategoryIndex == index ? '#B36B39' : '#fff',
                },
              ]}>
              <Icon
                name={item.icon}
                size={30}
                color={selectedCategoryIndex == index ? '#fff' : '#B36B39'}
              />
            </TouchableOpacity>
            <Text style={styles.categoryBtnName}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default ListPet

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20
  },
  petCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 40,
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: 10,
  },
  petImg: {
    padding: 2,
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 50
  },
  petInfo: {
    width: '100%',
    height: '90%',
    backgroundColor: '#B36B39',
    padding: 4,
    borderTopLeftRadius: 30,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff'
  },
  description: {
    color: '#fff',
    marginLeft: 10
  },
  //
  cateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  buttonStatus: {
    marginVertical: 10,
    marginRight: 10,
    backgroundColor: '#c2c2c2',
    width: 'auto',
    height: 30,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  text: {

  },
  icon: {
    width: 20,
    height: 20
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardDetailsContainer: {
    height: 120,
    backgroundColor: '#fff',
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  cardImageContainer: {
    height: 140,
    width: 140,
    backgroundColor: '#d0d8dc',
    borderRadius: 20,
  },
  categoryBtn: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  categoryBtnName: {
    color: '#111',
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
})
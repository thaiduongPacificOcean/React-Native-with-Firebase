import { Dimensions,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity, 
  FlatList,
  ScrollView,
  StyleSheet, } from 'react-native'
import React, {useEffect} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const petCategories = [
  {name: 'CATS', icon: 'cat'},
  {name: 'DOGS', icon: 'dog'},
  {name: 'ORTHERS', icon: 'ladybug'},
];
const Category = () => {

  const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
  const [filteredPets, setFilteredPets] = React.useState([]);

  return (
    <View style={styles.container}>
      <Text style={{color: 'grey', fontSize: 16, fontWeight: '500'}}>Category</Text>
      <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: 10,
            }}>
            {petCategories.map((item, index) => (
              <View key={'pet' + index} style={{alignItems: 'center', marginLeft: 20}}>
                <TouchableOpacity
                  onPress={() => {
                    setSeletedCategoryIndex(index);
                    // fliterPet(index);
                  }}
                  style={[
                    styles.categoryBtn,
                    {
                      backgroundColor:
                        selectedCategoryIndex == index
                          ? '#B36B39'
                          : '#fff',
                    },
                  ]}>
                  <Icon
                    name={item.icon}
                    size={30}
                    color={
                      selectedCategoryIndex == index
                        ? '#fff'
                        : '#B36B39'
                    }
                  />
                </TouchableOpacity>
                <Text style={styles.categoryBtnName}>{item.name}</Text>
              </View>
            ))}
          </View>
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  container: {
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
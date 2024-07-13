import { StyleSheet, Text, View, TextInput , Dimensions, TouchableOpacity} from 'react-native'
const {height} = Dimensions.get('window');
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SearchForm = () => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
        <View style={styles.mainContainer}>
            <View style={styles.searchInputContainer}>
                <Icon name="magnify" size={24} color={'grey'} />
                
                <Text style={{flex: 1, marginLeft: 5, color: 'grey'}}>Search</Text>
                <Icon name="sort-ascending" size={24} color={'grey'} />
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default SearchForm

const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: 10,
        paddingHorizontal: 20
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
})
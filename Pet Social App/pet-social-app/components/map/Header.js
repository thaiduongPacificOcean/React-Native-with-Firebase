import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => {
  return (
    <View style={styles.mainContainer}>
            <View style={styles.searchInputContainer}>
                <Icon name="magnify" size={24} color={'grey'} />
                <TextInput
                    placeholderTextColor={'grey'}
                    placeholder="Search"
                    style={{flex: 1, marginLeft: 10}}
                />
                <Icon name="sort-ascending" size={24} color={'grey'} />
            </View>
      </View>
  )
}

export default Header

const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: 5
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
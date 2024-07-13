import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'

const CategoryList = ({ setSelectedCategory }) => {
    const categoryList = [
        {
            id: 1,
            name: 'Shop',
            value: 'pet_store',
            icon: require('../../assets/images/shop.png')
        },
        {
            id: 2,
            name: 'Hopital',
            value: 'veterinary_care',
            icon: require('../../assets/images/hopital.png')
        },
        {
            id: 3,
            name: 'Cafe',
            value: 'cafe',
            icon: require('../../assets/images/coffee.png')
        },
    ]
    return (
        <View style={{ marginTop: 15 }}>
            <Text style={{
                color: 'grey',
                paddingHorizontal: 10,
                fontWeight: '600'
            }} >Select Top Category</Text>

            <FlatList
                data={categoryList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 5 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedCategory(item.value)} >
                        <CategoryItem category={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default CategoryList

const styles = StyleSheet.create({})
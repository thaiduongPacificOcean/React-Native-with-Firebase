import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'
import PlaceItemBig from './PlaceItemBig'
import { useNavigation } from '@react-navigation/native'

const PlaceList = ({ placeList }) => {
    const navigator = useNavigation();
    const onPlaceClick = (item) => {
        navigator.navigate('PlaceDetail', { place: item });
    }
    return (
        <View>
            <Text>  Found {placeList.length} Places </Text>
            <FlatList
                data={placeList}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={index} onPress={() => onPlaceClick(item)}>
                        {index % 4 == 0 ?
                            <PlaceItemBig place={item} />
                            : <PlaceItem place={item} />}
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default PlaceList

const styles = StyleSheet.create({})

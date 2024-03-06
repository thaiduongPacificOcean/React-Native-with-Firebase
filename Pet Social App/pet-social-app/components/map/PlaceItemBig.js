import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import HorizontalLine from "./HorizontalLine";

const PLACEHOLDER_IMG = 'https://legaltracking.com.mx/wp-content/uploads/2020/01/placeholder-900x600.png'

const PlaceItemBig = ({ place }) => {
    return (
        <View style={{ marginTop: 20 }}>
            {place?.photos ? <Image
                source={{
                    uri:
                        "https://maps.googleapis.com/maps/api/place/photo" +
                        "?maxwidth=400" +
                        "&photo_reference=" +
                        place?.photos[0]?.photo_reference +
                        "&key=AIzaSyBRj-aXUQk6DlL8vjQ8xT-CjWKqnB6RKTY",
                }}
                style={{ width: "100%", height: 150, borderRadius: 15 }}
            /> : <Image
                source={{
                    uri: PLACEHOLDER_IMG
                }}
                style={{ width: "100%", height: 150, borderRadius: 15 }}
            />}
            <Text
                numberOfLines={2}
                style={{ fontSize: 18, marginBottom: 2 }}
            >
                {place.name}
            </Text>
            <Text
                style={{ fontSize: 16, marginBottom: 5, color: 'grey' }}
                numberOfLines={2}
            >
                {place.vicinity}
            </Text>
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    flexDirection: "row",
                }}
            >
                <AntDesign name="star" size={20} color={'yellow'} />
                <Text>{place.rating}</Text>
            </View>
            <HorizontalLine />
        </View>
    )
}

export default PlaceItemBig

const styles = StyleSheet.create({})
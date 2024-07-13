import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import HorizontalLine from "./HorizontalLine";

const PLACEHOLDER_IMG = 'https://legaltracking.com.mx/wp-content/uploads/2020/01/placeholder-900x600.png'

const PlaceItem = ({ place }) => {
  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
      marginTop: 20
    }}>
      {place?.photos ? <Image
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo" +
            "?maxwidth=400" +
            "&photo_reference=" +
            place?.photos[0]?.photo_reference +
            "&key=AIzaSyBRj-aXUQk6DlL8vjQ8xT-CjWKqnB6RKTY",
        }}
        style={{ width: 110, height: 110, borderRadius: 15 }}
      /> :
        <Image source={{ uri: PLACEHOLDER_IMG }}
          style={{ width: 110, height: 110, borderRadius: 15 }}
        />}
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={2}
          style={{
            fontSize: 18, marginBottom: 5,
          }}
        >
          {place.name}
        </Text>
        <Text style={{
          fontSize: 16,
          marginBottom: 5,
          color: 'grey'
        }}
          numberOfLines={2}>
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
      </View>
      <HorizontalLine />
    </View>
  )
}

export default PlaceItem

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import Share from '../../../services/Share';
import GoogleMapView from '../../map/GoogleMapView';
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const PlaceDetailItem = ({ place, onDirectionClick }) => {
    return (
        <View style={{marginTop: 20}}>
            <Text style={{ fontSize: 26 }}>
                {place.name}
            </Text>
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 5,
                    flexDirection: "row",
                }}
            >
                <AntDesign name="star" size={20} color={'yellow'} />
                <Text>{place.rating}</Text>
            </View>
            {place?.photos ? (
                <Image
                    source={{
                        uri:
                            "https://maps.googleapis.com/maps/api/place/photo" +
                            "?maxwidth=400" +
                            "&photo_reference=" +
                            place?.photos[0]?.photo_reference +
                            "&key=AIzaSyBRj-aXUQk6DlL8vjQ8xT-CjWKqnB6RKTY",
                    }}
                    style={{
                        width: "100%",
                        height: 160,
                        borderRadius: 15,
                        marginTop: 10,
                    }}
                />
            ) : null}


            <Text
                style={{ fontSize: 16, marginTop: 10, color: 'grey' }}
                numberOfLines={2}
            >
                {place.vicinity ? place.vicinity : place.formatted_address}
            </Text>
            {place?.opening_hours ? (
                <Text>
                    {place?.opening_hours?.open_now == true ?
                        "(Open)" :
                        "(Closed)"}
                </Text>
            ) : null}

            <View style={{
                marginTop: 10, flexDirection: 'row',
                display: 'flex', gap: 10, marginBottom: 10
            }}>
                <TouchableOpacity onPress={() => onDirectionClick()}
                    style={{
                        direction: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: '#B36B39',
                        width: 110,
                        padding: 3,
                        borderRadius: 40,
                        justifyContent: 'center'
                    }}
                >
                    <Ionicons name="navigate-circle-outline" size={24} color="white" />
                    <Text style={{ fontSize: 16, color: 'white' }}>Direction</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Share.SharePlace(place)}
                    style={{
                        direction: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: '#B36B39',
                        width: 90,
                        padding: 3,
                        borderRadius: 40,
                        justifyContent: 'center'
                    }}
                >
                    <Ionicons name="md-share-outline" size={24} color="white" />
                    <Text style={{ color: 'white', fontSize: 16 }}>Share</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default PlaceDetailItem

const styles = StyleSheet.create({})
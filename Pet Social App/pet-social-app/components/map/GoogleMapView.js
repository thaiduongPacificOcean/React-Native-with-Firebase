import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import PlaceMarker from "./PlaceMarker";

const GoogleMapView = ({ placeList }) => {

  const [mapRegion, setMapRegion] = useState({
    latitude: 10.796642767756506,
    longitude: 106.66679669540851,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Hàm để lấy vị trí hiện tại
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: 10.796611151005484,
          longitude: 106.6668181530802,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ overflow: 'hidden', borderRadius: 20 }}>
        <MapView style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={mapRegion}
        >
          {userLocation && (
            <Marker coordinate={userLocation} title="Vị trí của tôi" pinColor={'green'} />
          )
          }
          {placeList.map((item, index) => index <= 4 && (
            <PlaceMarker item={item} key={index} />
          ))}
        </MapView>
      </View>
    </View>
  )
}

export default GoogleMapView

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  map: {
    width: Dimensions.get('screen').width * 0.89,
    height: Dimensions.get('screen').height * 0.29,
  }
})
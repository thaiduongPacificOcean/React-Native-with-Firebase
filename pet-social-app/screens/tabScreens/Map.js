import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/map/Header'
import GoogleMapView from '../../components/map/GoogleMapView';
import CategoryList from '../../components/map/CategoryList';
import GlobalApi from '../../services/GlobalApi';
import { useEffect } from 'react';
import PlaceList from '../../components/map/PlaceList';
import * as Location from 'expo-location';

const Map = () => {

  const [placeList, setPlaceList] = useState([]);


  const [mapRegion, setMapRegion] = useState({
    latitude: 10.796642767756506,
    longitude: 106.66679669540851,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
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

  useEffect(() => {
    if (userLocation) {
      GetNearBySearchPlace('restaurant');
    }
  }, [userLocation]);

  // const GetNearBySearchPlace = (value) => {
  //   if(userLocation){
  //     GlobalApi.nearByPlace(userLocation.latitude, userLocation.longitude,value).then(resp => {
  //       setPlaceList(resp.data.results);
  //       console.log(placeList);
  //     })
  //   }
  // }
  const GetNearBySearchPlace = useCallback((value) => {
    if (userLocation) {
      GlobalApi.nearByPlace(userLocation.latitude, userLocation.longitude, value).then(resp => {
        setPlaceList(resp.data.results);
        console.log(placeList);
      });
    }
  }, [userLocation]);
  return (
    <View style={styles.container}>
      <Header />
      <GoogleMapView placeList={placeList} />
      <CategoryList setSelectedCategory={(value) => GetNearBySearchPlace(value)} />
      {placeList ? <PlaceList placeList={placeList} /> : null}
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0d0d0',
    paddingTop: 35,
    paddingHorizontal: 20
  },

})
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import Reac, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { collection, doc, setDoc, getDoc, collectionGroup, onSnapshot, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from '../../firebaseConfig'
import { auth } from "../../firebaseConfig";

const TopTabView = () => {
    const Tab = createMaterialTopTabNavigator();
    return (
        <View>
            <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabelStyle: {
                    fontSize: 14,
                    textTransform: "capitalize",
                    color: 'grey',
                },
                tabBarItemStyle: {
                    flexDirection: 'row',
                },
                tabBarIndicatorStyle: {
                    height: 1,
                    backgroundColor: '#B36B39',
                },
                tabBarIcon: ({ focused, colour }) => {
                    let iconName;
                    if (route.name === 'Friends') {
                        iconName = focused ? "people" : "people-outline";
                        colour = focused ? "#B36B39" : "grey";
                    }
                    else if (route.name === 'TimeLine') {
                        iconName = focused ? "timer" : "timer-outline";
                        colour = focused ? "#B36B39" : "grey";
                    }
                    return (
                        <Ionicons name={iconName} color={colour} size={22} />
                    )
                }
            })}>
            <Tab.Screen name='TimeLine' component={TimeLine} />
            <Tab.Screen name='Friends' component={Friends} />
        </Tab.Navigator>
        </View>
    )
}

const TimeLine = () => {
    return (
        <View> 
            <Text>TimeLine</Text>
        </View>
    )
}
const Friends = () => {

    return (
        <View>
            <Text>Friends</Text>
        </View>
    )
}
export default TopTabView

const styles = StyleSheet.create({})
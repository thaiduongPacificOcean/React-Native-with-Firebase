import { StyleSheet, Text, View, Image, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import Notifications from './screens/tabScreens/Notifications';
import Chat from './screens/tabScreens/Chat';
import Home from './screens/tabScreens/Home';
import Profile from './screens/tabScreens/Profile';
import Blog from './screens/tabScreens/Blog';
import Map from './screens/tabScreens/Map';
import Search from './screens/tabScreens/Search';
import NewPostScreen from './screens/tabScreens/NewPostScreen';
import NewStoryScreen from './screens/tabScreens/NewStoryScreen';
import NewVideoScreen from './screens/tabScreens/NewVideoScreen';
import CommentScreen from './screens/tabScreens/CommentScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeChatScreen from './screens/HomeChatScreen';
import StoryScreen from './screens/StoryScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import SettingScreen from './screens/SettingScreen';
import ProfilePet from './screens/tabScreens/ProfilePet';
import MyProfile from './screens/tabScreens/MyProfile';
import Activity from './screens/tabScreens/Activity';
import EditScreen from './screens/EditScreen';
import DetailPostScreen from './screens/DetailPostScreen';
import MyPetProfile from './screens/tabScreens/MyPetProfile';
import CreatePetProfileScreen from './screens/tabScreens/CreatePetProfileScreen';
import DetaiImageScreen from './screens/DetaiImageScreen';
import MyDetailPostScreen from './screens/MyDetailPostScreen';
import EditPostScreen from './screens/EditPostScreen';
import EditPetInfoScreen from './screens/EditPetInfoScreen';
import Reel from './screens/tabScreens/Reel';
import MyDetailVideoScreen from './screens/MyDetailVideoScreen';
import EditVideoScreen from './screens/EditVideoScreen';
import DetailVideoScreen from './screens/DetailVideoScreen';
import DetailVideo from './screens/DetailVideo';
import PlaceDetail from './screens/PlaceDetail';
import ReportScreen from './screens/ReportScreen';
import LoginAdminScreen from './screens/LoginAdminScreen';
import Report from './screens/adminScreens/Report';
import Statistical from './screens/adminScreens/Statistical';
import Setting from './screens/adminScreens/Setting';
import DetailReport from './screens/adminScreens/DetailReport';
import DetailTotalPost from './screens/adminScreens/DetailTotalPost';
import DetailTotalUser from './screens/adminScreens/DetailTotalUser';
import DetailPost from './screens/adminScreens/DetailPost';
import DetailUser from './screens/adminScreens/DetailUser';

// Stack
const HomeStack = createNativeStackNavigator();
function HomeStackGroup() {
  return (
    <HomeStack.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }} >
      <HomeStack.Screen name="Home" component={TabGroup} />
      <HomeStack.Screen name="Chat" component={Chat} />
      <HomeStack.Screen name="Search" component={Search} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="Notifications" component={Notifications} />
      <HomeStack.Screen name="SettingScreen" component={SettingScreen} />
      <HomeStack.Screen name="ProfilePet" component={ProfilePet} />
      <HomeStack.Screen name="NewPostScreen" component={NewPostScreen} />
      <HomeStack.Screen name="CommentScreen" component={CommentScreen} />
      <HomeStack.Screen name="StoryScreen" component={StoryScreen} />
      <HomeStack.Screen name="Activity" component={Activity} />
      <HomeStack.Screen name="NewStoryScreen" component={NewStoryScreen} />
      <HomeStack.Screen name="EditScreen" component={EditScreen} />
      <HomeStack.Screen name="MyPetProfile" component={MyPetProfile} />
      <HomeStack.Screen name="CreatePetProfileScreen" component={CreatePetProfileScreen} />
      <HomeStack.Screen name="DetailPostScreen" component={DetailPostScreen} />
      <HomeStack.Screen name="DetailVideoScreen" component={DetailVideoScreen} />
      <HomeStack.Screen name="DetailVideo" component={DetailVideo} />
      <HomeStack.Screen name="DetaiImageScreen" component={DetaiImageScreen} />
      <HomeStack.Screen name="MyDetailPostScreen" component={MyDetailPostScreen} />
      <HomeStack.Screen name="MyDetailVideoScreen" component={MyDetailVideoScreen} />
      <HomeStack.Screen name="EditPostScreen" component={EditPostScreen} />
      <HomeStack.Screen name="EditVideoScreen" component={EditVideoScreen} />
      <HomeStack.Screen name="EditPetInfoScreen" component={EditPetInfoScreen} />
      <HomeStack.Screen name="NewVideoScreen" component={NewVideoScreen} />
      <HomeStack.Screen name="PlaceDetail" component={PlaceDetail} />
      <HomeStack.Screen name="ReportScreen" component={ReportScreen} />
      <HomeStack.Screen name="LoginAdminScreen" component={LoginAdminScreen} />
    </HomeStack.Navigator>
  );
}

// Bottom Tab
const Tab = createBottomTabNavigator();
function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'red',
      }}
    >
      <Tab.Screen name="HomeScreen" component={Home} options={{
        tabBarIcon: ({ focused }) => (
          <Image source={require('./assets/images/home.png')}
            style={[
              styles.bottomTabIcon,
              focused && styles.bottomTabIconFocused,
            ]}
          />
        )
      }} />
      <Tab.Screen name="Map" component={Map} options={{
        tabBarIcon: ({ focused }) => (
          <Image source={require('./assets/images/3082383.png')}
            style={[
              styles.bottomTabIcon,
              focused && styles.bottomTabIconFocused,
            ]}
          />
        )
      }} />
      <Tab.Screen name="Reel" component={Reel} options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => (
          <Image source={require('./assets/images/12638.png')}
            style={[
              styles.bottomTabIcon,
              focused && styles.bottomTabIconFocused,
            ]}
          />
        )
      }} />
      <Tab.Screen name="HomeChat" component={HomeChatScreen} options={{
        tabBarIcon: ({ focused }) => (
          <Image source={require('./assets/images/message.png')}
            style={[
              styles.bottomTabIcon,
              focused && styles.bottomTabIconFocused,
            ]}
          />
        )
      }} />
      <Tab.Screen name="MyProfile" component={MyProfile} options={{
        tabBarIcon: ({ focused }) => (
          <Image source={require('./assets/images/user.png')}
            style={[
              styles.bottomTabIcon,
              focused && styles.bottomTabIconFocused,
            ]}
          />
        )
      }} />
    </Tab.Navigator>

  )
}

const Navigation = () => {
  return (
    <NavigationContainer >
      <StatusBar style="auto" />
      <HomeStackGroup />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator();

export const SignedInStack = () => (
  <NavigationContainer>
    <StatusBar style="auto" />
    <HomeStackGroup />
  </NavigationContainer>
)

export const SignOutStack = () => (
  <NavigationContainer>
    <StatusBar style="auto" />
    <Stack.Navigator initialRouteName='OnboardingScreen'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
      <Stack.Screen name='SignInScreen' component={SignInScreen} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

// Amdin 

const AdminTab = createBottomTabNavigator();
function AdminTabGroup() {
  return (
    <AdminTab.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}
    >
      <AdminTab.Screen name="Thống kê" component={Statistical} options={{
        tabBarLabel: ({ focused }) => (
          <Text style={[styles.label, focused && styles.labelFocus]}>Thống kê</Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image source={require('./assets/images/post.png')}
            style={[
              styles.bottomTabIconAmdin,
              focused && styles.bottomTabIconFocused,
            ]}
          />
        )
      }} />
      <AdminTab.Screen name="Báo cáo" component={Report} options={{
        tabBarLabel: ({ focused }) => (
          <Text style={[styles.label, focused && styles.labelFocus]}>Báo cáo</Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image source={require('./assets/images/message.png')}
            style={[
              styles.bottomTabIconAmdin,
              focused && styles.bottomTabIconFocused,
            ]}
          />
        )
      }} />
      <AdminTab.Screen name="Cài đặt" component={Setting} options={{
        tabBarLabel: ({ focused }) => (
          <Text style={[styles.label, focused && styles.labelFocus]}>Cài đặt</Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image source={require('./assets/images/setting.png')}
            style={[
              styles.bottomTabIconAmdin,
              focused && styles.bottomTabIconFocused,
            ]}
          />
        )
      }} />
    </AdminTab.Navigator>
  );
}

export const DashboardAdmin = () => (
  <NavigationContainer>
    <StatusBar style="auto" />
    <AdminStackGroup />
  </NavigationContainer>
)
const AdminTask = createNativeStackNavigator();
function AdminStackGroup() {
  return (
    <AdminTask.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }} >
      <AdminTask.Screen name="Home" component={AdminTabGroup} />
      <AdminTask.Screen name="DetailReport" component={DetailReport} />
      <AdminTask.Screen name="DetailTotalPost" component={DetailTotalPost} />
      <AdminTask.Screen name="DetailTotalUser" component={DetailTotalUser} />
      <AdminTask.Screen name="DetailPost" component={DetailPost} />
      <AdminTask.Screen name="DetailUser" component={DetailUser} />
    </AdminTask.Navigator>
  );
}
export default Navigation

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    // paddingVertical: 10
  },
  bottomTabIcon: {
    width: 25,
    height: 25,
    tintColor: 'grey',
  },
  bottomTabIconAmdin: {
    width: 20,
    height: 20,
    tintColor: 'grey',
  },
  bottomTabIconFocused: {
    tintColor: '#B36B39',
  },
  petFeet: {
    width: 25,
    height: 25,
    tintColor: '#B36B39',
  },
  label: {
    fontSize: 12,
    paddingBottom: 5,
    color: 'grey'
  },
  labelFocus: {
    color: '#B36B39'
  }

})
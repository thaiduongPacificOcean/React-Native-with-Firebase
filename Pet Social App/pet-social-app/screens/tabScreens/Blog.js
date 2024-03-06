import { Animated, Easing, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ResizeMode, Video } from 'expo-av';
import { collection, doc, setDoc , getDoc, collectionGroup, onSnapshot, query , orderBy, getDocs , where} from "firebase/firestore"; 
import { db } from '../../firebaseConfig'
import { auth } from "../../firebaseConfig";

const Blog = () => {

  return (
    <View style={styles.container}>
      
    </View>
  )
}

export default Blog

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

})
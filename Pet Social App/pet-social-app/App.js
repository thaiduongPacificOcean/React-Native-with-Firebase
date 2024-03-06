import "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react'
import Navigation from './Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Authencation from "./Authencation";

export default function App() {
  return (
      <Authencation /> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

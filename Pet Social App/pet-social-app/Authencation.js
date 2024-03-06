import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import {SignedInStack, SignOutStack, DashboardAdmin} from './Navigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebaseConfig'

const Authencation = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        try {
          if (user) {
            setUser(user);
            setLoading(false);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Error updating user state:', error);
        }
      });
  
      return () => unsubscribe();
    }, []);

  if (loading && user === null)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
  );

  const isAdmin = user && user.email === 'adminpetsocial@gmail.com';
  return (
    // user ? <SignedInStack/> : <SignOutStack/>
    isAdmin ? <DashboardAdmin /> : (user ? <SignedInStack /> : <SignOutStack />)
  )
}

export default Authencation

const styles = StyleSheet.create({})
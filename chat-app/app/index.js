import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function StartPage() {
    return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="grey" />
        </View>
    )
}

const styles = StyleSheet.create({})
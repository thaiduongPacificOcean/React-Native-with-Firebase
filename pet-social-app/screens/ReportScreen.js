import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/report/Header';
import Body from '../components/report/Body';
const ReportScreen = ({ route }) => {
    const { post } = route.params;
    return (
        <View>
            <Header />
            <Body post={post}/>
        </View>
    )
}

export default ReportScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'

const CategoryItem = ({category}) => {
    return (
        <View style={{
          padding: 5,
          alignItems: 'center',
          margin: 5,
          width: 60,
          height: 60,
          justifyContent: 'center',
          borderRadius: 15,
          backgroundColor: '#fff'
        }}>
          <Image source={category.icon}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ fontSize: 12, marginVertical: 6, color: 'grey' }}>
            {category.name}</Text>
        </View>
      )
}

export default CategoryItem

const styles = StyleSheet.create({})
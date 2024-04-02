import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

function Index () {
  return (
    <View style= {styles.container} >
      <Text>index</Text>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
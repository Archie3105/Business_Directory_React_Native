import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'

const BuisnessListCard = ({business}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/businessdetail/'+business?.id)}  style={{
        backgroundColor:'#fff',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        marginTop:15,
        // padding:5,
    }}>
      <Image source={{uri:business?.imageUrl}} 
      style={{
        width:'100%',
        height:160,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
      }} />
      <View style={{
        padding:10,
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20,
        }}>{business?.name}</Text>
        <Text style={{
            fontFamily:'outfit',
            color:Colors.GRAY
        }}>{business?.address}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BuisnessListCard
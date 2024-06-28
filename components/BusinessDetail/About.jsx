import { View, Text } from 'react-native'
import React from 'react'
import Reviews from './Reviews'

const About = ({business}) => {
  return (
    <View style={{
        padding:20,
        backgroundColor:'#fff',
        // height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
      }}>About</Text>
      <Text style={{
        fontFamily:'outfit',
        lineHeight:25,
        fontSize:16,
      }}>{business?.about}</Text>

      {/* <Reviews business={business} /> */}
    </View>
  )
}

export default About
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserIntro from '@/components/Profile/UserIntro'
import MenuList from '@/components/Profile/MenuList'

const profile = () => {
  return (
    <View style={{
      padding:20,
      marginTop:5,
      backgroundColor:'#fff',
      height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35,
      }}>profile</Text>

      {/* User Info */}
        <UserIntro />
      {/* Menu List */}
      <MenuList />
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})
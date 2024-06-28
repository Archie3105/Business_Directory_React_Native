import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome5, FontAwesome, Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'

const _layout = () => {
  return (
    <Tabs screenOptions={{headerShown:false,
      tabBarActiveTintColor: Colors.PRIMARY
    }} >
        <Tabs.Screen name='home' 
        options={{
            tabBarLabel:'Home',
            tabBarIcon:({color}) => <Ionicons name='home' size={28} color={color} />
        }}
        />
        <Tabs.Screen name='explore' 
        options={{
            tabBarLabel:'Explore',
            tabBarIcon:({color}) => <Ionicons name='search' size={28} color={color} />
        }}
        />
        <Tabs.Screen name='profile' 
        options={{
            tabBarLabel:'Profile',
            tabBarIcon:({color}) => <FontAwesome name='user' size={28} color={color} />
        }}
        />
        
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})
import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'

const Intro = ({business}) => {
    // console.log(business)
     const { user } = useUser();

    const onDelete = () => {
      Alert.alert('Do you want to Delete?', 'Do you really want to Delete this business?', [
        {
          text:'Cancel',
          style:'cancel',
        },
        {
          text:'Delete',
          style:'destructive',
          onPress:() => deleteBusiness()
        }
      ])
    }

    const deleteBusiness = async() => {
      // console.log("Delete Business")
      await deleteDoc(doc(db,'BusinesslList', business?.id));

      router.back();
      ToastAndroid.show('Business Deleted!', ToastAndroid.LONG)
    }
  return (
    <View>
      <View style={{
        position:'absolute',
        zIndex:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        padding:20,
        marginTop:8
      }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => router.back()}>
        <Ionicons name='arrow-back-circle' size={40} color='white' />
        </TouchableOpacity>
        <Ionicons name='heart-outline' size={40} color='white' />
      </View>
        <Image source={{uri:business?.imageUrl}} style={{
            width: '100%',
            height:350,
        }} />

        <View style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          padding:20,
          marginTop:-20,
          backgroundColor:'#fff',
          borderTopLeftRadius:25,
          borderTopRightRadius:25,
          alignItems:'center'
        }}>
        <View style={{
            padding:20,
            marginTop:-20,
            backgroundColor:'#fff',
            borderTopLeftRadius:25,
            borderTopRightRadius:25,
          }}>
          <Text style={{
            fontSize:26,
            fontFamily:'outfit-bold'
          }}>{business?.name}</Text>

          <Text style={{
            fontSize:18,
            fontFamily:'outfit'
          }}>{business?.address}</Text>
        </View>
        
        {
          user?.primaryEmailAddress?.emailAddress === business?.userEmail  
          &&
          <TouchableOpacity activeOpacity={0.5} onPress={() => onDelete()} >
        <Ionicons name='trash' size={24} color={Colors.secondary} /></TouchableOpacity>}
    </View>
    </View>
  )
}

export default Intro
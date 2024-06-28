import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Category from '@/components/Home/Category'
import { db } from '@/configs/FirebaseConfig'
import { collection, where,query, getDocs, doc } from 'firebase/firestore'
import ExploreBusinessList from '@/components/Explore/ExploreBusinessList'

const explore = () => {

  const [businessList,setBusinessList] = useState([]);

  const GetBusinessByCategory = async(category) => {
    setBusinessList([])
    const q=query(collection(db,'BusinesslList'),where('category', '==', category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
        setBusinessList(prev =>[...prev, {id:doc.id,...doc.data()}])
      })
  }
  return (
    <View style={{
      padding:20,
      marginTop:10,
    }}>
      {/* Search bar */}
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25,
      }}>Explore More</Text>
      <View style={{
                display: "flex",
                flexDirection: 'row',
                alignItems: 'center',
                gap:10,
                backgroundColor:Colors.primary,
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                marginTop:20
            }}>
                <TextInput placeholder='Search...' placeholderTextColor={'#fff'} style={{
                    flex: 1,
                    fontFamily:'outfit',
                    color:'#fff',
                    fontSize:18,
                }} />

                <TouchableOpacity >
                    <Ionicons name='search' size={28} color={'#fff'} />
                </TouchableOpacity>
            </View>
      {/* Category */}
        <Category explore={true}
        onCategorySelect={(category) => GetBusinessByCategory(category)}/>
      {/* Business List */}
        <ExploreBusinessList
        businessList={businessList}
         />
    </View>
  )
}

export default explore

const styles = StyleSheet.create({})
import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import BuisnessListCard from '@/components/Explore/BuisnessListCard';

const MyBusiness = () => {
    const navigation = useNavigation();


    const [businessList,setBusinessList] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'My Business',
            headerShown:true
        }),
       user && GetUserBusiness();
    },[user])

    const { user } = useUser();

    const GetUserBusiness = async() => {
        setLoading(true);
        setBusinessList([]);
        const q = query(collection(db,'BusinesslList'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setBusinessList(prev => [...prev,{id:doc.id, ...doc.data()}])
        })
        setLoading(false);
    }

  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontSize: 30,
        fontFamily:"outfit-bold",
      }}>My Business</Text>

      <FlatList 
      onRefresh={GetUserBusiness}
      refreshing={loading}
      data={businessList}
      renderItem={({item,index}) => (
        <BuisnessListCard 
        business={item}
        key={index}
        />
      )}
      />
    </View>
  )
}

export default MyBusiness
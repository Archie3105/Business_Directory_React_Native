import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { Colors } from '@/constants/Colors';
import Intro from '@/components/BusinessDetail/Intro';
import ActionButton from '@/components/BusinessDetail/ActionButton';
import About from '@/components/BusinessDetail/About';
import Reviews from '@/components/BusinessDetail/Reviews';

const BusinessDetail = () => {
  const navigation = useNavigation();
  const { businessid } = useLocalSearchParams();
  // console.log("Bussiness ID", businessid)
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {

    navigation.setOptions({
      headerShown: false,
      // headerTitle: category,
    });
    GetBusinessDetailById();
  }, [])


  /*used to get BusinessDetail by id */
  const GetBusinessDetailById = async () => {
    const docRef = doc(db, 'BusinesslList', businessid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document Data : ", docSnap.data());
      setBusiness({id:docSnap.id, ...docSnap.data()})
      setLoading(false)
    } else {
      // docSnap.data() will be undefined in
      console.log("No such document!");
    }
  }

  return (
    <ScrollView >
        {
          loading ?
            <ActivityIndicator
              style={{
                marginTop: '70%'
              }}
              size={'large'}
              color={Colors.PRIMARY}
            /> :
            <View>
              {/* Intro */}
              <Intro business={business} />

              {/* Action Button */}
              <ActionButton business={business} />

              {/* About Section */}
              <About business={business} />

              {/* Reviews Section */}
              <Reviews business={business} />
            </View>
        }
     </ScrollView> 
  )
}

export default BusinessDetail







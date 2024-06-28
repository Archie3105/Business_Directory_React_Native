// import { View, Text, TouchableOpacity, FlatList } from 'react-native'
// import { Colors } from '@/constants/Colors'
// import React, { useEffect, useState } from 'react'
// import { collection, limit, query, getDocs } from 'firebase/firestore'
// import { db } from '@/configs/FirebaseConfig'
// import PopularBusinessCard from './PopularBusinessCard'

// const PopularBusiness = () => {
    
//     const  [businessList,setBusinessList] = useState([]);

//     useEffect(() => {
//       GetBusinessList();
//     }, [])
    
 
//     const GetBusinessList = async() => {
//         setBusinessList([]);
//         const q=query(collection(db, 'BusinesslList'), limit(10));
//         const querySnapshot = await getDocs(q);

//         querySnapshot.forEach((doc) => {
//             // console.log(doc.data());
//             setBusinessList((prev) => [...prev,{id:doc.id, ...doc.data()}]);
//         })
//     }
//   return (
//     <View>
//         <View style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 padding: 20,
//                 marginTop: 20,
//                 marginBottom:10,
//             }}>
//                 <Text style={{
//                     fontSize: 20,
//                     fontFamily: 'outfit-bold',
//                 }}>Popular Business</Text>

//                 <TouchableOpacity activeOpacity={0.4}>
//                     <Text style={{
//                         color: Colors.PRIMARY,
//                         textDecorationLine: 'underline',
//                         fontFamily:'outfit-medium'
//                     }}>View All</Text>
//                 </TouchableOpacity>
//             </View>
            
//             <FlatList
//             data={businessList}
//             showsHorizontalScrollIndicator={false}
//             horizontal={true}
//             renderItem={(item,index) => (
//                 <PopularBusinessCard
//                   key={index}  
//                   business={item}
//                 />
//             )}
//              />
//     </View>
//   )
// }

// export default PopularBusiness



import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { collection, limit, query, getDocs } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import PopularBusinessCard from './PopularBusinessCard';

const PopularBusiness = () => {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    GetBusinessList();
  }, []);

  const GetBusinessList = async () => {
    setBusinessList([]);
    const q = query(collection(db, 'BusinesslList'), limit(10));
    const querySnapshot = await getDocs(q);

    const businesses = [];
    querySnapshot.forEach((doc) => {
      businesses.push({ id: doc.id, ...doc.data() });
    });
    setBusinessList(businesses);
  };

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 20,
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'outfit-bold',
          }}
        >
          Popular Business
        </Text>

        <TouchableOpacity activeOpacity={0.4}>
          <Text
            style={{
              color: Colors.PRIMARY,
              textDecorationLine: 'underline',
              fontFamily: 'outfit-medium',
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={businessList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PopularBusinessCard business={item} />}
      />
    </View>
  );
};

export default PopularBusiness;

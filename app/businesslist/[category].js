// import { View, Text, FlatList, ActivityIndicator } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useLocalSearchParams, useNavigation } from "expo-router";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/configs/FirebaseConfig";
// import BusinessListCard from "@/components/BusinessListCard";
// import { Colors } from "@/constants/Colors";

// const BusinessListByCategory = () => {
//   const navigation = useNavigation();
//   const { category } = useLocalSearchParams();
//   const [businessList, setBusinessList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTitle: category,
//     });
//     getBusinessList();
//   }, []);

//   // used to get business list by category
//   const getBusinessList = async () => {
//     setLoading(true);
//     const q = query(
//       collection(db, "BusinesslList"),
//       where("category", "==", category)
//     );
//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach((doc) => {
//       // console.log(doc.data());
//       setBusinessList((prev) => [...prev, {id:doc?.id, ...doc.data()}]);
//     });
//     setLoading(false);
//   };

//   return (
//     <View>
//         {businessList?.length>0 && loading == false ? 

//       <FlatList
//         data={businessList}
//         onRefresh={getBusinessList}
//         refreshing={loading}
//         renderItem={(item, index) => (
//           <BusinessListCard 
//           key={index} 
//           business={item} />
//         )}
//       /> : loading?<ActivityIndicator 
//       style={{
//         marginTop:'70%'
//       }}
//       size={"large"}
//       color={Colors.PRIMARY}
//       /> :
//       <Text style={{
//         fontSize:20,
//         fontFamily:'outfit-bold',
//         color:Colors.GRAY,
//         textAlign:'center',
//         margintTop:'50%'
//       }}>
//         No Business Found
//       </Text>
//       }
//     </View>
//   );
// };

// export default BusinessListByCategory;


import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import BusinessListCard from "@/components/BusinessListCard";
import { Colors } from "@/constants/Colors";

const BusinessListByCategory = () => {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setLoading(true);
    const q = query(
      collection(db, "BusinesslList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    const businesses = [];
    querySnapshot.forEach((doc) => {
      businesses.push({ id: doc.id, ...doc.data() });
    });
    setBusinessList(businesses);
    setLoading(false);
  };

  return (
    <View>
      {businessList.length > 0 && !loading ? (
        <FlatList
          data={businessList}
          onRefresh={getBusinessList}
          refreshing={loading}
          renderItem={({ item }) => <BusinessListCard business={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : loading ? (
        <ActivityIndicator 
          style={{ marginTop: '70%' }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <Text style={{
          fontSize: 20,
          fontFamily: 'outfit-bold',
          color: Colors.GRAY,
          textAlign: 'center',
          marginTop: '50%'
        }}>
          No Business Found
        </Text>
      )}
    </View>
  );
};

export default BusinessListByCategory;

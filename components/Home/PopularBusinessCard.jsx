// import { View, Text, Image, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { Colors } from '@/constants/Colors'
// import { Ionicons } from '@expo/vector-icons'
// import { router } from 'expo-router'

// const PopularBusinessCard = ({ business }) => {
//   // console.log(business.item.about)
//   return (
//     <TouchableOpacity activeOpacity={0.7} onPress={()=> router.push("/businessdetail/"+business?.id)} style={{
//       marginLeft: 20,
//       padding: 10,
//       backgroundColor: '#fff',
//       shadowColor: 'black',
//       shadowOpacity: 0.2,
//       shadowRadius: 5,
//       elevation: 5,
//       borderRadius: 15,
//       marginBottom: 15,
//     }}>
//       <Image
//         source={{ uri: business.item.imageUrl }}
//         style={{
//           width: 200,
//           height: 130,
//           borderRadius: 10,
//         }}
//       />


//       <View style={{ marginTop: 7, gap: 5 }}>
//         <Text style={{
//           // textAlign: 'center',
//           fontFamily: 'outfit-bold',
//           fontSize: 17,
//         }}>{business.item.name}</Text>
//         <Text style={{
//           // textAlign: 'center',
//           fontFamily: 'outfit',
//           fontSize: 13,
//           color: Colors.GRAY
//         }}
//           numberOfLines={1}
//           ellipsizeMode='tail'
//         >{business.item.address}</Text>

//         <View style={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-between'
//         }}>
//           <View style={{
//             display: 'flex',
//             flexDirection: 'row',
//             gap: 5,
//           }}>
//             <Ionicons name='star' size={18} color={Colors.secondary} />
//             <Text style={{ fontFamily: 'outfit' }}>4.5</Text>
//           </View>
//           <Text style={{
//             fontFamily: 'outfit',
//             backgroundColor: Colors.PRIMARY,
//             color: '#fff',
//             padding: 3,
//             fontSize: 10,
//             borderRadius: 5,
//           }}>{business.item.category}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   )
// }

// export default PopularBusinessCard



import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const PopularBusinessCard = ({ business }) => {
  // console.log(business.about)
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push('/businessdetail/' + business.id)}
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 15,
        marginBottom: 15,
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: 200,
          height: 130,
          borderRadius: 10,
        }}
      />

      <View style={{ marginTop: 7, gap: 5 }}>
        <Text
          style={{
            // textAlign: 'center',
            fontFamily: 'outfit-bold',
            fontSize: 17,
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            // textAlign: 'center',
            fontFamily: 'outfit',
            fontSize: 13,
            color: Colors.GRAY,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {business.address}
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 5,
            }}
          >
            <Ionicons name="star" size={18} color={Colors.secondary} />
            <Text style={{ fontFamily: 'outfit' }}>4.5</Text>
          </View>
          <Text
            style={{
              fontFamily: 'outfit',
              backgroundColor: Colors.PRIMARY,
              color: '#fff',
              padding: 3,
              fontSize: 10,
              borderRadius: 5,
            }}
          >
            {business.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularBusinessCard;


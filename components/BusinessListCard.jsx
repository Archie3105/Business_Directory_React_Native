import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { useRouter, router } from 'expo-router'

const BusinessListCard = ({ business }) => {

    const router= useRouter();
    return (
        <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={() => router.push(`/businessdetail/${business.id}`)}
        style={{
            padding: 10,
            margin: 10,
            borderRadius: 15,
            backgroundColor: '#fff',
            shadowColor: 'black',
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 10,
            display: 'flex',
            flexDirection: 'row',
            gap:10,
        }}>
            <Image
                source={{ uri: business?.imageUrl }}
                style={{
                    width: 120,
                    height: 120,
                    borderRadius: 15,
                }}
            />

            <View style={{
                flex:1,
                gap:7,
            }}>
                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:20,
                }}>{business?.name}</Text>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:15,
                    color:Colors.GRAY,

                }}>{business?.address}</Text>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                }}>
                    <Ionicons name='star' size={18} color={Colors.secondary} />
                    <Text style={{ fontFamily: 'outfit' }}>4.5</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default BusinessListCard


// import { View, Text, Image, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { Ionicons } from '@expo/vector-icons'
// import { Colors } from '@/constants/Colors'
// import { useRouter } from 'expo-router'

// const BusinessListCard = ({ business }) => {
//     const router = useRouter();
    
//     return (
//         <TouchableOpacity 
//             activeOpacity={0.7} 
//             onPress={() => router.push(`/businessdetail/${business.id}`)}
//             style={{
//                 padding: 10,
//                 margin: 10,
//                 borderRadius: 15,
//                 backgroundColor: '#fff',
//                 shadowColor: 'black',
//                 shadowOpacity: 0.2,
//                 shadowRadius: 5,
//                 elevation: 10,
//                 display: 'flex',
//                 flexDirection: 'row',
//                 gap: 10,
//             }}>
//             <Image
//                 source={{ uri: business.imageUrl }}
//                 style={{
//                     width: 120,
//                     height: 120,
//                     borderRadius: 15,
//                 }}
//             />
//             <View style={{
//                 flex: 1,
//                 gap: 7,
//             }}>
//                 <Text style={{
//                     fontFamily: 'outfit-bold',
//                     fontSize: 20,
//                 }}>{business.name}</Text>
//                 <Text style={{
//                     fontFamily: 'outfit',
//                     fontSize: 15,
//                     color: Colors.GRAY,
//                 }}>{business.address}</Text>
//                 <View style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     gap: 5,
//                 }}>
//                     <Ionicons name='star' size={18} color={Colors.secondary} />
//                     <Text style={{ fontFamily: 'outfit' }}>4.5</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     )
// }

// export default BusinessListCard

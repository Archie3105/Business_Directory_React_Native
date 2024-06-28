// import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
// import React, { useState } from 'react'
// import { Rating } from 'react-native-ratings'
// import { Colors } from '@/constants/Colors'
// import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
// import { db } from '@/configs/FirebaseConfig'
// import { useUser } from '@clerk/clerk-expo'

// const Reviews = ({business}) => {

//     const [rating,setRating] = useState(4);
//     const [userInput, setUserInput] = useState();
//     const {user} = useUser

//     const onSubmit = async() => {
//         const docRef = doc(db,'BusinesslList', business?.id)
//         await updateDoc(docRef, {
//             reviews:arrayUnion({
//                 rating:rating,
//                 comment:userInput,
//                 userName:user?.fullName,
//                 userImage:user?.imageUrl,
//                 userEmail:user?.primaryEmailAddress?.emailAddress
//             })
//         })
//         ToastAndroid.show('Comment Added Successfully !', ToastAndroid.BOTTOM)

//     }
//   return (
//     <View style={{
//         padding:20,
//         backgroundColor:'#fff',
//     }}>
//       <Text style={{
//         fontFamily:'outfit-bold',
//         fontSize:20,
//       }}>Reviews</Text>

//       <View>
//         <Rating 
//         imageSize={25}
//         showRating={false}
//         onFinishRating={(rating) => setRating(rating)}
//         style={{
//             paddingVertical:10,
//             color:Colors.secondary,
//         }}
//          />
//          <TextInput
//          placeholder='Share Your Feedback..'
//          numberOfLines={4}
//          onChangeText={(value) => setUserInput(value)
//          }
//          style={{
//             borderWidth:1,
//             padding:10,
//             borderRadius:10, 
//             borderColor:Colors.GRAY,   
//             textAlignVertical:'top'
//          }}
//           />

//           <TouchableOpacity 
//           activeOpacity={0.8}
//           disabled={!userInput}
//           onPress={() => onSubmit()}
//           style={{
//             backgroundColor:Colors.PRIMARY,
//             padding:10,
//             borderRadius:6,
//             marginTop:10,
//           }}>
//             <Text style={{
//             color:'#fff',
//             textAlign:'center',
//             fontSize:16,
//             fontFamily:'outfit'
//           }}>Submit</Text>
//           </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// export default Reviews


import { View, Text, TextInput, TouchableOpacity, ToastAndroid, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { Rating } from 'react-native-ratings';
import { Colors } from '@/constants/Colors';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

const Reviews = ({ business }) => {
    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState('');
    const { user } = useUser();

    const onSubmit = async () => {
        if (!user) {
            ToastAndroid.show('User not logged in', ToastAndroid.BOTTOM);
            return;
        }

        const userName = user.fullName;
        const userImage = user.imageUrl;
        const userEmail = user.primaryEmailAddress?.emailAddress;

        if (!userName || !userImage || !userEmail) {
            ToastAndroid.show('Incomplete user details', ToastAndroid.BOTTOM);
            return;
        }

        const docRef = doc(db, 'BusinesslList', business?.id);

        try {
            await updateDoc(docRef, {
                reviews: arrayUnion({
                    rating: rating,
                    comment: userInput,
                    userName: userName,
                    userImage: userImage,
                    userEmail: userEmail
                })
            });
            ToastAndroid.show('Comment Added Successfully!', ToastAndroid.BOTTOM);
        } catch (error) {
            console.error("Error adding comment: ", error);
            ToastAndroid.show('Failed to add comment', ToastAndroid.BOTTOM);
        }
    };

    return (
        <View style={{ padding: 20, backgroundColor: '#fff' }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>Reviews</Text>
            <View>
                <Rating
                    imageSize={25}
                    showRating={false}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{ paddingVertical: 10, color: Colors.secondary }}
                />
                <TextInput
                    placeholder='Share Your Feedback..'
                    numberOfLines={4}
                    onChangeText={(value) => setUserInput(value)}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: Colors.GRAY,
                        textAlignVertical: 'top'
                    }}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={!userInput}
                    onPress={onSubmit}
                    style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 10,
                        borderRadius: 6,
                        marginTop: 10,
                    }}
                >
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 16,
                        fontFamily: 'outfit'
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>

            {/* Display Previous Reviews */}
            <View>
                {
                    business?.reviews?.map((item, index) => (
                        <View style={{
                            display:'flex',
                            flexDirection:'row',
                            gap:10,
                            alignItems:'center',
                            padding:10,
                            borderWidth:1,
                            borderColor:Colors.GRAY,
                            borderRadius:15,
                            marginTop:10,
                        }}>
                            <Image
                                source={{ uri: item.userImage }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 99,
                                }}
                            />
                            <View style={{
                                display:'flex',
                                gap:5,
                            }}>
                                <Text style={{
                                    fontFamily:'outfit-medium',
fontSize:16
                                }}>{item.userName}</Text>
                                <Rating 
                                imageSize={20}
                                ratingCount={item.rating}
                                style={{
                                    alignItems:'flex-start'
                                }}
                                />
                                <Text>{item.comment}</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        </View>
    );
};

export default Reviews;

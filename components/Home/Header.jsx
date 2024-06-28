import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {
    const { user } = useUser();
    // console.log(user)
    return (
        <View style={{
            padding: 20,
            paddingTop: 40,
            backgroundColor: Colors.PRIMARY,
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20,
        }}>
            <View style={{
                display: "flex",
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}>
                <Image source={{ uri: user?.imageUrl }}
                    style={{
                        width: 45,
                        height: 45,
                        borderRadius: 99
                    }}
                />
                <View>
                    <Text style={{ color: '#fff' }}>Welcome,</Text>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: 'outfit-medium',
                        color: '#fff',
                    }}>{user?.fullName}</Text>
                </View>
            </View>

            {/* Search Bar */}
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

        </View>
    )
}

export default Header

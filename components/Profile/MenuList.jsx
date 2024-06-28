import { View, Text, FlatList, Image, TouchableOpacity,Share } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { SignedOut, useAuth } from '@clerk/clerk-expo'

const MenuList = () => {

    const { signOut } = useAuth();

    const menuList = [
        {
            id: 1,
            name: 'Add Business',
            icon: require('./../../assets/images/add.png'),
            path: '/business/add-business'
        },
        {
            id: 2,
            name: 'My Business',
            icon: require('./../../assets/images/business-and-trade.png'),
            path: '/business/my-business'
        },
        {
            id: 3,
            name: 'Share App',
            icon: require('./../../assets/images/share_1.png'),
            path: 'share'
        },
        {
            id: 4,
            name: 'Logout',
            icon: require('./../../assets/images/logout.png'),
            path: 'logout'
        },
    ]

    const onMenuClick = (item) => {
        if (item.path == 'logout') {
            signOut();
            return;
        }
        if (item.path == 'share') {
            Share.share(
                {
                    message: 'Download the Business Directory App by Eternal.Code, Download URL...'
                }
            )
            return;
        }
        router.push(item.path)
    }
    return (
        <View style={{
            marginTop: 50,
        }}>
            <FlatList
                data={menuList}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => onMenuClick(item)}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            flex: 1,
                            padding: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            margin: 10,
                            borderColor: Colors.PRIMARY,
                            backgroundColor: '#fff',
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            shadowRadius: 10,
                            elevation: 10,
                            shadowOffset: 10,
                        }}>
                        <Image
                            source={item.icon}
                            style={{
                                width: 50,
                                height: 50,
                            }}
                        />
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 16,
                            flex: 1,
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

            <Text style={{
                fontFamily: 'outfit',
                textAlign: 'center',
                marginTop: 50,
                color: Colors.GRAY
            }}>Developed by Eternal.Code (Abhishek Kumar) @ 2024</Text>
        </View>
    )
}

export default MenuList
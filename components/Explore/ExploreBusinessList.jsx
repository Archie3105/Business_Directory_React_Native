import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import BusinessListCard from './BuisnessListCard'

const ExploreBusinessList = ({ businessList }) => {
    // console.log(businessList)
    return (
        <>
            <ScrollView>
                <FlatList
                scrollEnabled
                showsVerticalScrollIndicator={false}
                    data={businessList}
                    renderItem={({ item, index }) => (
                        <BusinessListCard business={item} />
                    )}
                />
                <View style={{
                    height: 400
                }}>

                </View>
            </ScrollView>
        </>
    )
}

export default ExploreBusinessList
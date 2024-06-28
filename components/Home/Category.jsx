import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { query, collection, getDocs } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import CategoryItem from './CategoryItem'
import { useRouter, router } from 'expo-router'

const Category = ({explore=false, onCategorySelect}) => {

    const [categoryList, setCategoryList] = useState([]);

    const router = useRouter();

    useEffect(() => {
        GetCategoryList();
    },[])

    const GetCategoryList = async() => {
        setCategoryList([]);
        const q=query(collection(db, 'Category'));
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            setCategoryList(prev => [...prev,doc.data()])
        })
    }

    const onCategoryPressHandler =(item) => {
        if(!explore){
            router.push('/businesslist/'+item.name)
        }
        else{
            // router.push('/explore/'+item.name)
            onCategorySelect(item.name)
        }
    }

    return (
        <View>
            {!explore&& <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
                marginTop: 10,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-bold',
                }}>Category</Text>

                <TouchableOpacity activeOpacity={0.4}>
                    <Text style={{
                        color: Colors.PRIMARY,
                        textDecorationLine: 'underline',
                        fontFamily:'outfit-medium'
                    }}>View All</Text>
                </TouchableOpacity>
            </View>}

            <FlatList 
             data={categoryList}
             horizontal={true}
             showsHorizontalScrollIndicator={false}
             renderItem={({item,index}) => (
                <CategoryItem category={item} key={index}
                // onCategoryPress={(category) => router.push('/businesslist/'+item.name)} 
                onCategoryPress={(category) => onCategoryPressHandler(item)} 

                />
             )}
            />
        </View>
    )
}

export default Category
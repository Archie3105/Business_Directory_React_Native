import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, query, getDocs, setDoc, doc } from 'firebase/firestore';
import { db, storage } from '@/configs/FirebaseConfig';
import { getDownloadURL, ref,uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo'
 

const AddBusiness = () => {
  const {user} = useUser();
  const navigation = useNavigation();
  const [image, setImage] = React.useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Business',
      headerShown: true,
    }),
      GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3], //image frame size
      quality: 1,
    });
    setImage(result?.assets[0].uri)
    console.log('result', result)
  }

  const GetCategoryList = async () => {
    setCategoryList([])
    const q = query(collection(db, 'Category'));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      console.log("Collection Output", doc.data());
      setCategoryList(prev => [...prev, {
        label: (doc.data()).name,
        value: (doc.data()).name
      }])
    })
  }

  const onAddNewBusiness = async() => {
    setLoading(true);
    const fileName = Date.now().toString()+'.jpg';
    const resp = await fetch(image);
    const blob = await resp.blob();

    const imageRef=ref(storage,'business-app/'+fileName);
    uploadBytes(imageRef, blob).then((snapshot) => {
      console.log("File Uploaded...")
    }).then(res => {
      getDownloadURL(imageRef).then(async(downloadUrl) => {
        console.log("Recent uploaded image",downloadUrl);
        saveBusinessDetail(downloadUrl)
      })
    })
    setLoading(false);
  }

  // const saveBusinessDetail = async(imageUrl) => {
  //   await setDoc(doc(db,'BusinesslList', Date.now().toString()),{
  //     name:name,
  //     address:address,
  //     contact:contact,
  //     about:about,
  //     website:website,
  //     category:category,
  //     username:user?.fullName, 
  //     userEmail:user?.emailAddress,
  //     userImage:user?.imageUrl,
  //     imageUrl:imageUrl
  //   })

  //   setLoading(false)
  //   ToastAndroid.show('New Business Added...', ToastAndroid.LONG)
  // }

  const saveBusinessDetail = async(imageUrl) => {
    // Extract the primary email address from user?.emailAddresses
    const primaryEmail = user?.emailAddresses?.[0]?.emailAddress;
  
    await setDoc(doc(db, 'BusinesslList', Date.now().toString()), {
      name: name,
      address: address,
      contact: contact,
      about: about,
      website: website,
      category: category,
      username: user?.fullName, 
      userEmail: primaryEmail, // Use the extracted email address
      userImage: user?.imageUrl,
      imageUrl: imageUrl
    });
  
    setLoading(false);
    ToastAndroid.show('New Business Added...', ToastAndroid.LONG);
  }
  return (
    <View style={{
      padding: 20,
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25,
      }}>Add New Business</Text>
      <Text style={{
        fontFamily: 'outfit',
        color: Colors.GRAY
      }}>Fill all details in order to add new business</Text>

      <TouchableOpacity style={{
        marginTop: 20,
      }}
        onPress={() => onImagePick()}>
        {!image ?
          <Image
            source={require('./../../assets/images/placeholder.png')}
            style={{
              width: 100,
              height: 100
            }}
          /> :
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
            }}
          />
        }
      </TouchableOpacity>

      <View>
        <TextInput
          onChangeText={(value) => setName(value)}
          placeholder='Name'
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit'
          }} />
        <TextInput
          onChangeText={(value) => setAddress(value)}
          placeholder='Address'
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit'
          }} />
        <TextInput
          onChangeText={(value) => setContact(value)}
          placeholder='Contact'
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit'
          }} />

        <TextInput
          onChangeText={(value) => setWebsite(value)}
          placeholder='Website'
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit'
          }} />
        <TextInput
          multiline={true}
          numberOfLines={5}
          onChangeText={(value) => setAbout(value)}
          placeholder='About'
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit',
            height: 100,
          }} />

        <View style={{
          // padding: 15,
          borderWidth: 1,
          borderRadius: 5,
          // fontSize: 17,
          backgroundColor: '#fff',
          marginTop: 10,
          borderColor: Colors.PRIMARY,
        }}>
          <RNPickerSelect
            onValueChange={(value) => {
            setCategory(value);
            console.log(category)
            }}
            items={categoryList}
          />
        </View>
      </View>

      <TouchableOpacity 
      disabled={loading}
      onPress={() => onAddNewBusiness()}
      activeOpacity={0.7} style={{
        backgroundColor: Colors.PRIMARY,
        padding:15,
        marginTop:20,
        borderRadius:10,
      }}>
      {
      loading? <ActivityIndicator size={'large'} color={'#fff'} /> :
        <Text style={{
          color: '#fff',
          textAlign:'center',
          fontFamily: 'outfit-medium',
          fontSize:16,
      }}>Add New Business</Text>}
      </TouchableOpacity>
    </View>
  )
}

export default AddBusiness
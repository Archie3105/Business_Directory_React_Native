import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser'

WebBrowser.maybeCompleteAuthSession();
const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 100,
      }}>
        <Image source={require('./../assets/images/login.png')}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: '#000'
          }} />
      </View>

      <View style={styles.subContainer} >
        <Text style={{
          fontSize:30,
          fontFamily:'outfit-bold',
          textAlign:'center'
        }}>Your Ultimate <Text style={{color:Colors.PRIMARY}}>Community Business Directory </Text><Text>App </Text></Text>

        <Text style={{
          fontSize:15,
          fontFamily:'outfit',
          textAlign:'center',
          marginVertical:20,
          color:Colors.GRAY,
        }}>Find your favorite business near your and post your own business to your community</Text>
        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={onPress} >
          <Text style={{textAlign:'center',
            fontSize:20,
            color:'#fff',
            fontFamily:'outfit'
          }}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor:'#fff',
    padding:20,
    marginTop:-20,

  },
  btn:{
    backgroundColor:Colors.PRIMARY,
    width:180,
    paddingVertical:10,
    paddingHorizontal:5,
    margin:'auto',
    borderRadius:10,
    marginTop:20,
  }
})
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/components/Home/Header'
import Slider from '@/components/Home/Slider'
import Category from '@/components/Home/Category'
import PopularBusiness from '@/components/Home/PopularBusiness'

const home = () => {
  return (
    <ScrollView>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Category */}
      <Category />
      {/* Popular Business List */}
      <PopularBusiness />

    </ScrollView>
  )
}

export default home

const styles = StyleSheet.create({})





// https://youtu.be/MvmKSNdyJ9g?si=6lFuOAmbzg9BOxF1
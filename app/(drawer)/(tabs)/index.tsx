import { View, Text, FlatList, StyleSheet, Image, Pressable, ActivityIndicator, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { router } from 'expo-router';
import { useGetMealsQuery } from '@/store/mealsApi';
import { Colors } from '@/constants/theme';
export const FONT_SIZES = {
  xs: 10, sm: 9, md: 16, lg: 18, xl: 20, xxl: 24, title: 28,
};
export const FONTS = {
  regular: 'Poppins_400Regular',
  bold: 'Poppins_700Bold',
};
export default function Index() {

  const { data: eggData, isLoading: eggLoading } = useGetMealsQuery('egg');
  const { data: chickenData, isLoading: chickenLoading } = useGetMealsQuery('chicken');
  const { data: vegData, isLoading: vegLoading } = useGetMealsQuery('veg');

  const eggMeals = eggData?.meals || [];
  const chickenMeals = chickenData?.meals || [];
  const vegMeals = vegData?.meals || [];

  if (eggLoading || chickenLoading || vegLoading) return (
    <ActivityIndicator size="large" color="#007AFF" />
  )



  const renderMealCard = ({ item }: any) => (
    <Pressable onPress={() =>router.push({pathname:'/details',params:{id:item.idMeal}})}>
    <View style={styles.card}>
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />
      <Text style={styles.cardtext} adjustsFontSizeToFit numberOfLines={2}>
        {item.strMeal}
      </Text>
    </View>
    </Pressable>
  );

  const HorizontalList = ({ data, title }: any) => (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
     data={data}                 
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item: any) => item.idMeal}
      renderItem={renderMealCard}
     
    />
    </>
  );

  return (
    <FlatList
      data={vegMeals}
      keyExtractor={(item: any) => item.idMeal}
      style={{ backgroundColor: 'white' }}  
      contentContainerStyle={styles.container}
      ListHeaderComponent={() => (
        <>
 
          <Searchbar
            placeholder="Search meals..."
            value=""
            // onChangeText={handleSearch}
            inputStyle={styles.searchInput}
            style={styles.searchbar}
          />
          <HorizontalList data={eggMeals} title="🥚 Egg Meals" />
          <HorizontalList data={chickenMeals} title="🍗 Chicken Meals" />
          <Text style={styles.sectionTitle}>🌱 Veg Meals</Text>
        </>
      )}
      renderItem={({ item }: any) => (
        <Pressable onPress={() =>router.push({pathname:'/details',params:{id:item.idMeal}})}>
        <View style={styles.verticalCard}>
          <Image source={{ uri: item.strMealThumb }} style={styles.verticalImage} />
          <View>
          <Text style={styles.verticalText} adjustsFontSizeToFit>{item.strMeal}</Text>
          <Text numberOfLines={2} adjustsFontSizeToFit style={styles.Verticaltags}> 
            {item.strIngredient1}</Text>
            <Text adjustsFontSizeToFit style={styles.Verticaltags}>
            {item.strArea}</Text>
          </View>
         
        </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchbar: {
    marginBottom: 3,
    borderRadius: 20,
    height: 40,
    // backgroundColor: 'grey',
    // justifyContent: 'center',   
    fontFamily: FONTS.regular,
  },
  searchInput: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.regular,
    minHeight: 0,
    top: 3.5,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontFamily: FONTS.bold,

    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.lg,
    marginTop: 20,
    marginBottom: 8,
  },
  card: {
    width: 90,
    marginRight: 5,
  },
  cardtext: {
    color: 'black',
    fontFamily: FONTS.bold,
    textAlign: 'center',
    marginTop: 1.5,
    fontSize: FONT_SIZES.sm,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  verticalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 8,
  },
  verticalImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  verticalText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.xs,
  },
  Verticaltags:{
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.xs,
    color: 'grey',
  }
});
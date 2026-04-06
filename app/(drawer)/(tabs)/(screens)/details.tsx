import { View, Text, Image, ScrollView, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { Chip } from 'react-native-paper';
import { useGetMealByIdQuery } from '@/store/mealsApi';
const FONTS = {
  regular:'Poppins_400Regular',
  bold:'Poppins_700Bold',
};
export default function Details() {
  const { id } = useLocalSearchParams();
   const { data, isLoading, isFetching } = useGetMealByIdQuery(id as string, {
    refetchOnMountOrArgChange: true,
  });
  const meal = data?.meals?.[0];
  function getIngredients() {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure?.trim()} ${ingredient}`);
      }
    }
    return ingredients;
  }
  if (isLoading || isFetching || !meal) return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );

  if (!meal) return (
    <View style={styles.centered}>
      <Text>Meal not found</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <View style={styles.row}>
        <Chip icon="earth" style={styles.tag} textStyle={styles.tagText}>
          {meal.strArea}
        </Chip>
        <Chip icon={() => <Text style={{ fontSize: 15 }}>🌳</Text>} style={styles.tag} textStyle={styles.tagText}>
          {meal.strCategory}
        </Chip>
      </View>
      <Text style={styles.sectionTitle}>Ingredients</Text>
      {getIngredients().map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>• {ingredient}</Text>
      ))}
      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push({
          pathname: '/addtocart',
          params: { id: meal.idMeal }
        })}
      >
        <Text style={styles.buttonText}>🛒 Add to Cart</Text>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: 'white' },
  image: {width: '100%', height: 250, objectFit: 'contain',backgroundColor:'black',borderRadius:3 },
  title: {fontSize: 22, fontFamily: FONTS.bold, padding: 16, paddingBottom: 8 },
  row: {flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  tag: {backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  tagText: {fontFamily: FONTS.regular, fontSize: 12 },
  sectionTitle: {fontSize: 18, fontFamily: FONTS.bold, paddingHorizontal: 16, marginTop: 16, marginBottom: 8 },
  ingredient: { fontFamily: FONTS.regular, fontSize: 14, paddingHorizontal: 16, marginBottom: 4 },
  instructions: { fontFamily: FONTS.regular, fontSize: 13, paddingHorizontal: 16, lineHeight: 22, color: '#444', marginBottom: 16 },
  button: { margin: 16, backgroundColor: '#007AFF', borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 32 },
  buttonText: { color: 'white', fontFamily: FONTS.bold, fontSize: 16},
});
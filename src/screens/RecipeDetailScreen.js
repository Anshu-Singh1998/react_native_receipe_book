// src/screens/RecipeDetailScreen.js
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addFavorite} from '../redux/favoritesSlice';

const RecipeDetailScreen = ({route}) => {
  const {recipe} = route.params;
  const dispatch = useDispatch();

  const handleAddFavorite = () => {
    dispatch(addFavorite(recipe));
    Alert.alert(
      'Added to Favorites',
      `${recipe.strMeal} has been added to your favorites.`,
      [{text: 'OK'}],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <Image
            source={{uri: recipe.strMealThumb}}
            style={styles.recipeImage}
            resizeMode=':"contain'
          />
          <Text style={styles.title}>{recipe.strMeal}</Text>
          <Text style={styles.category}>{recipe.strCategory}</Text>
          <Text style={styles.instructions}>{recipe.strInstructions}</Text>
          <Text style={styles.title}>Ingredients</Text>
          <View style={styles.ingredients}>
            {Array.from({length: 20}).map((_, index) => {
              const ingredient = recipe[`strIngredient${index + 1}`];
              const measure = recipe[`strMeasure${index + 1}`];
              return ingredient ? (
                <Text key={index} style={styles.ingredient}>
                  {ingredient} - {measure}
                </Text>
              ) : null;
            })}
          </View>
          <View style={{paddingBottom:20}}>
          <TouchableOpacity
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 16,
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleAddFavorite}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '600',
              }}>
              Add to Favorites
            </Text>
          </TouchableOpacity>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  category: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
  },
  ingredients: {
    marginBottom: 20,
  },
  ingredient: {
    fontSize: 16,
  },
});

export default RecipeDetailScreen;

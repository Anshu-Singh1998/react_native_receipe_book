// src/screens/FavoritesScreen.js
import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeFavorite} from '../redux/favoritesSlice';

const FavoritesScreen = ({navigation}) => {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  const handleRemoveFavorite = idMeal => {
    dispatch(removeFavorite(idMeal));
  };

  const renderFavorite = ({item}) => (
    <View style={{paddingLeft: 20, paddingRight: 20}}>
      <View style={styles.favoriteCard}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RecipeDetail', {recipe: item})}>
          <Image
            source={{uri: item.strMealThumb}}
            style={styles.favoriteImage}
          />
        </TouchableOpacity>
        <View style={styles.favoriteInfo}>
          <Text style={styles.favoriteTitle}>{item.strMeal}</Text>
          <Text style={styles.favoriteDescription}>{item.strCategory}</Text>
          <Text style={styles.quantity}>Quantity: {item.quantity}</Text>

          <View
            style={{paddingBottom: 10, paddingTop: 10, alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={{
                width: '60%',
                padding: 10,
                borderRadius: 16,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleRemoveFavorite(item.idMeal)}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '600',
                }}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.idMeal}
        renderItem={renderFavorite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  favoriteCard: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#ffefb0',
    padding: 10,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  favoriteImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  favoriteInfo: {
    flex: 1,
    marginLeft: 10,
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoriteDescription: {
    fontSize: 14,
    color: 'gray',
  },
  quantity: {
    fontSize: 14,
    color: 'gray',
  },
});

export default FavoritesScreen;

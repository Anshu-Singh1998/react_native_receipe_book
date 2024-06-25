import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
            setRecipes(response.data.meals);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(search.toLowerCase())
    );

    const renderRecipe = ({ item }) => (
        <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { recipe: item })} style={styles.recipeCard}>
                <Image source={{ uri: item.strMealThumb }} style={styles.recipeImage} resizeMode='contain' />
                <View style={styles.recipeInfo}>
                    <Text style={styles.recipeTitle}>{item.strMeal}</Text>
                    <Text style={styles.recipeDescription}>Food Category: {item.strCategory}</Text>
                </View>
            </TouchableOpacity>
        </View>

    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#cbf2d6" />
            <View style={{ justifyContent: "center", alignItems: "center" }}><Text style={{ fontSize: 20, color: "#000", fontWeight: "600" }}>Home</Text></View>
            <View style={{ paddingBottom: 20, paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search recipes..."
                    value={search}
                    onChangeText={setSearch}
                    placeholderTextColor="grey"
                />

            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={filteredRecipes}
                    keyExtractor={item => item.idMeal}
                    renderItem={renderRecipe}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 20,
        backgroundColor: "#ffefb0",
        color: "grey"
    },
    recipeCard: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#ffefb0',
        padding: 10,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    recipeImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    recipeInfo: {
        flex: 1,
        marginLeft: 10,
        justifyContent:"center"
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    recipeDescription: {
        fontSize: 14,
        color: 'gray',
    },
});

export default HomeScreen;

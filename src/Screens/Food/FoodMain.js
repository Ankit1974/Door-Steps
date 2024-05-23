import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../../../Common/Components/styles';

const FoodMain = ({ navigation }) => {
    const [categories, setCategories] = useState({
        FoodItems: [],
        AutoItems: [],
        NutritionItems: [],
        SportsItems: [],
        BooksItems: [],
        MusicalItems: [],
        PetItems: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryRefs = {
                    FoodItems: firestore().collection("Food"),
                    AutoItems: firestore().collection("Auto Accessories"),
                    NutritionItems: firestore().collection("Nutrition & Healthcare"),
                    SportsItems: firestore().collection("Sports"),
                    BooksItems: firestore().collection("Books"),
                    MusicalItems: firestore().collection("Musical Instruments"),
                    PetItems: firestore().collection("Pet Supplies")
                };

                const promises = Object.keys(categoryRefs).map(key =>
                    categoryRefs[key].get().then(snapshot => ({
                        key,
                        items: snapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }))
                    }))
                );

                const results = await Promise.all(promises);

                const newCategories = results.reduce((acc, { key, items }) => {
                    acc[key] = items;
                    return acc;
                }, {});

                setCategories(newCategories);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCategoryPress = (category) => {
        navigation.navigate(category.text);
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCategoryPress(item)}>
            <View style={styles.categoryContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.icon} onError={() => console.log("Image failed to load")} />
                {item.text.split(' & ').map((part, index) => (
                    <Text key={index} style={[styles.categoryText, { marginTop: index > 0 ? 5 : 0 }]} numberOfLines={2} ellipsizeMode="tail">
                        {part}
                    </Text>
                ))}
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    const renderCategorySection = (title, dataKey) => (
        <>
            <Text style={styles.header}>{title}</Text>
            <FlatList
                data={categories[dataKey]}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />
        </>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {renderCategorySection('Food', 'FoodItems')}
            {renderCategorySection('Auto Accessories', 'AutoItems')}
            {renderCategorySection('Nutrition & Healthcare', 'NutritionItems')}
            {renderCategorySection('Sports', 'SportsItems')}
            {renderCategorySection('Books', 'BooksItems')}
            {renderCategorySection('Musical Instruments', 'MusicalItems')}
            {renderCategorySection('Pet Supplies', 'PetItems')}
        </ScrollView>
    );
};

export default FoodMain;

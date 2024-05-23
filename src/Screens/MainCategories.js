import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MainCategories = ({ navigation }) => {
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesRef = firestore().collection('Categoriess');

            try {
                const snapshot = await categoriesRef.get();
                const categories = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    if (!data || !data.Name || !data.Image) {
                        console.error('Invalid data:', doc.id, data);
                        return null;
                    }
                    return { id: doc.id, text: data.Name, imageUrl: data.Image };
                }).filter(item => item !== null);
                setCategoryData(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryPress = (category) => {
        navigation.navigate(category.text);
    };

    const iconSize = 100;

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCategoryPress(item)} style={styles.card}>
            <View style={[styles.categoryContainer, {}]}>
                <Image source={{ uri: item.imageUrl }} style={[styles.icon, styles.circleIcon, { width: iconSize, height: iconSize }]} />
                <Text style={styles.categoryText}>{item.text}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderCategoryPair = ({ item }) => (
        <View style={styles.row}>
            {item.map((category) => (
                <View key={category.id} style={styles.cardContainer}>
                    {renderCategoryItem({ item: category })}
                </View>
            ))}
        </View>
    );

    const pairedCategories = [];
    for (let i = 0; i < categoryData.length; i += 2) {
        pairedCategories.push(categoryData.slice(i, i + 2));
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>All Categories</Text>
            <FlatList
                data={pairedCategories}
                renderItem={renderCategoryPair}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardContainer: {
        flex: 1,
        padding: 5,
    },
    card: {
        flex: 1,
        borderRadius: 12,
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 5,
    },
    categoryContainer: {
        alignItems: 'center',
    },
    icon: {
        width: 80,
        height: 48,
        marginBottom: 10,
    },
    circleIcon: {
        borderRadius: 160,
    },
    categoryText: {
        fontSize: 16,
        color: 'blue',
        textAlign: 'center',
    },
});

export default MainCategories;

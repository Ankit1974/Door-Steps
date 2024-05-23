import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Home = ({ navigation }) => {
    const [CategoryItems, setCategoryItems] = useState([]);
   
    useEffect(() => {
        const fetchCategoryItems = async () => {
            const CategoryRef = firestore().collection("Categoriess");

            try {
                const snapshot = await CategoryRef.get();
                const items = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return { id: doc.id, text: data.Name, imageUrl: data.Image };
                });
                setCategoryItems(items);
            } catch (error) {
                console.error('Error fetching Items:', error);
            }
        };

        fetchCategoryItems();
        
    }, []);

    const handleCategoryPress4 = (category) => {
        navigation.navigate(category.text);
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCategoryPress4(item)}>
            <View style={styles.categoryContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.icon} />
                <Text style={styles.categoryText}>{item.text}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
          
            <FlatList
                data={CategoryItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                numColumns={4}
            />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 15,
    },
    categoryContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginBottom: 10,
        
       
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
        borderRadius: 40,
        backgroundColor:"pink"
    },
    categoryText: {
        fontSize: 14,
        color: 'blue',
        textAlign:"center"
    },
});

export default Home;
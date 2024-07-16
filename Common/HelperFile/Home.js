import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');

const calculateNumColumns = () => {
    return Math.floor(width / 100); // Adjust the base width value if necessary
};

const Home = ({ navigation }) => {
    const [CategoryItems, setCategoryItems] = useState([]);
    const [numColumns, setNumColumns] = useState(calculateNumColumns());

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

    useEffect(() => {
        const handleResize = () => {
            setNumColumns(calculateNumColumns());
        };

        Dimensions.addEventListener('change', handleResize);

        return () => {
            Dimensions.removeEventListener('change', handleResize);
        };
    }, []);

    const handleCategoryPress4 = (category) => {
        navigation.navigate(category.text);
    };

    const renderCategoryItem = ({ item }) => {
        const itemNameParts = item.text.split(' & ');

        return (
            <TouchableOpacity onPress={() => handleCategoryPress4(item)}>
                <View style={styles.categoryContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.icon} />
                    {itemNameParts.map((part, index) => (
                        <Text key={index} style={styles.categoryText}>{part}</Text>
                    ))}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <FlatList
                data={CategoryItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                key={numColumns} // Change key to force re-render when numColumns changes
                numColumns={numColumns}
                columnWrapperStyle={styles.row}
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
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    categoryContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 12,
        marginBottom: 10,
        marginHorizontal: 5,
        minWidth: 90,
        maxWidth: (width / 4) - 20,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
        borderRadius: 25,
        backgroundColor: "pink"
    },
    categoryText: {
        fontSize: 14,
        color: 'blue',
        textAlign: "center"
    },
});

export default Home;

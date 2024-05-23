import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const HomeTopSection = ({ navigation }) => {
    const [MixItems, setMixItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mixRef = firestore().collection("Top Section");
                const [mixSnapshot] = await Promise.all([mixRef.get()]);
                const mixItems = mixSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                setMixItems(mixItems);
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
            <View style={styles.categoryGridItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.icon} onError={() => console.log("Image failed to load")} />
                <Text style={styles.categoryText}>{item.text}</Text>
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

    return (
        <FlatList
            data={MixItems}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'pink',
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    categoryGridItem: {
        flex: 1,
        justifyContent: 'center',
        padding: 0,
        margin: 10,
        marginTop:20,
        borderRadius: 0,
        aspectRatio: 1, // Ensures square shape
    },
    icon: {
        width: '30%', // Adjust size as needed
        aspectRatio: 1, // Ensures square shape
        height:170,
        marginBottom: 0,
        borderRadius: 0,
        backgroundColor: 'white',
    },
    categoryText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeTopSection;

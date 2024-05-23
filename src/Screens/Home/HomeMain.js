import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../../../Common/Components/styles';


const HomeMain = ({ navigation }) => {
    const [KitchenItems, setKitchenItems] = useState([]);
    const [FurnishingItems, setFurnishingItems] = useState([]);
    const [ToolsItems , setToolsItems] = useState([]);
    const [DecorItems , setDecorItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const kitchenRef = firestore().collection("Kitchen Items");
                const furnishingRef = firestore().collection("Home Furnishing");
                const toolsRef = firestore().collection("Home Improvement Tools");
                const decorRef = firestore().collection("Decor & Lighting");

                const [kitchenSnapshot, furnishingSnapshot, ToolsSnapshot , DecorSnapshot ] = await Promise.all([
                    kitchenRef.get(),
                    furnishingRef.get(),
                    toolsRef.get(),
                    decorRef.get(),
                    
                ]);

                const kitchenItems = kitchenSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const furnishingItems = furnishingSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const toolsItems = ToolsSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const decorItems = DecorSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));

                setKitchenItems(kitchenItems);
                setFurnishingItems(furnishingItems);
                setToolsItems(toolsItems);
                setDecorItems(decorItems);
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

    const renderCategoryItem = ({ item }) => {
        const itemNameParts = item.text.split(' & ');
    
        return (
            <TouchableOpacity onPress={() => handleCategoryPress(item)}>
                <View style={styles.categoryContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.icon} onError={() => console.log("Image failed to load")} />
                    {itemNameParts.map((part, index) => (
                        <Text key={index} style={[styles.categoryText, { marginTop: index > 0 ? 5 : 0 }]} numberOfLines={2} ellipsizeMode="tail">
                            {part}
                        </Text>
                    ))}
                </View>
            </TouchableOpacity>
        );
    };
    

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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Kitchen Items</Text>
            <FlatList
                data={KitchenItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Home Furnishings</Text>
            <FlatList
                data={FurnishingItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Home Improvement Tools</Text>
            <FlatList
                data={ToolsItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Decor & Lighting</Text>
            <FlatList
                data={DecorItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />
            
        </ScrollView>
    );
};


export default HomeMain;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../../../Common/Components/styles';
import { FullWindowOverlay } from 'react-native-screens';

const SportsHubMain = ({ navigation }) => {
    const [SportsItems, setSportsItems] = useState([]);
    const [FitnessItems, setFitnessItems] = useState([]);
    const [FootwearItems, setFootwearItems] = useState([]);
    const [ActiveItems, setActiveItems] = useState([]);
    const [NutritionItems, setNutritionItems] = useState([]);
    const [AccessoriesItems, setAcessoriesItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sportsRef = firestore().collection("Sports");
                const fitnessRef = firestore().collection("Fitness");
                const footwearRef = firestore().collection("Footwear");
                const activeRef = firestore().collection("Active Wear");
                const nutritionRef = firestore().collection("Nutrition & Healthcare");
                const accessoriesRef = firestore().collection("Accessories");

                const [sportsSnapshot, fitnessSnapshot, footwearSnapshot,  activeSnapshot, nutritionSnapshot, accessoriesSnapshot,] = await Promise.all([
                    sportsRef.get(),
                    fitnessRef.get(),
                    footwearRef.get(),
                    activeRef.get(),
                    nutritionRef.get(),
                    accessoriesRef.get(),
                ]);

                const sportsItems = sportsSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const fitnessItems = fitnessSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const footwearItems = footwearSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const activeItems =  activeSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const nutritionItems = nutritionSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const accessoriesItems = accessoriesSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));

                setSportsItems(sportsItems);
                setFitnessItems(fitnessItems);
                setFootwearItems(footwearItems);
                setActiveItems(activeItems);
                setNutritionItems(nutritionItems);
                setAcessoriesItems(accessoriesItems);
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
        //const itemNameParts = item.text.split(' & ');

        const itemNameParts = item.text ? item.text.split(' & ') : ['Unnamed'];

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
            <Text style={styles.header}>Sports</Text>
            <FlatList
                data={SportsItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Fitness</Text>
            <FlatList
                data={FitnessItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Footwear</Text>
            <FlatList
                data={FootwearItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Active Wear</Text>
            <FlatList
                data={ActiveItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Nutrition & Healthcare</Text>
            <FlatList
                data={NutritionItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Accessories</Text>
            <FlatList
                data={AccessoriesItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />
        </ScrollView>
    );
};

export default SportsHubMain;

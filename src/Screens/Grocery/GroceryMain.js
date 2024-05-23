import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../../../Common/Components/styles';


const GroceryMain = ({ navigation }) => {
    const [StaplesItems, setStaplesItems] = useState([]);
    const [SnacksItems, setSnacksItems] = useState([]);
    const [PersonalItems , setPersonalItems] = useState([]);
    const [PackagedItems , setPackagedItems] = useState([]);
    const [HouseItems , setHouseItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const staplesRef = firestore().collection("Staples");
                const snacksRef = firestore().collection("Snacks & Beverages");
                const personalRef = firestore().collection("Personal & Baby Care");
                const packagedRef = firestore().collection("Packaged Fodd");
                const houseRef = firestore().collection("Household Care");
                
                const [staplesSnapshot, snacksSnapshot, personalSnapshot , packagedSnapshot ,  houseSnapshot ] = await Promise.all([
                    staplesRef.get(),
                    snacksRef.get(),
                    personalRef.get(),
                    packagedRef.get(),
                    houseRef.get(),
                
                    
                ]);

                const staplesItems = staplesSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const snacksItems = snacksSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const personalItems = personalSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const packagedItems = packagedSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const houseItems = houseSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                
                setStaplesItems(staplesItems);
                setSnacksItems(snacksItems);
                setPersonalItems(personalItems);
                setPackagedItems(packagedItems);
                setHouseItems(houseItems);
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
            <Text style={styles.header}>Staples</Text>
            <FlatList
                data={StaplesItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Snacks & Beverages</Text>
            <FlatList
                data={SnacksItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Personal & Baby Care</Text>
            <FlatList
                data={PersonalItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Packaged Food</Text>
            <FlatList
                data={PackagedItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Household Care</Text>
            <FlatList
                data={HouseItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

        </ScrollView>
    );
};


export default GroceryMain;





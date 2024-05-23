import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../../../Common/Components/styles';

const MobileMain = ({ navigation }) => {
    const [MobileItems, setMobileItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mobileRef = firestore().collection("Shop By Brands");

                const [mobileSnapshot] = await Promise.all([
                    mobileRef.get(),
                ]);

                const mobileItems = mobileSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));

                setMobileItems(mobileItems);
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
            <Text style={styles.header}>Shop By Brand</Text>
            <FlatList
                data={MobileItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />
        </ScrollView>
    );
};

export default MobileMain;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../../../Common/Components/styles';


const FashionsMain = ({ navigation }) => {
    const [MenItems, setMenItems] = useState([]);
    const [footwearItems, setFootwearItems] = useState([]);
    const [WomenItems , setWomenItems] = useState([]);
    const [BagsItems , setBagsItems] = useState([]);
    const [EssentialsItems , setEssentialsItems] = useState([]);
    const [WomenEssentialsItems , setWomenEssentialsItems] = useState([]);
    const [KidsItems , setKidsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const menRef = firestore().collection("Men's Clothing");
                const footwearRef = firestore().collection("Men's Footwear & Accessories");
                const womenRef = firestore().collection("Women's Clothing");
                const bagsRef = firestore().collection("Suitcase , Bags & Backpacks");
                const EssentialsRef = firestore().collection("Men's Essentials");
                const WomenEssentialsRef = firestore().collection("Women's Essentials");
                const KidsRef = firestore().collection("Kids Fashion");

                const [menSnapshot, footwearSnapshot, womenSnapshot , bagsSnapshot ,  essentialsSnapshot , womenessentialsSnapshot , kidsSnapshot] = await Promise.all([
                    menRef.get(),
                    footwearRef.get(),
                    womenRef.get(),
                    bagsRef.get(),
                    EssentialsRef.get(),
                    WomenEssentialsRef.get(),
                    KidsRef.get(),
                    
                ]);

                const menItems = menSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const footwearItems = footwearSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const womenItems = womenSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const bagsItems = bagsSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const essentialsItems = essentialsSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const WomenessentialsItems = womenessentialsSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const kidsItems = kidsSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));

                setMenItems(menItems);
                setFootwearItems(footwearItems);
                setWomenItems(womenItems);
                setBagsItems(bagsItems);
                setEssentialsItems(essentialsItems);
                setWomenEssentialsItems(WomenessentialsItems);
                setKidsItems(kidsItems)
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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Men's Clothing</Text>
            <FlatList
                data={MenItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Men's Footwear & Accessories</Text>
            <FlatList
                data={footwearItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Women's Clothing</Text>
            <FlatList
                data={WomenItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Suitcase , Bags & Backpacks</Text>
            <FlatList
                data={BagsItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Men's Essentials</Text>
            <FlatList
                data={EssentialsItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

             <Text style={styles.header}>Women's Essentials</Text>
            <FlatList
                data={WomenEssentialsItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Kids Fashion</Text>
            <FlatList
                data={KidsItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />
        </ScrollView>
    );
};


export default FashionsMain;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../../../Common/Components/styles';
import { FullWindowOverlay } from 'react-native-screens';

const FurnitureMain = ({ navigation }) => {
    const [BedroomItems, setBedroomItems] = useState([]);
    const [LivingItems, setLivivngItems] = useState([]);
    const [StudyItems, setStudyItems] = useState([]);
    const [DiningItems, setDiningItems] = useState([]);
    const [OutdoorItems, setOutdoorItems] = useState([]);
    const [KidsItems, setKidsItems] = useState([]);
    const [StorageItems, setStorageItems] = useState([]);
    const [HiddenItems, setHiddenItems] = useState([]);
    const [MaterialItems, setMaterialItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bedroomRef = firestore().collection("Bedroom Furniture");
                const livingRef = firestore().collection("Living Room Furniture");
                const StudyRef = firestore().collection("Study & Office Furniture");
                const DiningRef = firestore().collection("Dining & Kitchen");
                const OutdoorRef = firestore().collection("Outdoor Furniture");
                const kidsRef = firestore().collection("Kids' Room");
                const StorageRef = firestore().collection("Storage Furniture");
                const hiddenRef = firestore().collection("Hidden Gems");
                const MaterialRef = firestore().collection("Material Type");

                const [bedroomSnapshot, livingSnapshot, StudySnapshot,  DiningSnapshot, OutdoorSnapshot, kidsSnapshot, StorageSnapshot , hiddenSnapshot ,  MaterialSnapshot] = await Promise.all([
                    bedroomRef.get(),
                    livingRef.get(),
                    StudyRef.get(),
                    DiningRef.get(),
                    OutdoorRef.get(),
                    kidsRef.get(),
                    StorageRef.get(),
                    hiddenRef.get(),
                    MaterialRef.get(),
                ]);

                const bedroomItems = bedroomSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const livingItems = livingSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const StudyItems = StudySnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const DiningItems =  DiningSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const OutdoorItems = OutdoorSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const kidsItems = kidsSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const StorageItems = StorageSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const hiddenItems =  hiddenSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const materialItems = MaterialSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));

                setBedroomItems(bedroomItems);
                setLivivngItems(livingItems);
                setStudyItems(StudyItems);
                setDiningItems(DiningItems);
                setOutdoorItems(OutdoorItems);
                setKidsItems(kidsItems);
                setStorageItems(StorageItems);
                setHiddenItems(hiddenItems);
                setMaterialItems(materialItems);
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
            <Text style={styles.header}>Bedroom Furniture</Text>
            <FlatList
                data={BedroomItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Living Room Furniture</Text>
            <FlatList
                data={LivingItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Study & Office Furniture</Text>
            <FlatList
                data={StudyItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Dining & Kitchen</Text>
            <FlatList
                data={DiningItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Outdoor Furniture</Text>
            <FlatList
                data={OutdoorItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Kids Room</Text>
            <FlatList
                data={KidsItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Storage Furniture</Text>
            <FlatList
                data={StorageItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Hidden Gems</Text>
            <FlatList
                data={HiddenItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Material Type</Text>
            <FlatList
                data={MaterialItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />
        </ScrollView>
    );
};

export default FurnitureMain;

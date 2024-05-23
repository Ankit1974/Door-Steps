import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../../../Common/Components/styles';


const ToysBabyMain = ({ navigation }) => {
    const [ToysItems, setToysItems] = useState([]);
    const [BabyItems, setBabyItems] = useState([]);
    const [SchoolItems, setSchoolItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const toysRef = firestore().collection("Toys");
                const babyRef = firestore().collection("Baby Care");
                const schoolRef = firestore().collection("Stationary & School Supplies");


                const [toysSnapshot , babySnapshot , schoolSnapshot] = await Promise.all([
                    toysRef.get(),
                    babyRef.get(),
                    schoolRef.get(),

                    
                ]);

                const toysItems = toysSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const babyItems = babySnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const schoolItems = schoolSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));


                setToysItems(toysItems);
                setBabyItems(babyItems);
                setSchoolItems(schoolItems);
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
            <Text style={styles.header}>Toys</Text>
            <FlatList
                data={ToysItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Baby Care</Text>
            <FlatList
                data={BabyItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />
            
            <Text style={styles.header}>Stationery & School Supplies</Text>
            <FlatList
                data={SchoolItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            /> 
        </ScrollView>
    );
};

export default ToysBabyMain ;

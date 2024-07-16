import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../../../Common/Components/styles';

const ElectronicsMain = ({ navigation }) => {
    const [LaptopsItems, setLaptopsItems] = useState([]);
    const [HeadphonesItems, setHeadphonesItems] = useState([]);
    const [SmartwatchesItems, setSmartwatchesItems] = useState([]);
    const [PersonalItems, setPersonalItems] = useState([]);
    const [TabletsItems, setTabletsItems] = useState([]);
    const [ComputerpItems, setComputerpItems] = useState([]);
    const [CasesItems, setCasesItems] = useState([]);
    const [MobileaItems, setMobileaItems] = useState([]);
    const [PowerbanksItems, setPowerbanksItems] = useState([]);
    const [SmartItems, setSmartItems] = useState([]);
    const [HealthItems, setHealthItems] = useState([]);
   
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const laptopsRef = firestore().collection("Laptops");
                const headphonesRef = firestore().collection("Headphones & Speakers");
                const smartwatchesRef = firestore().collection("Smartwatches");
                const personalRef = firestore().collection("Personal Care Appliances");
                const tabletsRef = firestore().collection("Tablets");
                const computerRef = firestore().collection("Computer Peripheral ");
                const casesRef = firestore().collection("Cases, Covers & more");
                const mobileaRef = firestore().collection("Mobile Accessories");
                const powerbanksRef = firestore().collection("Powerbanks");
                const smartRef = firestore().collection("Smart Home Automation");
                const healthRef = firestore().collection("Health Care Devices");


                const [laptopsSnapshot, headphonesSnapshot, smartwatchesSnapshot, personalSnapshot, tabletsSnapshot, computerSnapshot, casesSnapshot , mobileaSnapshot , powerbanksSnapshot , smartSnapshot , healthSnapshot] = await Promise.all([
                    laptopsRef.get(),
                    headphonesRef.get(),
                    smartwatchesRef.get(),
                    personalRef.get(),
                    tabletsRef.get(),
                    computerRef.get(),
                    casesRef.get(),
                    mobileaRef.get(),
                    powerbanksRef.get(),
                    smartRef.get(),
                    healthRef.get(),
                ]);

                const laptopsItems = laptopsSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const headphonesItems = headphonesSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const smartwatchesItems = smartwatchesSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const personalItems = personalSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const tabletsItems = tabletsSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const computerItems = computerSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const casesItems = casesSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const mobileaItems = mobileaSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const powerbanksItems = powerbanksSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const smartItems = smartSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const healthItems = healthSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
               

                setLaptopsItems(laptopsItems);
                setHeadphonesItems(headphonesItems);
                setSmartwatchesItems(smartwatchesItems);
                setPersonalItems(personalItems);
                setTabletsItems(tabletsItems);
                setComputerpItems(computerItems);
                setCasesItems(casesItems);
                setMobileaItems(mobileaItems);
                setPowerbanksItems(powerbanksItems);
                setSmartItems(smartItems);
                setHealthItems(healthItems);
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
            <Text style={styles.header}>Laptops</Text>
            <FlatList
                data={LaptopsItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Headphones & Speakers</Text>
            <FlatList
                data={HeadphonesItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Smartwatches</Text>
            <FlatList
                data={SmartwatchesItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Personal Care Appliances</Text>
            <FlatList
                data={PersonalItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Tablets</Text>
            <FlatList
                data={TabletsItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Computer Peripheral</Text>
            <FlatList
                data={ComputerpItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Cases , Covers & more</Text>
            <FlatList
                data={CasesItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Mobile Accessories</Text>
            <FlatList
                data={MobileaItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Powerbanks</Text>
            <FlatList
                data={PowerbanksItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Smart Home Automation</Text>
            <FlatList
                data={SmartItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Health Care Devices</Text>
            <FlatList
                data={HealthItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />
        </ScrollView>
    );
};

export default ElectronicsMain;

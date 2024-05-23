import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../../../Common/Components/styles';

const AppliancesMain = ({ navigation }) => {
    const [AirItems, setAirItems] = useState([]);
    const [RefrigeratorsItems, setRefrigeratorsItems] = useState([]);
    const [TelevisionsItems, setTelevisionsItems] = useState([]);
    const [CoolingItems, setCoolingItems] = useState([]);
    const [WashingItems, setWashingItems] = useState([]);
    const [KitchenItems, setKitchenItems] = useState([]);
    const [HomeItems, setHomeItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const airRef = firestore().collection("Air Conditioners");
                const refrigeratorsRef = firestore().collection("Refrigerators");
                const televisionsRef = firestore().collection("Televisions");
                const coolingRef = firestore().collection("Cooling Appliances");
                const washingRef = firestore().collection("Washing Machines");
                const kitchenRef = firestore().collection("Kitchen Appliances");
                const homeRef = firestore().collection("Home Appliances");

                const [airSnapshot, refrigeratorsSnapshot, televisionsSnapshot, coolingSnapshot, washingSnapshot, kitchenSnapshot, homeSnapshot] = await Promise.all([
                    airRef.get(),
                    refrigeratorsRef.get(),
                    televisionsRef.get(),
                    coolingRef.get(),
                    washingRef.get(),
                    kitchenRef.get(),
                    homeRef.get(),
                ]);

                const airItems = airSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const refrigeratorsItems = refrigeratorsSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const televisionsItems = televisionsSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const coolingItems = coolingSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const washingItems = washingSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const kitchenItems = kitchenSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));
                const homeItems = homeSnapshot.docs.map(doc => ({ id: doc.id, text: doc.data().Name, imageUrl: doc.data().Image }));

                setAirItems(airItems);
                setRefrigeratorsItems(refrigeratorsItems);
                setTelevisionsItems(televisionsItems);
                setCoolingItems(coolingItems);
                setWashingItems(washingItems);
                setKitchenItems(kitchenItems);
                setHomeItems(homeItems);
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
            <Text style={styles.header}>Air Conditioners</Text>
            <FlatList
                data={AirItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Refrigerators</Text>
            <FlatList
                data={RefrigeratorsItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Televisions</Text>
            <FlatList
                data={TelevisionsItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Cooling Appliances</Text>
            <FlatList
                data={CoolingItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Washing Machines</Text>
            <FlatList
                data={WashingItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Kitchen Appliances</Text>
            <FlatList
                data={KitchenItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Home Appliances</Text>
            <FlatList
                data={HomeItems}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
            />
        </ScrollView>
    );
};

export default AppliancesMain;

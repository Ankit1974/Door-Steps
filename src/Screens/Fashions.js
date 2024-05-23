
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AirbnbRating } from 'react-native-ratings';

const Fashions = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const itemsRef = firestore().collection('Fashion');
            try {
                const snapshot = await itemsRef.get();
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setItems(data);
            } catch (error) {
                console.error('Error fetching items', error);
            }
        };
        fetchItems();
    }, []);
    
    const renderRating = (rating) => (
        <AirbnbRating
            defaultRating={4}
            selectedColor='green'
            size={16}
            showRating={false}
            isDisabled
            
        />
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => console.log(`Selected ${item.name}`)}>
            <View style={styles.itemContainer }>
                <Image source={{ uri: item.Image }} style={styles.image} />
                <View style={styles.itemDetails}>
                    <Text style={styles.name}>{item['Company Name']}</Text>
                    <Text style={styles.price}>₹{item.Price}</Text>
                                      
                    {renderRating(item.rating)}
                </View>
                  
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Fashion</Text>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#808080',
        marginBottom: 15,
        color:"black"
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 8,
        borderRadius: 12,
        padding: 10,
    },
    image: {
        width: 150,
        height: 170,
        borderRadius: 12,
        marginBottom: 10,
        backgroundColor: 'pink',
    },
    itemDetails: {
        flex: 1,
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color:"black"
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color:"black"
    },
    addButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    flatListContent: {
        flexGrow: 1,
    },
});

export default Fashions;

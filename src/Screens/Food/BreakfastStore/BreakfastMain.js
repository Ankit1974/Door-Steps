import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AirbnbRating } from 'react-native-ratings'; // Import AirbnbRating from react-native-ratings
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon

const BreakfastMain = ({ navigation }) => {
    const [TravelItems, setTravelItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const travelRef = firestore().collection("Breakfast Store");
                const travelSnapshot = await travelRef.get();
                const travelItems = travelSnapshot.docs.map(doc => ({
                    id: doc.id,
                    text: doc.data().Name,
                    imageUrl: doc.data().Image,
                    price: doc.data().Price,
                    oldprice: doc.data().Oldprice,
                    Discount: doc.data().discount,
                    delivery: doc.data().Delivery,
                }));

                setTravelItems(travelItems);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleProductPress = (product) => {
        navigation.navigate(product.text);
    };

    const renderProductItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleProductPress(item)}>
                <View style={styles.card}>
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.cardImage}
                        onError={() => console.log("Image failed to load")}
                    />
                    <TouchableOpacity style={styles.wishlistIcon}>
                        <Icon name="heart" size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.cardText} numberOfLines={2} ellipsizeMode="tail">
                        {item.text}
                    </Text>
                    <View style={styles.rating}>
                        <AirbnbRating
                            count={5}
                            reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
                            defaultRating={4}
                            size={15}
                            showRating={false}
                            isDisabled={true}
                            selectedColor="green"
                        />
                    </View>
                    <View style={styles.cardPrice}>
                        <Text style={[styles.discount, styles.arrow]}>{'\u25BE'}</Text>
                        <Text style={styles.discount}>{item.Discount}%</Text>
                        <Text style={styles.oldPrice}>{item.oldprice}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                    </View>
                    <Text style={styles.delivery}>
                        <Text style={styles.deliveryText}>Free delivery by</Text> {item.delivery}
                    </Text>
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
        <FlatList
            data={TravelItems}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.flatListContentContainer}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        backgroundColor: '#fff',
        borderRadius: 0,
        shadowColor: '#000',
        shadowRadius: 0,
        elevation: 5,
        marginLeft: 0,
        width: 195,
        height: 300,
        position: 'relative', // Added to enable absolute positioning within the card
    },
    cardImage: {
        width: '80%',
        height: 157,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardText: {
        fontSize: 12,
        color: 'black',
        paddingTop: 5,
        paddingLeft: 12,
    },
    cardPrice: {
        fontSize: 14,
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Align items vertically
        alignSelf: 'flex-start',
        paddingLeft: 15,
    },
    arrow: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green',
        marginRight: 5
    },
    discount: {
        color: 'green',
        textDecorationLine: 'none', // To remove default underline
        fontWeight: 'bold',
        marginRight: 5
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        color: 'gray', // or any color you prefer for the old price
        fontWeight: 'bold',
        marginRight: 5
    },
    price: {
        color: 'black',
        fontWeight: 'bold',
    },
    rating: {
        alignSelf: 'flex-start',
        paddingLeft: 12,
        paddingTop: 5
    },
    delivery: {
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: 12,
    },
    deliveryText: {
        color: 'gray',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContentContainer: {
        paddingHorizontal: 0,
        paddingBottom: 0,
    },
    wishlistIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        backgroundColor: 'gray', // Gray background color for the radius
        padding: 5,
        borderRadius: 19, // Make the icon's background a circle
    },
});

export default BreakfastMain;

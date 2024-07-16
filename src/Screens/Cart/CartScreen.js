import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = auth().currentUser?.uid;

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartRef = firestore().collection('users').doc(userId).collection('cart');
                const cartSnapshot = await cartRef.get();
                const items = cartSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        text: data.text || 'No name',
                        imageUrl: data.imageUrl || 'https://via.placeholder.com/100',
                        price: data.price !== undefined ? data.price : 0,
                        rating: data.rating,
                        oldprice: data.oldprice,
                        Discount: data.Discount,
                        delivery: data.delivery,
                        quantity: data.quantity,
                    };
                });
                setCartItems(items);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [userId]);

    const handleDelete = async (itemId) => {
        try {
            const cartRef = firestore().collection('users').doc(userId).collection('cart');
            await cartRef.doc(itemId).delete();
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Error deleting item: ", error);
        }
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItemContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemText} numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
                <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
                <View style={styles.rating}>
                    <AirbnbRating
                        count={5}
                        reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
                        defaultRating={item.rating || 4}  // Use default parameter here
                        size={15}
                        showRating={false}
                        isDisabled={true}
                        selectedColor="green"
                    />
                </View>
                <View style={styles.priceContainer}>
                    <Text style={[styles.cartItemDiscount, styles.arrow]}>{'\u25BE'}</Text>
                    <Text style={styles.cartItemDiscount}>{item.Discount}%</Text>
                    <Text style={styles.cartItemOldPrice}>₹{item.oldprice}</Text>
                    <Text style={styles.cartItemPrice}>₹{item.price}</Text>
                </View>
                <Text style={styles.cartItemDelivery}>Delivery by {item.delivery}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                    <Icon name="trash-outline" size={20} color="gray" style={styles.deleteIcon} />
                    <Text style={styles.deleteButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContentContainer}
        />
    );
};

const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: 'row',
        padding: width * 0.03,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cartItemImage: {
        width: width * 0.3,
        height: height * 0.2,
    },
    cartItemDetails: {
        marginLeft: width * 0.03,
        justifyContent: 'center',
        flex: 1,
    },
    rating: {
        paddingLeft: width * 0.01,
        alignSelf: 'flex-start',
        paddingTop: height * 0.01,
    },
    cartItemText: {
        fontSize: width * 0.045,
        color: 'black',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.01,
    },
    cartItemPrice: {
        fontSize: width * 0.04,
        color: 'black',
        marginLeft: width * 0.02,
        fontWeight: 'bold',
    },
    cartItemOldPrice: {
        fontSize: width * 0.04,
        color: 'gray',
        textDecorationLine: 'line-through',
        marginLeft: width * 0.02,
        fontWeight: 'bold',
    },
    cartItemDiscount: {
        fontSize: width * 0.035,
        color: 'green',
        marginLeft: width * 0.01,
        fontWeight: 'bold',
    },
    arrow: {
        fontSize: width * 0.06,
        color: 'green',
    },
    cartItemDelivery: {
        fontSize: width * 0.035,
        color: 'black',
        marginTop: height * 0.01,
    },
    cartItemQuantity: {
        fontSize: width * 0.035,
        color: '#888',
        marginTop: height * 0.01,
    },
    deleteButton: {
        marginTop: height * 0.015,
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteButtonText: {
        fontSize: width * 0.045,
        color: 'gray',
        fontWeight: 'bold',
        marginLeft: width * 0.02,
    },
    deleteIcon: {
        marginLeft: width * 0.02,
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
        paddingBottom: height * 0.1,
    },
});

export default CartScreen;

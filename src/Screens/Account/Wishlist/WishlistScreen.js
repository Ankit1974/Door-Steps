import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

const WishlistScreen = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = auth().currentUser.uid;

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const wishlistRef = firestore().collection('users').doc(userId).collection('wishlist');
                const wishlistSnapshot = await wishlistRef.get();
                const wishlistItems = wishlistSnapshot.docs.map(doc => doc.data());

                setWishlistItems(wishlistItems);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchWishlistItems();
    }, []);

    const handleRemoveFromWishlist = async (product) => {
        try {
            const wishlistRef = firestore().collection('users').doc(userId).collection('wishlist');
            const itemSnapshot = await wishlistRef.where('id', '==', product.id).get();
            itemSnapshot.forEach(doc => doc.ref.delete());

            setWishlistItems(prevItems => prevItems.filter(item => item.id !== product.id));
            Toast.show({
                type: 'success',
                text1: 'Removed from Wishlist',
                text2: `Product "${product.text}" has been removed from your wishlist.`,
            });
        } catch (error) {
            console.error("Error removing from wishlist: ", error);
        }
    };

    const renderWishlistItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.cardContainer}>
                <View style={styles.card}>
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.cardImage}
                        onError={() => console.log("Image failed to load")}
                    />
                    <TouchableOpacity style={styles.removeIcon} onPress={() => handleRemoveFromWishlist(item)}>
                        <Icon name="trash" size={20} color="white" />
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
                        <Text style={styles.discount}>{item.discount}%</Text>
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

    if (wishlistItems.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Your wishlist is empty.</Text>
            </View>
        );
    }

    return (
        <>
            <FlatList
                data={wishlistItems}
                renderItem={renderWishlistItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.flatListContentContainer}
            />
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </>
    );
};

const { width } = Dimensions.get('window');
const cardWidth = width * 0.45;

const styles = StyleSheet.create({
    cardContainer: {
        width: '50%',
        padding: 5,
    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: '#000',
        shadowRadius: 0,
        elevation: 0,
        padding: 8,
    },
    cardImage: {
        width: '100%',
        height: cardWidth * 0.75,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardText: {
        fontSize: 14,
        color: 'black',
        paddingTop: 5,
        textAlign: 'left',
    },
    cardPrice: {
        fontSize: 14,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingLeft: 8,
    },
    arrow: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green',
        marginRight: 5,
    },
    discount: {
        color: 'green',
        textDecorationLine: 'none',
        fontWeight: 'bold',
        marginRight: 5,
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        color: 'gray',
        fontWeight: 'bold',
        marginRight: 5,
    },
    price: {
        color: 'black',
        fontWeight: 'bold',
    },
    rating: {
        alignSelf: 'flex-start',
        paddingLeft: 8,
        paddingTop: 5,
    },
    delivery: {
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: 0,
    },
    deliveryText: {
        color: 'gray',
        fontWeight: 'bold',
        textAlign: 'left'
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
    },
    removeIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    flatListContentContainer: {
        padding: 5,
    },
});

export default WishlistScreen;


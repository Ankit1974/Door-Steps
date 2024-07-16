import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { NotificationContext } from '../../../Notification/NotificationContext';

const { width, height } = Dimensions.get('window');

const NutsDryFruitsMain = ({ navigation }) => {
    const [DryFruitsItems, setDryFruitsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]); // State to store wishlist item IDs
    const { addNotification } = useContext(NotificationContext);
    const userId = auth().currentUser.uid;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dryFruitsRef = firestore().collection("Nuts & Dry Fruits");
                const dryFruitsSnapshot = await dryFruitsRef.get();
                const dryFruitsItems = dryFruitsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    text: doc.data().Name,
                    imageUrl: doc.data().Image,
                    price: doc.data().Price,
                    oldprice: doc.data().Oldprice,
                    Discount: doc.data().discount,
                    delivery: doc.data().Delivery,
                }));

                setDryFruitsItems(dryFruitsItems);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        const fetchWishlist = async () => {
            try {
                const wishlistRef = firestore().collection('users').doc(userId).collection('wishlist');
                const wishlistSnapshot = await wishlistRef.get();
                const wishlistItems = wishlistSnapshot.docs.map(doc => doc.data().id); // Fetch wishlist item IDs
                setWishlistItems(wishlistItems);
            } catch (error) {
                console.error("Error fetching wishlist: ", error);
            }
        };

        fetchData();
        fetchWishlist();
    }, []);

    const handleProductPress = (product) => {
        navigation.navigate('ProductDetail', { product });
    };

    const handleWishlistPress = async (product) => {
        try {
            const wishlistRef = firestore().collection('users').doc(userId).collection('wishlist');
            const existingItem = wishlistItems.includes(product.id); // Check if item is in the wishlist
            if (!existingItem) {
                await wishlistRef.add(product);
                setWishlistItems([...wishlistItems, product.id]); // Update state with new wishlist item
                const notification = `Product "${product.text}" has been added to your wishlist.`;
                addNotification(notification, product.imageUrl);
                Toast.show({
                    type: 'success',
                    text1: 'Added to Wishlist',
                    text2: notification,
                });
            } else {
                const itemSnapshot = await wishlistRef.where('id', '==', product.id).get();
                itemSnapshot.forEach(doc => doc.ref.delete());
                setWishlistItems(wishlistItems.filter(id => id !== product.id)); // Update state after removing item
                Toast.show({
                    type: 'info',
                    text1: 'Removed from Wishlist',
                    text2: `Product "${product.text}" has been removed from your wishlist.`,
                });
            }
        } catch (error) {
            console.error("Error updating wishlist: ", error);
        }
    };

    const renderProductItem = ({ item }) => {
        const isInWishlist = wishlistItems.includes(item.id); // Check if item is in wishlist

        return (
            <TouchableOpacity onPress={() => handleProductPress(item)}>
                <View style={styles.card}>
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.cardImage}
                        onError={() => console.log("Image failed to load")}
                    />
                    <TouchableOpacity
                        style={[styles.wishlistIcon, isInWishlist && styles.wishlistIconActive]} // Apply active style if in wishlist
                        onPress={() => handleWishlistPress(item)}
                    >
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
        <>
            <FlatList
                data={DryFruitsItems}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.flatListContentContainer}
            />
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: width * 0.02,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: width * 0.45,
        height: height * 0.35,
        position: 'relative',
    },
    cardImage: {
        width: '80%',
        height: '50%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardText: {
        fontSize: width * 0.04,
        color: 'black',
        paddingTop: height * 0.01,
        paddingHorizontal: width * 0.02,
        textAlign: 'left',
    },
    cardPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: width * 0.04,
    },
    arrow: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: 'green',
        marginRight: width * 0.01,
    },
    discount: {
        color: 'green',
        textDecorationLine: 'none',
        fontWeight: 'bold',
        marginRight: width * 0.02,
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        color: 'gray',
        fontWeight: 'bold',
        marginRight: width * 0.03,
    },
    price: {
        color: 'black',
        fontWeight: 'bold',
    },
    rating: {
        paddingLeft: width * 0.02,
        alignSelf: 'flex-start',
        paddingTop: height * 0.01,
    },
    delivery: {
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: width * 0.02,
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
    wishlistIcon: {
        position: 'absolute',
        top: height * 0.01,
        right: width * 0.02,
        zIndex: 1,
        backgroundColor: 'gray',
        padding: width * 0.02,
        borderRadius: width * 0.05,
    },
    wishlistIconActive: {
        backgroundColor: 'red', // Change background color to red for active wishlist items
    },
    flatListContentContainer: {
        paddingHorizontal: width * 0.02,
        paddingBottom: height * 0.02,
    },
});

export default NutsDryFruitsMain;


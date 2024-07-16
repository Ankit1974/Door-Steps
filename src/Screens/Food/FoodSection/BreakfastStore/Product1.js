import React, { useEffect, useState,} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { AirbnbRating } from 'react-native-ratings';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

const Product1 = () => {
    const [breakfastItems, setBreakfastItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const { addNotification } = useContext(NotificationContext);
    const userId = auth().currentUser.uid;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const breakfastRef = firestore().collection("Breakfast Store");
                const breakfastSnapshot = await breakfastRef.get();
                const breakfastItems = [];

                for (const doc of breakfastSnapshot.docs) {
                    const subcollectionRef = doc.ref.collection('Tata Aromatic Tea');
                    const subcollectionSnapshot = await subcollectionRef.get();

                    subcollectionSnapshot.forEach((subDoc) => {
                        breakfastItems.push({
                            id: subDoc.id,
                            text: subDoc.data().Name,
                            imageUrl: subDoc.data().Image,
                            price: subDoc.data().Price,
                            oldprice: subDoc.data().Oldprice,
                            Discount: subDoc.data().discount,
                            delivery: subDoc.data().Delivery,
                            quantity: subDoc.data().Quantity,
                            packet: subDoc.data().Packet,
                        });
                    });
                }

                setBreakfastItems(breakfastItems);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCartPress = async (product) => {
        try {
            console.log('Product being added to cart:', product);
    
            const validatedProduct = {
                id: product.id || '',
                text: product.text || '',
                imageUrl: product.imageUrl || '',
                price: product.price || 0,
                oldprice: product.oldprice || 0,
                Discount: product.Discount || 0,
                delivery: product.delivery || '',
                quantity: product.quantity || 0,
                rating: product.rating || 0
            };
    
            const cartRef = firestore().collection('users').doc(userId).collection('cart');
            const existingItem = await cartRef.where('id', '==', validatedProduct.id).get();
            if (existingItem.empty) {
                await cartRef.add(validatedProduct);
                const notification = `Product "${validatedProduct.text}" has been added to your cart.`;
                Toast.show({
                    type: 'success',
                    text1: 'Added to cart',
                    text2: notification,
                });
            } else {
                Toast.show({
                    type: 'info',
                    text1: 'Already in cart',
                    text2: `Product "${validatedProduct.text}" is already in your cart.`,
                });
            }
        } catch (error) {
            console.error("Error adding to cart: ", error);
        }
    };
    

    const renderProductItem = ({ item }) => {
        const productName = item.text;
        const boldPart = "Tata Tea Gold";
        const boldPartIndex = productName.indexOf(boldPart);

        return (
            <View style={styles.productWrapper}>
                <View>
                    <View style={styles.productContainer}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.productImage}
                            onError={() => console.log("Image failed to load")} />
                    </View>

                    {/* Separator Line */}
                    <View style={styles.separator} />

                    <Text style={styles.productText} numberOfLines={2} ellipsizeMode="tail">
                        {boldPartIndex >= 0 ? (
                            <>
                                <Text>{productName.substring(0, boldPartIndex)}</Text>
                                <Text style={styles.boldText}>{boldPart}</Text>
                                <Text>{productName.substring(boldPartIndex + boldPart.length)}</Text>
                            </>
                        ) : (
                            productName
                        )}
                    </Text>

                    <View style={styles.rating}>
                        <AirbnbRating
                            count={5}
                            reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
                            defaultRating={4}
                            size={15}
                            showRating={false}
                            isDisabled={true}
                            selectedColor="green" />
                    </View>

                    <View style={styles.priceContainer}>
                        {/* Hot Deal Tag */}
                        <View style={styles.hotDealTag}>
                            <Text style={styles.hotDealText}>Hot Deal</Text>
                        </View>
                        <Text style={[styles.discount, styles.arrow]}>{'\u25BE'}</Text>
                        <Text style={styles.discount}>{item.Discount}%</Text>
                        <Text style={styles.oldPrice}>{item.oldprice}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                    </View>

                    <Text style={styles.delivery}>
                        <Text style={styles.deliveryText}>Free delivery by</Text> {item.delivery}
                    </Text>

                    <Text style={styles.quantity}>
                        <Text style={styles.quantityLabel}>Quantity:</Text> {item.quantity}
                    </Text>
                </View>
            </View>
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
                data={breakfastItems}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.flatListContentContainer}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cartButton} onPress={() => handleCartPress(breakfastItems[0])}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </>
    );
};

const styles = StyleSheet.create({
    productWrapper: {
        flex: 1,
        paddingHorizontal: width * 0.01,
        paddingVertical: height * 0.01,
    },
    productContainer: {
        width: '100%',
        height: height * 0.67,
    },
    productImage: {
        marginTop: height * 0.02,
        width: '100%',
        height: '86%',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: 'gray',
        marginTop: height * 0.01,
    },
    productText: {
        fontSize: width * 0.04,
        color: 'black',
        paddingTop: height * 0.01,
        paddingHorizontal: width * 0.02,
        textAlign: 'left',
    },
    boldText: {
        fontWeight: 'bold',
        color: 'black',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: width * 0.04,
        marginTop: height * 0.05,
    },
    arrow: {
        fontSize: width * 0.1,
        fontWeight: 'bold',
        color: 'green',
        marginRight: width * 0.01,
    },
    discount: {
        color: 'green',
        textDecorationLine: 'none',
        fontWeight: 'bold',
        marginRight: width * 0.02,
        fontSize: width * 0.05,
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        color: 'gray',
        fontWeight: 'bold',
        marginRight: width * 0.03,
        fontSize: width * 0.05,
    },
    price: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: width * 0.05,
    },
    rating: {
        paddingLeft: width * 0.01,
        alignSelf: 'flex-start',
        paddingTop: height * 0.03,
    },
    delivery: {
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: width * 0.02,
        marginTop: height * 0.01,
    },
    deliveryText: {
        color: 'gray',
        fontWeight: 'bold',
    },
    quantity: {
        color: 'blue',
        paddingLeft: width * 0.02,
        marginTop: height * 0.03,
    },
    quantityLabel: {
        color: 'black',
        fontWeight: 'bold',
    },
    hotDealTag: {
        position: 'absolute',
        top: -height * 0.02,
        left: width * 0.02,
        backgroundColor: 'green',
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.005,
        borderRadius: 5,
    },
    hotDealText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: width * 0.03,
    },
    buttonContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cartButton: {
        backgroundColor: 'white',
        paddingVertical: height * 0.015,
        borderRadius: 5,
        flex: 1,
        marginRight: width * 0.02,
    },
    buyButton: {
        backgroundColor: '#FEC601',
        paddingVertical: height * 0.019,
        borderRadius: 0,
        flex: 1,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: width * 0.04,
        textAlign: 'center',
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
        paddingHorizontal: width * 0.02,
        paddingBottom: height * 0.09,
    },
});

export default Product1;

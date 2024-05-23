import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AccountMain = () => {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            {/* Account Holder Name */}
            <Text style={{ fontSize: 24, color: 'black', marginTop: 20, marginLeft: 20 }}>
                Hay!! Ankit Raj
            </Text>

            {/* Order and Wishlist Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Feather name="box" color={'red'} size={25} />
                <TouchableOpacity
                    onPress={() => {
                        // handle Order button click
                    }}
                    style={{ borderRadius: 8, width: 124, backgroundColor: '#9BF3F0', alignItems: 'center', justifyContent: 'center', marginLeft: 10 , height:40 }}
                >
                    <Text style={{ color: 'black' }}>ORDERS</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Feather name="heart" color={'blue'} size={25} />
                <TouchableOpacity
                    onPress={() => {
                        // handle Order button click
                    }}
                    style={{ borderRadius: 8, width: 124, backgroundColor: '#9BF3F0', alignItems: 'center', justifyContent: 'center', marginLeft: 10 , height:40 }}
                >
                    <Text style={{ color: 'black' }}>WISHLIST</Text>
                </TouchableOpacity>
            </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Feather name="gift" color={'#4A0D67'} size={25} />
                <TouchableOpacity
                    onPress={() => {
                        // handle Order button click
                    }}
                    style={{ borderRadius: 8, width: 124, backgroundColor: '#9BF3F0', alignItems: 'center', justifyContent: 'center', marginLeft: 10 , height:40 }}
                >
                    <Text style={{ color: 'black' }}>COUPONS</Text>
                </TouchableOpacity>
            </View>
                
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome5 name="headset" color={'#FF7F11'} size={25} />
                <TouchableOpacity
                    onPress={() => {
                        // handle Order button click
                    }}
                    style={{ borderRadius: 8, width: 124, backgroundColor: '#9BF3F0', alignItems: 'center', justifyContent: 'center', marginLeft: 10 , height:40 }}
                >
                    <Text style={{ color: 'black' }}>HELP</Text>
                </TouchableOpacity>
            </View> 
            </View>
              
            <Text style={{ fontSize: 24, color: 'black', marginTop: 20 }}>
                Credit Option
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:25}}>
            <FontAwesome name="bank" color={'#FF7F11'} size={25} style={{ marginRight: 40 }} />
            <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Personal Loan</Text>
            <Text style={{ fontSize: 14 }}>Instant Loan up to 5 lakh</Text>
            </View>
            </View> 

            <Text style={{ fontSize: 24, color: 'black', marginTop: 20}}>
                Credit Score
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:25}}>
            <MaterialCommunityIcons name="credit-card-check-outline" color={'#FF3F00'} size={29} style={{ marginRight: 40 }} />
            <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Check my credit score</Text>
            <Text style={{ fontSize: 14 }}>Free score check Personalised loan offers</Text>
            </View>
            </View> 

            <Text style={{ fontSize: 24, color: 'black', marginTop: 20}}>
                Account Setting
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' , marginTop: 10}}>
                <Entypo name="star-outlined" color={'#54C6EB'} size={35} />
                <TouchableOpacity
                    onPress={() => {
                        // handle Order button click
                    }}
                    style={{ borderRadius: 8, width: 320, justifyContent: 'center', marginLeft: 40 , height:40 }}
                >   
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black'  , fontSize:18}}>Flipkart Plus</Text>
                    <Text style={{ color: 'black', fontSize: 24, marginLeft: 160 }}>&gt;</Text>
                    </View>
                </TouchableOpacity>
            </View> 

            <View style={{ flexDirection: 'row', alignItems: 'center' , marginTop: 10}}>
                <AntDesign name="user" color={'#8C001A'} size={30} />
                <TouchableOpacity
                    onPress={() => {
                        // handle Order button click
                    }}
                    style={{ borderRadius: 8, width: 320, justifyContent: 'center', marginLeft: 44 , height:40 }}
                >   
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black'  , fontSize:18}}>Edit Profile</Text>
                    <Text style={{ color: 'black', fontSize: 24, marginLeft: 175 }}>&gt;</Text>
                    </View>
                </TouchableOpacity>
            </View> 
            
            <View style={{ flexDirection: 'row', alignItems: 'center' , marginTop: 10}}>
                <AntDesign name="wallet" color={'#D72638'} size={25} />
                <TouchableOpacity
                    onPress={() => {
                        // handle Order button click
                    }}
                    style={{ borderRadius: 8, width: 320, justifyContent: 'center', marginLeft: 48 , height:40 }}
                >   
                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black'  , fontSize:18}}>Saved Card Wallet</Text>
                    <Text style={{ color: 'black', fontSize: 24, marginLeft: 117 }}>&gt;</Text>
                    </View>
                </TouchableOpacity>
            </View> 

            <View style={{ flexDirection: 'row', alignItems: 'center' , marginTop: 10}}>
                <Entypo name="language" color={'#FF3864'} size={25} />
                <TouchableOpacity
                    onPress={() => {
                        // handle Order button click
                    }}
                    style={{ borderRadius: 8, width: 320, justifyContent: 'center', marginLeft: 47 , height:40 }}
                >   
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black'  , fontSize:18}}>Select Language</Text>
                    <Text style={{ color: 'black', fontSize: 24, marginLeft: 130 }}>&gt;</Text>
                    </View>
                </TouchableOpacity>
            </View> 

            <View style={{ flexDirection: 'row', alignItems: 'center' , marginTop: 10}}>
                <Entypo name="location-pin" color={'#261447'} size={32} />
                <TouchableOpacity
                    onPress={() => {
                        // handle Order button click
                    }}
                    style={{ borderRadius: 8, width: 320, justifyContent: 'center', marginLeft: 40 , height:40 }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 18 }}>Saved Adresses</Text>
                        <Text style={{ color: 'black', fontSize: 24, marginLeft: 135 }}>&gt;</Text>
                    </View>
                </TouchableOpacity>
            </View> 

            <View style={{ flexDirection: 'row', alignItems: 'center' , marginTop: 10}}>
                <Ionicons name="notifications-sharp" color={'#E952DE'} size={25} />
                <TouchableOpacity
                    onPress={() => {
                        // handle Order button click
                    }}
                    style={{ borderRadius: 8, width: 320, justifyContent: 'center', marginLeft: 46 , height:40 }}
                >     
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black'  , fontSize:18}}>Notification Setting</Text>
                    <Text style={{ color: 'black', fontSize: 24, marginLeft: 108 }}>&gt;</Text>
                    </View>
                </TouchableOpacity>
            </View> 

            </View>

           
    );
};

export default AccountMain;

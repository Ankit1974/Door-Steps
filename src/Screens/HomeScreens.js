import React, {} from 'react';
import { View, ScrollView, TouchableOpacity , TextInput, StyleSheet, Text, Image } from 'react-native';
import ImageAdapter from '../../Common/HelperFile/ImageAdapter';
import Home from '../../Common/HelperFile/Home';
import HomeTopSection from '../../Common/HelperFile/HomeTopSection';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


const HomeScreens = () => {

  const navigation = useNavigation(); // Initialize useNavigation hook

  const handleCategoriesPress = () => {
    
      navigation.navigate('MainCategories'); // Navigate to MainCategories screen
      
  };

  const handleCategoriesPress2 = () => {
    navigation.navigate('AccountMain'); // Navigate to Account Screen
     
  };

  const handleCategoriesPress3 = () => {
    navigation.navigate('NotificationScreen'); // Navigate to Account Screen
     
  };
    
  return (
    <><ScrollView>
          <View style={Styles.container}> 
          <View style={Styles.header}>
      <TouchableOpacity style={Styles.button}> 
        <Text style={Styles.buttonText}>Doore Step</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.button}>
        <Text style={Styles.buttonText}>Grocery</Text>
      </TouchableOpacity>
    </View>
        <View  style={Styles.inputContainer}>
        <Icon name="search" size={18} color="#666" />
              <TextInput
                  style={Styles.input}
                  placeholder="Search" />
                    <View style={Styles.iconContainer}>
          <Icon name="mic" size={20} color="#666" style={Styles.icon} />
          <Icon name="camera" size={20} color="#666" style={Styles.icon}/>
        </View>
                  </View>

              <View style={Styles.imageSlider}>
                  <ImageAdapter />
              </View>

              <Home navigation={navigation}/>

              <View style={Styles.topSelectionContainer}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>Top Selection</Text>
                  <HomeTopSection />
              </View>

              <View>

                  <Image
                      source={{ uri: 'add2' }}
                      style={{ width: 420, height: 200 , marginBottom:40}} // Set width and height as needed
                  />

              </View>

          </View>

      </ScrollView>
      <View style={Styles.bottomNavigation}>
                <TouchableOpacity style={{ width: '18%', height: 70, justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="home" color={'blue'} size={25} />
                    <Text style={Styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }} onPress={handleCategoriesPress3}>
                    < Ionicons name="notifications" color={'blue'} size={25} />
                    <Text style={Styles.navText}>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '23%', justifyContent: 'center', alignItems: 'center' }} onPress={handleCategoriesPress}>
                    <MaterialIcons name="category" color={'blue'} size={27} />
                    <Text style={Styles.navText} >Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '17%', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="shoppingcart" color={'blue'} size={25} />
                    <Text style={Styles.navText}>Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '17%', justifyContent: 'center', alignItems: 'center' }} onPress={handleCategoriesPress2}>
                    < EvilIcons name="user" color={'blue'} size={35} />
                    <Text style={Styles.navText}>Account</Text>
                </TouchableOpacity>
            </View>
        </>
  );
};

const Styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    marginVertical: 0,
    backgroundColor: '#eee',
    padding: 10,
    margin: 10,
    color:"black"
  },
  imageSlider: {
    marginVertical: 10,
    width: '100%',
    height: 200,
  },
  topSelectionContainer: {
    backgroundColor: 'pink',
    padding: 10,
    marginBottom: 0,
  },
  button: {
    backgroundColor: '#9c27b0',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    justifyContent: 'space-between',
    borderRadius: 2,
    height: 40,
    marginTop:10,
    paddingHorizontal: 12,
  },
  icon: {
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  bottomNavigation: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    position: 'absolute', 
    bottom: 0, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  navText:{
    fontSize: 10 , 
    color:"black"
  }
});

export default HomeScreens;

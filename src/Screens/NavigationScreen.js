import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Auth from "@react-native-firebase/auth";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import HomeScreens from "./HomeScreens";
import MainCategories from "./MainCategories";
import AccountMain from "./Account/AccountMain";
import LoginScreen from "./User/LoginScreen";
import SignUpScreen from "./User/SignUpScreen";
import FoodMain from "./Food/FoodMain";
import FurnitureMain from "./Furniture/FurnitureMain";
import ToysBabyMain from "./ToysBaby/ToysBabyMain";
import GroceryMain from "./Grocery/GroceryMain";
import HomeMain from "./Home/HomeMain";
import ElectronicsMain from "./Electronics/ElectronicsMain";
import PersonalCareMain from "./PersonalCare/PersonalCareMain";
import BikesMain from "./Bikes/BikesMain";
import MobileMain from "./Mobile/MobileMain";
import FashionsMain from "./Fashion/FashionMain";
import MedicinesMain from "./Medicines/MedicinesMain";
import AppliancesMain from "./Appliances/AppliancesMain";
import TravelMain from "./Travel/TravelMain";
import SportsHubMain from "./Sports/SportsHub";
import BreakfastMain from "./Food/FoodSection/BreakfastStore/BreakfastMain";
import WishlistScreen from "./Account/Wishlist/WishlistScreen";
import NutsDryFruitsMain from "./Food/FoodSection/NutsDryFruitsStore/NutsDryFruitsMain";
import CookingEssentialsMain from "./Food/FoodSection/CookingEssentialsStore/CookingEssentialsMain";
import ChocolatesMain from "./Food/FoodSection/ChocolatesStore/ChocolatesMain";
import SnackMain from "./Food/FoodSection/SnackStore/SnackMain";
import SafetySecurityMain from "./Food/AutoSection/Safety/SafetySecurityMain";
import HelmetMain from "./Food/AutoSection/Helmet/HelmetMain";
import TyresMain from "./Food/AutoSection/Tyres/TyresMain";
import NotificationScreen from "./Notification/NotificationScreen";
import Product1 from "./Food/FoodSection/BreakfastStore/Product1";
import { NotificationProvider } from "./Notification/NotificationContext";
import CartScreen from "./Cart/CartScreen";
import PremiumMain from "./Food/Healthcare/Premium/PremiumMain";
import VitaminMain from "./Food/Healthcare/Vitamin/VitaminMain";
import Medicines1Main from "./Food/Healthcare/Medicines/MedicinesMain";
import AyurvedicMain from "./Food/Healthcare/Ayurvedic/AyurvedicMain";
import NutritionMain from "./Food/Healthcare/Nutrition/NutritionMain";
import ProteinMain from "./Food/Healthcare/Protein/ProteinMain";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for Authentication Screens
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

// Bottom Tab Navigator for Main Screens
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconComponent;
        switch (route.name) {
          case "Home":
            iconComponent = <AntDesign name="home" size={size} color={color} />;
            break;
          case "Categories":
            iconComponent = <MaterialIcons name="category" size={size} color={color} />;
            break;
          case "Notifications":
            iconComponent = <Ionicons name="notifications" size={size} color={color} />;
            break;
          case "Cart":
            iconComponent = <AntDesign name="shoppingcart" size={size} color={color} />;
            break;
          case "Account":
            iconComponent = <EvilIcons name="user" size={size + 5} color={color} />; // Increased size by 5 units
            break;
          default:
            iconComponent = null;
        }
        return iconComponent;
      },
      tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarStyle: {
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingBottom: 5,
      },
      tabBarItemStyle: ({ route }) => {
        if (route.name === "Notifications") {
          return { marginHorizontal: 20 }; // Increase horizontal margin for Notifications tab
        }
        return {};
      },
      headerShown: false,
    })}
    tabBarOptions={{
      activeTintColor: "blue",
      inactiveTintColor: "black",
    }}
  >
    <Tab.Screen name="Home" component={HomeScreens} />
    <Tab.Screen name="Categories" component={MainCategories} />
    <Tab.Screen name="Notifications" component={NotificationScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Account" component={AccountMain} />
  </Tab.Navigator>
);

const NavigationScreen = () => {
  const [isUserLogin, setIsUserLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = Auth().onAuthStateChanged(user => {
      setIsUserLogin(user !== null);
    });

    return unsubscribe; // Clean up subscription on unmount
  }, []);

  return (
    <NotificationProvider>
      <NavigationContainer>
        {isUserLogin ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            {/* Ensure each screen below has a unique name */}
            <Stack.Screen name="Food & more" component={FoodMain} />
            <Stack.Screen name="Furniture" component={FurnitureMain} />
            <Stack.Screen name="Toys & Baby" component={ToysBabyMain} />
            <Stack.Screen name="Grocery" component={GroceryMain} />
            <Stack.Screen name="Homes" component={HomeMain} />
            <Stack.Screen name="Electronics" component={ElectronicsMain} />
            <Stack.Screen name="Personal & Care" component={PersonalCareMain} />
            <Stack.Screen name="Two & Wheelers" component={BikesMain} />
            <Stack.Screen name="Mobile" component={MobileMain} />
            <Stack.Screen name="Fashion" component={FashionsMain} />
            <Stack.Screen name="Medicines" component={MedicinesMain} />
            <Stack.Screen name="Appliances" component={AppliancesMain} />
            <Stack.Screen name="Travel" component={TravelMain} />
            <Stack.Screen name="Sports & Hub" component={SportsHubMain} />
            <Stack.Screen name="Breackfast & Store" component={BreakfastMain} />
            <Stack.Screen name="Wishlist" component={WishlistScreen} />
            <Stack.Screen name="Nuts & Dry Fruits" component={NutsDryFruitsMain} />
            <Stack.Screen name="Cooking & Essentials" component={CookingEssentialsMain} />
            <Stack.Screen name="chocolates" component={ChocolatesMain} />
            <Stack.Screen name="Snack Cornor" component={SnackMain} />
            <Stack.Screen name="Safety & Security" component={SafetySecurityMain} />
            <Stack.Screen name="Helmet & Riding Gears" component={HelmetMain} />
            <Stack.Screen name="Tyres" component={TyresMain} />
            <Stack.Screen name="Premium " component={PremiumMain} />
            <Stack.Screen name="Vitamin & Supplements " component={VitaminMain} />
            <Stack.Screen name="Medicines & Supplies" component={Medicines1Main} />
            <Stack.Screen name="Ayurvedic & Supplements" component={AyurvedicMain} />
            <Stack.Screen name="Nutrition & Drinks" component={NutritionMain} />
            <Stack.Screen name="Protein & Supplements" component={ProteinMain} />
            <Stack.Screen name="Product1" component={Product1} />
            {/* Add more screens here as needed */}
          </Stack.Navigator>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </NotificationProvider>
  );
};

export default NavigationScreen;

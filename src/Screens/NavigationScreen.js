import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreens from "./HomeScreens";
import MainCategories from "./MainCategories";
import AccountMain from "./Account/AccountMain";
import NotificationScreen from "./NotificationScreen";
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

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="home"
                    component={HomeScreens}
                    options={{ headerShown: false }} 
                />
                <Stack.Screen
                    name="AccountMain"
                    component={AccountMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MainCategories"
                    component={MainCategories}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="NotificationScreen"
                    component={NotificationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Food & more"
                    component={FoodMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Toys & Baby"
                    component={ToysBabyMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Furniture"
                    component={FurnitureMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Grocery"
                    component={GroceryMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Homes"
                    component={HomeMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Electronics"
                    component={ElectronicsMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Personal Care"
                    component={PersonalCareMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Two Wheelers"
                    component={BikesMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Mobile"
                    component={MobileMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Fashion"
                    component={FashionsMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Medicines"
                    component={MedicinesMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Appliances"
                    component={AppliancesMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Travel"
                    component={TravelMain}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Sports Hub"
                    component={SportsHubMain}
                    options={{ headerShown: false }}
                />
                
                 
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default NavigationScreen;

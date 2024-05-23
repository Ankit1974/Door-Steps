import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigationScreen from "./src/Screens/NavigationScreen";
import AccountMain from "./src/Screens/Account/AccountMain";
import AppliancesMain from "./src/Screens/Appliances/AppliancesMain";
import SignUpScreen from "./src/Screens/User/SignUpScreen";
import HomeMain from "./src/Screens/Home/HomeMain";
import MobileMain from "./src/Screens/Mobile/MobileMain";
import ElectronicsMain from "./src/Screens/Electronics/ElectronicsMain";
import FurnitureMain from "./src/Screens/Furniture/FurnitureMain";
import PersonalCareMain from "./src/Screens/PersonalCare/PersonalCareMain";
import ToysBabyMain from "./src/Screens/ToysBaby/ToysBabyMain";
import TravelMain from "./src/Screens/Travel/TravelMain";
import FoodMain from "./src/Screens/Food/FoodMain";
import MedicinesMain from "./src/Screens/Medicines/MedicinesMain";
import BikesMain from "./src/Screens/Bikes/BikesMain";
import MainCategories from "./src/Screens/MainCategories";
import Breakfast from "./src/Screens/Food/BreakfastStore/BreakfastMain";
import BreakfastMain from "./src/Screens/Food/BreakfastStore/BreakfastMain";

const App = () => {
  return (
    //<NavigationScreen />
   //<MobileMain navigation={undefined}/>
   //<PersonalCareMain navigation={undefined}/>
   // <MainCategories navigation={undefined}/>
   <BreakfastMain navigation={undefined}/>
  );
}

export default App;

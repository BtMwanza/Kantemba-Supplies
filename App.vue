<template>
  <root>
    <app-navigator></app-navigator>
  </root>
</template>

<script>
import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
} from "vue-native-router";
import { Root } from "native-base";
import {
  Home,
  UserProfile,
  SignIn,
  SignUp,
  SupplierProfile,
  Quotation,
  Product,
  Suppliers,
  Loading,
  Cart,
  Checkout,
} from "./src/screens";
import Vue from "vue-native-core";
import Ionicons from "react-native-vector-icons/Ionicons";
import { VueNativeBase } from "native-base";
import Vuelidate from "vuelidate";
import firebase from "firebase";

// registering all native-base components to the global scope of the Vue
Vue.use(VueNativeBase);
Vue.use(Vuelidate);
Vue.use(firebase);

// Bottom Tabs
const AppTabs = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
    },
    Profile: {
      screen: UserProfile,
    },
    Cart: {
      screen: Cart,
    },
    Checkout: {
      screen: Checkout,
    },
    Suppliers: {
      screen: Suppliers,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
        } else if (routeName === "Profile") {
          iconName = `ios-person`;
        } else if (routeName === "Cart") {
          iconName = `ios-cart`;
        } else if (routeName === "Checkout") {
          iconName = `ios-checkmark-circle-outline`;
        } else if (routeName === "Suppliers") {
          iconName = `ios-people`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "#1b4f72",
      inactiveTintColor: "#85c1e9",
    },
  }
);

const AppContainer = createStackNavigator(
  {
    Tabs: AppTabs,
    ProductDetails: Product,
    Quotation: Quotation,
    SupplierProfile: SupplierProfile,
  },
  {
    initialRouteName: "Tabs",
    headerMode: "none",
  }
);

const AuthStack = createStackNavigator(
  {
    Login: SignIn,
    Register: SignUp,
  },
  {
    headerMode: "none",
  }
);

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      //  Loading: Loading,
      Auth: AuthStack,
      App: AppContainer,
    },
    {
      initialRouteName: "App",
    }
  )
);

export default {
  components: { Root, AppNavigator },
};
</script>
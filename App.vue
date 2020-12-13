<template>
  <root>
    <app-navigator></app-navigator>
  </root>
</template>

<script>
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
} from "./src/screens";
import Vue from "vue-native-core";
import Ionicons from "react-native-vector-icons/Ionicons";
import { VueNativeBase } from "native-base";
import Vuelidate from "vuelidate";

// registering all native-base components to the global scope of the Vue
Vue.use(VueNativeBase);
Vue.use(Vuelidate);

// Bottom Tabs
const AppTabs = createBottomTabNavigator({
  Home: {
    screen: Home,
  },
  Profile: {
    screen: UserProfile,
  },
  Suppliers: {
    screen: Suppliers,
  },
});

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
      Auth: AuthStack,
      App: AppContainer,
    },
    {
      initialRouteName: "Auth",
    }
  )
);

export default {
  components: { Root, AppNavigator },
};
</script>
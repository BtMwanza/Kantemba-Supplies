<template>
  <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
} from "vue-native-router";

import {
  Home,
  UserProfile,
  SignIn,
  SignUp,
  Loading,
  SupplierProfile,
  Quotation,
  Product,
} from "./src/screens";

// Bottom Tabs
const AppTabs = createBottomTabNavigator({
  Home: Home,
  Profile: UserProfile,
  Supplier: SupplierProfile,
  ProductDetails: Product,
  Quotation: Quotation,
});

const AppContainer = createStackNavigator({
  Tabs: AppTabs,
});

const AuthStack = createStackNavigator({
  Login: SignIn,
  Register: SignUp,
});

const AppNavigator = createAppContainer(
  createSwitchNavigator({
    // Loading: LoadingScreen,
    Auth: AuthStack,
    App: AppContainer,
  })
);

export default {
  components: { AppNavigator },
};
</script>
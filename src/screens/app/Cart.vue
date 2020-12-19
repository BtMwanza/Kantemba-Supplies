<template>
  <nb-container>
    <!-- Header -->
    <nb-header :style="{ backgroundColor: defaultColor }">
      <status-bar background-color="#1b4f72" bar-style="light-content" />
      <nb-left>
        <nb-button transparent :on-press="() => goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>

      <nb-body>
        <nb-title>My Cart</nb-title>
        <nb-title>Total: K{{ totalPrice }}</nb-title>
      </nb-body>

      <nb-right>
        <nb-button bordered info :onPress="() => checkout(this.totalPrice)">
          <nb-text :style="{ color: '#fff' }">Checkout</nb-text>
        </nb-button>
      </nb-right>
    </nb-header>

    <!-- Body -->
    <nb-content>
      <!-- Product 1 -->
      <nb-list v-for="(product, productID) in products" :key="productID">
        <nb-list-item avatar>
          <nb-left>
            <!--  Subtract button -->
            <button
              title="-"
              color="#1b4f72"
              :on-press="() => quantityHandler('less', product)"
            />

            <!-- Quantity -->
            <nb-text :style="{ paddingLeft: 6, paddingRight: 6 }">{{
              product.productQuantity
            }}</nb-text>

            <!-- Add button -->
            <button
              title="+"
              color="#1b4f72"
              :on-press="() => quantityHandler('more', product)"
            />
          </nb-left>

          <nb-body>
            <nb-text :numberOfLines="2" :style="{ height: 40 }">{{
              product.productName
            }}</nb-text>
          </nb-body>

          <nb-right>
            <touchable-opacity
              :style="{
                marginRight: 10,
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }"
              :on-press="() => handleDelete(product)"
            >
              <nb-icon
                name="trash"
                :style="{ fontSize: 20, color: defaultColor }"
              />
            </touchable-opacity>
          </nb-right>
        </nb-list-item>
      </nb-list>
      <!-- End Product 1 -->
    </nb-content>
  </nb-container>
</template>

<script>
import React from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "./../../store";

export default {
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },

  computed: {
    products() {
      return store.getters.storeCart;
    },

    totalPrice() {
      return store.getters.storeCart.reduce(
        (acc, el) => acc + el.unitPrice * el.productQuantity,
        0
      );
    },
  },

  data: function () {
    return {
      defaultColor: "#1b4f72",
    };
  },

  methods: {
    checkout: function (totalPrice) {
      this.navigation.navigate("Checkout");
    },
    quantityHandler: function (action, product) {
      // Increase or decrease quantity of product
      try {
        const newItems = [...this.products]; // clone the array
        let idx = newItems.indexOf(product);
        let currentQty = newItems[idx].productQuantity;

        if (action == "more") {
          newItems[idx].productQuantity = currentQty + 1;
        } else if (action == "less") {
          newItems[idx].productQuantity = currentQty > 1 ? currentQty - 1 : 1;
        }

        this.products = newItems; // set new state
      } catch (error) {
        alert(error);
      }
    },
    handleDelete: function (product) {
      try {
        let idx = this.products.indexOf(product);
        Alert.alert(
          "Are you sure you want to delete this item from your cart?",
          "",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => {
                store.dispatch("removeItem", idx);
              },
            },
          ],
          { cancelable: false }
        );
      } catch (error) {
        alert(error);
      }
    },
    goBack: function () {
      this.navigation.goBack();
    },
  },
};
</script>

<style>
</style>
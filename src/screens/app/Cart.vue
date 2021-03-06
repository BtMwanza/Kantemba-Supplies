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
        <nb-text note class="small-text">Total: K{{ totalPrice }}</nb-text>
      </nb-body>

      <nb-right>
        <nb-button bordered info :onPress="() => checkout(this.products)">
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
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";

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
      return store.getters.storeCart
        .reduce((acc, item) => {
          return acc + item.price;
        }, 0)
        .toFixed(2);
    },
  },

  data: function () {
    return {
      defaultColor: "#1b4f72",
    };
  },

  methods: {
    checkout: function (products) {
      this.navigation.navigate("Checkout");
    },
    quantityHandler: function (action, product) {
      // Increase or decrease quantity of product
      try {
        const newItems = [...this.products]; // clone the array
        let idx = this.products.indexOf(product);
        let currentQty = newItems[idx].productQuantity;
        let price = newItems[idx].price;
        let perQtyPrice = price / currentQty;

        if (action == "more") {
          newItems[idx].productQuantity = currentQty + 1;
          newItems[idx].price += perQtyPrice;
        } else if (action == "less") {
          newItems[idx].productQuantity = currentQty > 1 ? currentQty - 1 : 1;
          // Decrease current price using the initial price
          newItems[idx].price -= perQtyPrice;
        }

        this.products = newItems; // set new state
        console.log(this.products);
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
.small-text {
  font-size: 12px;
  color: whitesmoke;
}
</style>
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
        <nb-button bordered info :onPress="() => checkout(item)">
          <nb-text :style="{ color: '#fff' }">Checkout</nb-text>
        </nb-button>
      </nb-right>
    </nb-header>

    <!-- Body -->
    <nb-content>
      <!-- Product 1 -->
      <nb-list v-for="item in items" :key="item.id">
        <nb-list-item avatar>
          <nb-left>
            <!--  Subtract button -->
            <button
              title="-"
              color="#1b4f72"
              :on-press="() => quantityHandler('less', item)"
            />

            <!-- Quantity -->
            <nb-text :style="{ paddingLeft: 6, paddingRight: 6 }">{{
              item.qty
            }}</nb-text>

            <!-- Add button -->
            <button
              title="+"
              color="#1b4f72"
              :on-press="() => quantityHandler('more', item)"
            />
          </nb-left>

          <nb-body>
            <nb-text :numberOfLines="2" :style="{ height: 40 }">{{
              item.title
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
              :on-press="() => handleDelete(item)"
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

export default {
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  data: function () {
    return {
      defaultColor: "#1b4f72",
      // quantity: 1,
      totalPrice: 0,
      cartItems: [],
      items: [
        {
          id: 1,
          title: "accusamus beatae ",
          unitPrice: 100,
          qty: 1,
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952",
          checked: true,
        },
        {
          id: 2,
          title: "reprehenderit",
          unitPrice: 90,
          qty: 1,
          url: "https://via.placeholder.com/600/771796",
          thumbnailUrl: "https://via.placeholder.com/150/771796",
          checked: true,
        },
        {
          id: 3,
          title: "officia ",
          unitPrice: 200,
          qty: 1,
          url: "https://via.placeholder.com/600/24f355",
          thumbnailUrl: "https://via.placeholder.com/150/24f355",
          checked: true,
        },
        {
          id: 4,
          title: "culpa ",
          unitPrice: 50,
          qty: 1,
          url: "https://via.placeholder.com/600/d32776",
          thumbnailUrl: "https://via.placeholder.com/150/d32776",
          checked: true,
        },
      ],
    };
  },
  methods: {
    checkout: function () {
      alert("Checkout");
    },
    quantityHandler: function (action, item) {
      const newItems = [...this.items]; // clone the array
      let idx = newItems.indexOf(item);
      let currentQty = newItems[idx].qty;

      if (action == "more") {
        newItems[idx].qty = currentQty + 1;
      } else if (action == "less") {
        newItems[idx].qty = currentQty > 1 ? currentQty - 1 : 1;
      }

      this.items = newItems; // set new state
    },
    subtotalPrice: function () {
      const { cartItems } = this.items;
      if (cartItems) {
        return cartItems.reduce(
          (sum, item) =>
            sum + (item.checked == 1 ? item.qty * item.salePrice : 0),
          0
        );
      }
      return 0;
    },
    handleDelete: function (item) {
      let idx = this.items.indexOf(item);
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
              let updatedCart = this.items; /* Clone it first */
              updatedCart.splice(item[idx].id);
              this.setState(updatedCart); /* Update the state */
            },
          },
        ],
        { cancelable: false }
      );
    },
    goBack: function () {
      this.navigation.goBack();
    },
  },
};
</script>

<style>
</style>
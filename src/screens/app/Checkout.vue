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
        <nb-title>Checkout</nb-title>
      </nb-body>

      <nb-right>
        <nb-button bordered info :on-press="() => checkout()">
          <nb-text :style="{ color: '#fff' }">Proceed</nb-text>
        </nb-button>
      </nb-right>
    </nb-header>

    <!-- Body -->
    <!-- <nb-content> -->
    <nb-grid>
      <nb-content>
        <nb-card-item header class="card-center">
          <nb-text class="heading">Total: K{{ totalPrice }} </nb-text>
        </nb-card-item>
        <nb-card-item>
          <credit-card-input
            :v-model="cardData"
            allowScroll
            requiresName
            inputContainerStyle
          />
        </nb-card-item>
      </nb-content>
    </nb-grid>
  </nb-container>
</template>

<script>
import React from "react";
import { Alert } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import axios from "axios";
import store from "./../../store";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import moment from "moment";

export default {
  components: { CreditCardInput },
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
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
    addtionalInputsProps: {
      name: {
        defaultValue: "my name",
        maxLength: 40,
      },
    },
  },
  data: function () {
    return {
      defaultColor: "#1b4f72",
      response: "",
      paymentStatus: "",
      hasMadePayment: false,
      cardData: { valid: false },
      stylesObj: {
        cardItemImage: {
          resizeMode: "cover",
        },
      },
    };
  },
  methods: {
    checkout: function () {
      Alert.alert(
        "Payment",
        "Are you sure you want to proceed?",
        [
          {
            text: "No",
            onPress: () => alert("Payment Cancelled"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              this.recordReceipt();
              alert("Payment made");
              store.dispatch("CLEARCART");
              this.navigation.navigate("Home");
            },
          },
        ],
        { cancelable: false }
      );
    },
    makePayment: function () {
      alert("Payment Made");
    },
    goBack: function () {
      this.navigation.goBack();
    },
    recordReceipt: function () {
      try {
        const user = firebase.auth().currentUser;
        var uuid = uuidv4();
        const cartID = `${uuid}`;
        firebase
          .firestore()
          .collection("CART")
          .doc()
          .set({
            cartID: cartID,
            for: user.uid,
            productID: this.products.productID,
            cartRecord: this.products,
            totalPrice: this.totalPrice,
            date: moment().format("lll"),
          });
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style>
.card-item-image {
  flex: 1;
  height: 200;
  margin-top: -50px;
  margin-bottom: -10px;
}
.heading {
  font-size: 20px;
  color: black;
  margin-bottom: -20px;
  margin-top: -25px;
}
.card-center {
  align-items: center;
  justify-content: center;
}
</style>
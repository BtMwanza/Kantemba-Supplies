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
          <!-- <image
              :source="cardImage"
              class="card-item-image"
              :style="stylesObj.cardItemImage"
            /> -->
          <credit-card-input
            :onValueChange="(cardData) => this.cardData({ cardData })"
            allowScroll
            requiresName
            inputContainerStyle
          />
        </nb-card-item>

        <!-- <nb-form>
          <nb-item stackedLabel last>
            <nb-label>Cardholder Name</nb-label>
            <nb-input placeholder="Full Name" />
          </nb-item>
          <nb-item stackedLabel last>
            <nb-label>Card Number</nb-label>
            <nb-input placeholder="0000 0000 0000 0000" />
          </nb-item>

          <nb-row>
            <nb-col>
              <nb-item stackedLabel last :style="{ marginRight: 4 }">
                <nb-label>CVV Code</nb-label>
                <nb-input placeholder="XXX" />
              </nb-item>
            </nb-col>

            <nb-col>
              <nb-item stackedLabel last>
                <nb-label>Exp Date</nb-label>
                <nb-item>
                  <nb-input placeholder="Month" />
                </nb-item>

                <nb-item>
                  <nb-input placeholder="Year" />
                </nb-item>
              </nb-item>
            </nb-col>
          </nb-row>
        </nb-form> -->
      </nb-content>
    </nb-grid>
  </nb-container>
</template>

<script>
import React from "react";
import { Alert } from "react-native";
import cardImage from "./../../../assets/card.png";
import { CreditCardInput } from "react-native-credit-card-input";
import axios from "axios";

export default {
  components: { CreditCardInput },
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
      totalPrice: 100,
      response: "",
      paymentStatus: "",
      hasMadePayment: false,
      cardData: { valid: false },
      cardImage,
      stylesObj: {
        cardItemImage: {
          resizeMode: "cover",
        },
      },
    };
  },
  methods: {
    onCheckStatus: async function (paymentResponse) {
      this.paymentStatus = "Please wait while confirming your payment!";
      this.response = paymentResponse;

      let jsonResponse = JSON.parse(paymentResponse);
      // perform operation to check payment status

      try {
        const stripeResponse = await axios.post(
          "http://localhost:8000/payment",
          {
            email: "codergogoi@gmail.com",
            product: cartInfo,
            authToken: jsonResponse,
          }
        );

        if (stripeResponse) {
          const { paid } = stripeResponse.data;
          if (paid === true) {
            this.paymentStatus = "Payment Success";
          } else {
            this.paymentStatus = "Payment failed due to some issue";
          }
        } else {
          this.paymentStatus = " Payment failed due to some issue";
        }
      } catch (error) {
        console.log(error);
        this.paymentStatus = "Payment failed due to some issue";
      }
    },
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
          { text: "Yes", onPress: () => this.makePayment() },
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
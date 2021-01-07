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
        <nb-title>{{ date }}</nb-title>
      </nb-body>
    </nb-header>

    <!-- Body -->
    <nb-content>
      <!-- Product 1 -->
      <nb-card v-for="(record, cartID) in cart" :key="cartID">
        <nb-card-item bordered>
          <nb-left>
            <nb-body>
              <nb-text class="text">PURCHASE RECEIPT</nb-text>
              <!--               <nb-text note>April 20, 2018</nb-text> -->
            </nb-body>
          </nb-left>
        </nb-card-item>

        <!-- TransactionID -->
        <nb-card-item>
          <nb-left><nb-text class="small-text">TransationID</nb-text></nb-left>
          <nb-right
            ><nb-text class="small-text">{{ record.cartID }}</nb-text></nb-right
          >
        </nb-card-item>

        <!-- UserID -->
        <nb-card-item>
          <nb-left><nb-text class="small-text">UserID</nb-text></nb-left>
          <nb-right
            ><nb-text class="small-text">{{ record.userID }}</nb-text></nb-right
          >
        </nb-card-item>

        <!-- Date -->
        <nb-card-item>
          <nb-left><nb-text class="small-text">Date</nb-text></nb-left>
          <nb-right
            ><nb-text class="small-text">{{ record.date }}</nb-text></nb-right
          >
        </nb-card-item>

        <nb-card-item>
          <nb-text class="text small-text">
            ************************************************************
          </nb-text>
        </nb-card-item>

        <nb-card-item>
          <nb-left><nb-text class="small-text">ITEMID</nb-text></nb-left>
          <nb-body class="qty"
            ><nb-text class="small-text">QTY</nb-text></nb-body
          >
          <nb-body class="description"
            ><nb-text class="small-text">DESCRIPTION</nb-text></nb-body
          >
          <nb-right class="amount"
            ><nb-text class="small-text">AMOUNT</nb-text></nb-right
          >
        </nb-card-item>

        <!-- Items -->
        <nb-card-item v-for="item in record.cartRecord" :key="item.id">
          <nb-left>
            <nb-text note class="small-text" :numberOfLines="1">
              {{ item.productID }}
            </nb-text>
          </nb-left>

          <nb-body class="qty">
            <nb-text note class="small-text">
              {{ item.productQuantity }}
            </nb-text>
          </nb-body>

          <nb-body class="description">
            <nb-text note class="small-text">
              {{ item.productName }}
            </nb-text>
          </nb-body>

          <nb-right class="amount">
            <nb-text note class="small-text">
              {{ item.price }}
            </nb-text>
          </nb-right>
        </nb-card-item>

        <nb-card-item>
          <nb-text class="text small-text">
            ************************************************************
          </nb-text>
        </nb-card-item>

        <nb-card-item>
          <nb-left></nb-left>
          <nb-right>
            <nb-text class="small-text">
              TOTAL: K{{ record.totalPrice }}
            </nb-text>
          </nb-right>
        </nb-card-item>
      </nb-card>
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
import moment from "moment";

export default {
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },

  mounted: function () {
    setTimeout(() => {
      this.listenForRecords();
    }, 2000);
  },

  data: function () {
    return {
      defaultColor: "#1b4f72",
      cartID: this.navigation.getParam("cartID"),
      date: this.navigation.getParam("date"),
      cart: [],
    };
  },

  methods: {
    getHistory: function () {
      return firebase.firestore().collection("CART");
    },
    listenForRecords: function () {
      try {
        var user = firebase.auth().currentUser;
        this.getHistory()
          .get()
          .then((querySnapshot) => {
            const records = [];
            querySnapshot.forEach((doc) => {
              if (doc.data().cartID == this.cartID) {
                records.push({
                  recordID: doc.id,
                  cartID: doc.data().cartID,
                  cartRecord: doc.data().cartRecord,
                  userID: doc.data().for,
                  date: moment(doc.data().date).format("lll"),
                  totalPrice: doc.data().totalPrice,
                });
              }
            });
            this.cart = records;
            console.log(this.cart);
          });
      } catch (err) {
        alert(err);
      }
    },
    goBack: function () {
      this.navigation.goBack();
    },
  },
};
</script>

<style>
.text {
  text-align: center;
  margin: 10px;
}
.small-text {
  font-size: 11px;
}
.itemID {
  padding-right: 10px;
  margin-right: -80px;
}
.description {
  margin-right: 5px;
  margin-left: -10px;
}
.qty {
  padding-right: 10px;
  margin-right: -80px;
  margin-left: 10px;
}
.amount {
  margin-left: -70px;
}
</style>
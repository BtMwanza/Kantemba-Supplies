<template>
  <nb-container>
    <!-- Header -->
    <nb-header :style="{ backgroundColor: defaultColor }">
      <status-bar background-color="#1b4f72" bar-style="light-content" />
      <nb-body>
        <nb-title>Home</nb-title>
      </nb-body>
    </nb-header>

    <!-- Body -->
    <nb-content>
      <nb-card>
        <nb-card-item class="text">
          <nb-text>Please Select a supplier below</nb-text>
        </nb-card-item>
      </nb-card>

      <nb-list v-for="(supplier, uid) in listOfSuppliers" :key="uid">
        <nb-list-item avatar :on-press="() => viewSupplierProducts(supplier)">
          <nb-body>
            <nb-text>{{ supplier.supplierName }}</nb-text>
          </nb-body>
          <nb-right>
            <nb-icon name="arrow-forward" />
          </nb-right>
        </nb-list-item>
      </nb-list>
    </nb-content>
  </nb-container>
</template>

<script>
import React from "react";
import { Text } from "react-native";
import firebase from "firebase";

export default {
  mounted: function () {
    this.listenForSuppliers();
  },
  data() {
    return {
      defaultColor: "#1b4f72",
      listOfSuppliers: [],
      stylesObj: {
        cardItemImage: {
          resizeMode: "cover",
        },
      },
    };
  },
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  methods: {
    viewSupplierProducts: function (supplier) {
      const supplierID = supplier.uid;
      const supplierName = supplier.supplierName;
      this.navigation.navigate("ProductList", {
        supplierID: supplierID,
        supplierName: supplierName,
      });
    },
    addToCart: function () {
      alert("Added to Cart");
    },
    getSupplierList: function () {
      return firebase.firestore().collection("SUPPLIERS");
    },
    listenForSuppliers: function () {
      try {
        //  var user = firebase.auth().currentUser;
        this.getSupplierList().onSnapshot((querySnapshot) => {
          const suppliers = [];
          querySnapshot.forEach((doc) => {
            suppliers.push({
              uid: doc.data().uid,
              supplierName: doc.data().name,
            });
          });
          this.listOfSuppliers = suppliers;
        });
      } catch (err) {
        alert(err);
      }
    },
  },
};
</script>

<style>
.container {
  align-items: center;
  justify-content: center;
  flex: 1;
}
.heading {
  font-size: 30px;
  font-weight: bold;
  color: black;
  margin: 20px;
}
.text {
  text-align: center;
  margin: 1px;
  align-items: center;
  justify-content: center;
}
.text-title {
  text-align: center;
  margin: 1px;
}
.card-item-image {
  flex: 1;
  height: 200;
}
</style>
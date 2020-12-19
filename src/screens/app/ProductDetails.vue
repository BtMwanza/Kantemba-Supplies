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
        <nb-title>{{ navigation.getParam("productName") }}</nb-title>
      </nb-body>
      <nb-right> </nb-right>
    </nb-header>

    <!-- Body -->
    <nb-grid>
      <nb-col>
        <nb-content>
          <nb-card
            :style="{
              borderColor: defaultColor,
              borderWidth: 4,
              padding: 2,
              marginTop: -3,
            }"
          >
            <nb-card-item cardBody>
              <nb-body>
                <image
                  :source="{ uri: navigation.getParam('productImage') }"
                  class="card-item-image"
                  :style="stylesObj.cardItemImage"
                />

                <nb-text>{{
                  navigation.getParam("productDescription")
                }}</nb-text>
              </nb-body>
            </nb-card-item>

            <nb-card-item :style="{ backgroundColor: defaultColor }">
              <nb-left>
                <nb-text :style="{ fontSize: 20, color: '#fff', marginLeft: 0 }"
                  >Unit price: {{ navigation.getParam("unitPrice") }}</nb-text
                >
              </nb-left>
            </nb-card-item>
          </nb-card>

          <nb-form
            :style="{
              padding: 2,
            }"
          >
            <nb-textarea
              :style="{
                borderColor: defaultColor,
                borderWidth: 4,
                marginBottom: 2,
                marginTop: -3,
              }"
              :rowSpan="5"
              bordered
              v-model="message"
              placeholder="Type your enquiry here..."
            />
          </nb-form>
          <nb-button
            bordered
            info
            :style="{ margin: 2 }"
            :on-press="() => sendEnquiry()"
          >
            <nb-text>Send</nb-text>
          </nb-button>
        </nb-content>
      </nb-col>
    </nb-grid>
  </nb-container>
</template>

<script>
import React from "react";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "./../../store";

export default {
  mounted() {},
  data() {
    return {
      defaultColor: "#1b4f72",
      message: "",
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
    goBack: function () {
      this.navigation.goBack();
    },
    sendEnquiry: function () {
      const user = firebase.auth().currentUser;
      try {
        firebase
          .firestore()
          .collection("ENQUIRIES")
          .doc()
          .set({
            user: user.uid,
            productID: this.navigation.getParam("productID"),
            to: this.navigation.getParam("supplierID"),
            message: this.message,
          });
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style >
.card-item-image {
  flex: 1;
  height: 300;
  width: 100%;
}
.text {
  text-align: center;
  margin: 0px;
}
</style>
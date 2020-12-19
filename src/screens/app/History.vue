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
        <nb-title>History</nb-title>
      </nb-body>
    </nb-header>

    <!-- Body -->
    <nb-content>
      <!-- History -->
      <nb-list v-for="(record, recordID) in records" :key="recordID">
        <nb-list-item avatar>
          <nb-body>
            <nb-text
              :style="{ height: 40 }"
              :on-press="() => viewHistory(record)"
              >{{ record.date }}</nb-text
            >
          </nb-body>

          <!--     <nb-right>
            <touchable-opacity
              :style="{
                marginRight: 10,
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }"
              :on-press="() => handleDelete(record)"
            >
              <nb-icon
                name="trash"
                :style="{ fontSize: 20, color: defaultColor }"
              />
            </touchable-opacity>
          </nb-right> -->
        </nb-list-item>
      </nb-list>
      <!-- End History -->
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
    }, 1000);
  },

  data: function () {
    return {
      defaultColor: "#1b4f72",
      records: [],
    };
  },

  methods: {
    getHistory: function () {
      return firebase.firestore().collection("CART");
    },
    listenForRecords: function () {
      try {
        var user = firebase.auth().currentUser;
        this.getHistory().onSnapshot((querySnapshot) => {
          const records = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().for == user.uid) {
              records.push({
                recordID: doc.id,
                cartID: doc.data().cartID,
                cartRecord: doc.data().cartRecord,
                uid: doc.data().for,
                date: moment(doc.data().date).format("lll"),
              });
            }
          });
          this.records = records;
          console.log(this.records);
        });
      } catch (err) {
        alert(err);
      }
    },

    viewHistory: function (record) {
      this.navigation.navigate("ViewHistory", {
        cartID: record.cartID,
        date: record.date,
      });
    },
    /* handleDelete: function (record) {
      try {
        let idx = this.records.indexOf(record);
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
                
              },
            },
          ],
          { cancelable: false }
        );
      } catch (error) {
        alert(error);
      }
    }, */
    goBack: function () {
      this.navigation.goBack();
    },
  },
};
</script>

<style>
</style>
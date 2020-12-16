<template>
  <nb-container>
    <nb-header :style="{ backgroundColor: defaultColor }">
      <status-bar background-color="#1b4f72" bar-style="light-content" />
      <nb-left>
        <nb-button transparent :on-press="() => goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Suppliers</nb-title>
      </nb-body>
    </nb-header>

    <nb-content>
      <nb-list class="list" v-for="supplier in suppliers" :key="supplier.id">
        <touchable-opacity :on-press="() => viewSupplierProfile(supplier)">
          <nb-text class="entry">{{ supplier.title }}</nb-text>
        </touchable-opacity>
      </nb-list>
    </nb-content>
  </nb-container>
</template>

<script>
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data: function () {
    return {
      defaultColor: "#1b4f72",
      suppliers: [
        {
          id: 1,
          title: "Aspire Wholesellers",
          phoneNumber: "0977856328",
          email: "aspire@aspire.co.zm",
          address1: "546 Accacia Rd, Tula",
          activityStatus: "Active",
          registrationID: "66235199",
          website: "https://www.aspirewholesales.co.zm",
          city: "Lusaka",
        },
        {
          id: 2,
          title: "Providers Ltd",
          phoneNumber: "0967858585",
          email: "providers@gmail.com",
          address1: "756 BlackandWhite St, Libala",
          address1: "554 Accacia Rd, Tula",
          activityStatus: "Active",
          registrationID: "12456787",
          website: "https://www.providersltd.com",
          city: "Lusaka",
        },
        {
          id: 3,
          title: "Zambika",
          phoneNumber: "0966554433",
          email: "zambika@gmail.com",
          address1: "452 KM, Chilenje",
          activityStatus: "Active",
          registrationID: "99552132",
          website: "",
          city: "Lusaka",
        },
        {
          id: 4,
          title: "Midway Traders Ltd",
          phoneNumber: "09789546323",
          email: "",
          address1: "976 Inswa St, Chongwe",
          activityStatus: "Active",
          registrationID: "05839312",
          website: "",
          city: "Lusaka",
        },
        {
          id: 5,
          title: "Flippers Ltd",
          phoneNumber: "0977434321",
          email: "",
          address1: "123 bot Rd, Kamwala",
          activityStatus: "Inactive",
          registrationID: "97543787",
          website: "",
          city: "Lusaka",
        },
      ],
    };
  },
  methods: {
    viewSupplierProfile: function (supplier) {
      const address1 = supplier.address1;
      const address2 = supplier.address2;
      const phoneNumber = supplier.phoneNumber;
      const activityStatus = supplier.activityStatus;
      const email = supplier.email;
      const title = supplier.title;
      const city = supplier.city;
      const website = supplier.website;
      const registrationID = supplier.registrationID;

      this.navigation.navigate("SupplierProfile", {
        title: title,
        email: email,
        address1: address1,
        address2: address2,
        activityStatus: activityStatus,
        phoneNumber: phoneNumber,
        city: city,
        website: website,
        registrationID: registrationID,
      });
    },
    goBack: function () {
      this.navigation.goBack();
    },
  },
};
</script>

<style>
.list {
  border-bottom-width: 1;
  border-color: gainsboro;
  width: 100%;
  padding: 15px;
}
.entry {
  font-size: 16px;
}
</style>
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
        <nb-title>{{ navigation.getParam("supplierName") }}</nb-title>
      </nb-body>
    </nb-header>

    <!-- Body -->
    <nb-grid>
      <nb-content v-for="(supplier, supplierID) in supplier" :key="supplierID">
        <image
          :style="{
            flex: 1,
            width: '100%',
            height: 700,
            display: 'flex',
            position: 'absolute',
            opacity: 0.2,
          }"
          :source="require('./../../../assets/background.jpg')"
        />
        <view>
          <text class="heading"></text>
        </view>
        <nb-row class="inside-container1">
          <nb-col>
            <view class="avatar">
              <image
                :source="{ uri: supplier.logo }"
                class="card-item-image"
                :style="stylesObj.cardItemImage"
              />
            </view>
          </nb-col>
          <nb-col>
            <view class="info">
              <text class="label">Supplier Name</text>
              <text class="text">{{ supplier.supplierName }}</text>

              <text class="label">Email</text>
              <text class="text">{{ supplier.email }}</text>

              <text class="label">Phone</text>
              <text class="text">{{ supplier.phoneNumber }}</text>

              <text class="label">Website</text>
              <text class="text">{{ supplier.website }}</text>
            </view>
          </nb-col>
        </nb-row>
        <nb-row>
          <view class="inside-container2">
            <view class="more-info">
              <text class="label">Address 1</text>
              <text class="text">{{ supplier.address1 }}</text>

              <text class="label">Address 2</text>
              <text class="text">{{ supplier.address2 }}</text>

              <text class="label">City</text>
              <text class="text">{{ supplier.city }}</text>

              <text class="label">Registration Number</text>
              <text class="text">{{ supplier.registrationID }}</text>

              <text class="label">Status</text>
              <text class="text">{{ supplier.activityStatus }}</text>
            </view>
          </view>
        </nb-row>
      </nb-content>
    </nb-grid>
  </nb-container>
</template>

<script>
import React from "react";
import firebase from "firebase";

export default {
  mounted: function () {
    setTimeout(() => {
      this.listenForSuppliers();
    });
  },
  props: {
    navigation: {
      type: Object,
    },
  },
  data: function () {
    return {
      defaultColor: "#1b4f72",
      stylesObj: {
        cardItemImage: {
          resizeMode: "cover",
        },
      },
      supplier: [],
      supplierID: this.navigation.getParam("supplierID"),
      supplierName: this.navigation.getParam("title"),
    };
  },
  methods: {
    goBack: function () {
      this.navigation.goBack();
    },
    getSupplierList: function () {
      return firebase.firestore().collection("SUPPLIERS");
    },
    listenForSuppliers: function () {
      try {
        //  var user = firebase.auth().currentUser;
        this.getSupplierList()
          .get()
          .then((querySnapshot) => {
            const supplier = [];
            querySnapshot.forEach((doc) => {
              if (doc.id == this.supplierID) {
                supplier.push({
                  supplierID: doc.data().uid,
                  supplierName: doc.data().name,
                  logo: doc.data().avatar,
                  address1: doc.data().address1,
                  address2: doc.data().address2,
                  website: doc.data().website,
                  email: doc.data().email,
                  city: doc.data().city,
                  phoneNumber: doc.data().phoneNumber,
                  registrationID: doc.data().registrationID,
                  activityStatus: doc.data().activityStatus,
                });
              }
            });
            this.supplier = supplier;
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
.inside-container1 {
  margin-top: -50px;
  flex: 0.41;
  flex-direction: row;
  justify-content: space-between;
}
.inside-container2 {
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: -70px;
  height: 380px;
}
.avatar {
  border-radius: 50px;
  align-items: center;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 25px;
}
.info {
  align-items: center;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 35px;
}
.heading {
  font-size: 30px;
  font-weight: bold;
  color: black;
  margin: 10px;
}
.text {
  text-align: center;
  margin: 5px;
  font-size: 14px;
}
.label {
  color: grey;
  text-align: center;
  font-size: 12px;
}
.card-item-image {
  flex: 1;
  height: 150;
  width: 150;
  border-radius: 150;
}
</style>
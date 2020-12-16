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
        <nb-title>{{ shopName }}</nb-title>
      </nb-body>
    </nb-header>

    <!-- Body -->
    <nb-grid>
      <nb-content>
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
                :source="cardImage"
                class="card-item-image"
                :style="stylesObj.cardItemImage"
              />
            </view>
          </nb-col>
          <nb-col>
            <view class="info">
              <text class="label">First Name</text>
              <text class="text">{{ firstName }}</text>

              <text class="label">Last Name</text>
              <text class="text">{{ lastName }}</text>

              <text class="label">Other Names</text>
              <text class="text">{{ otherName }}</text>
            </view>
          </nb-col>
        </nb-row>
        <nb-row>
          <view class="inside-container2">
            <view class="more-info">
              <text class="label">Address</text>
              <text class="text">{{ address }}</text>

              <text class="label">City</text>
              <text class="text">{{ city }}</text>
            </view>
          </view>
        </nb-row>
      </nb-content>
    </nb-grid>
  </nb-container>
</template>

<script>
import React from "react";
import cardImage from "./../../../assets/tempImage4.jpg";

export default {
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      defaultColor: "#1b4f72",
      shopName: "Earth-Clan Shop",
      firstName: "Vue",
      lastName: "Developer",
      otherName: "",
      address: "123 Ba Sing Se Street",
      city: "Lusaka",
      cardImage,
      stylesObj: {
        cardItemImage: {
          resizeMode: "cover",
        },
      },
    };
  },
  methods: {
    goBack: function () {
      this.navigation.goBack();
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
  margin-top: -80px;
  height: 400px;
}
.avatar {
  border-radius: 50px;
  align-items: center;
  margin-left: 25px;
  margin-right: 25px;
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
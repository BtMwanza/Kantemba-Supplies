<template>
  <nb-container>
    <nb-header :style="{ backgroundColor: defaultColor }">
      <nb-body>
        <nb-title>{{ shopName }}</nb-title>
      </nb-body>
    </nb-header>
    <view>
      <text class="heading"></text>
    </view>
    <view class="inside-container1">
      <view class="avatar">
        <image
          :style="{ width: 150, height: 150, margin: 1 }"
          :source="require('./../../../assets/tempImage4.jpg')"
        />
      </view>
      <view class="info">
        <text class="label">First Name</text>
        <text class="text">{{ firstName }}</text>

        <text class="label">Last Name</text>
        <text class="text">{{ lastName }}</text>

        <text class="label">Other Names</text>
        <text class="text">{{ otherName }}</text>
      </view>
    </view>
    <view class="inside-container2">
      <view class="more-info">
        <text class="label">Address</text>
        <text class="text">{{ address }}</text>

        <text class="label">City</text>
        <text class="text">{{ city }}</text>
      </view>
    </view>
  </nb-container>
</template>

<script>
import React from "react";
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
    };
  },
  methods: {
    goToHomeScreen() {
      this.navigation.navigate("Home");
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
  margin-top: 2px;
  flex: 0.41;
  flex-direction: row;
  justify-content: space-between;
}
.inside-container2 {
  align-items: center;
  justify-content: center;
  flex: 1;
}
.avatar {
  border-color: aquamarine;
  border-width: 1px;
  align-items: center;
  margin-left: 25px;
  margin-right: 25px;
}
.info {
  align-items: center;
  margin-left: 25px;
  margin-right: 25px;
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
  font-size: 18px;
}
.label {
  color: grey;
  text-align: center;
  font-size: 12px;
}
</style>
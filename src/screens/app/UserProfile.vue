<template>
  <view class="container">
    <view>
      <text class="heading">{{ shopName }}</text>
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
        <text class="label"></text>
        <text class="text">{{ address }}</text>

        <text class="label"></text>
        <text class="text">{{ city }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      shopName: "The Discovery",
      firstName: "Vue",
      lastName: "Developer",
      otherName: "",
      address: "123 Kolony Street",
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
  flex: 1;
  flex-direction: row;
  border-color: brown;
  border-width: 2px;
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
}
.info {
  align-items: center;
}
.heading {
  font-size: 30px;
  font-weight: bold;
  color: darkolivegreen;
  margin: 10px;
}
.text {
  text-align: center;
  margin: 10px;
  font-size: 18px;
}
</style>
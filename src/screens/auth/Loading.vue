<template>
  <view class="container">
    <nb-text>Loading</nb-text>
    <activity-indicator size="large" color="#0000ff" />
  </view>
</template>

<script>
import firebase from "firebase";
import Fire from "./../../api/firebaseAPI";
import store from "./../../store";

export default {
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  data: function () {
    return {
      signedIn: false,
      isLoading: false,
    };
  },
  async mounted() {
    var that = this;
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        that.signedIn = true;
        this.navigation.navigate(user ? "App" : "Auth");
      } else {
        that.signedIn = false;
        that.isLoading = true;
      }
    });
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
  color: darkolivegreen;
  margin: 20px;
}
.text {
  text-align: center;
  margin: 10px;
}
</style>
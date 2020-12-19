<template>
  <view class="container">
    <view v-if="isLoading">
      <nb-text>Loading</nb-text>
      <activity-indicator size="large" color="#0000ff" />
    </view>
  </view>
</template>

<script>
import firebase from "firebase";
import Fire from "./../../api/firebaseAPI";
import store from "./../../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  data: function () {
    return {
      isLoading: true,
    };
  },
  computed: {
    userUid() {
      return store.getters.userUid;
    },
  },
  methods: {
    login: function () {
      firebase.auth().onAuthStateChanged((user) => {
        /* if (user) {
          this.navigation.navigate("App");
        } else {
          this.navigation.navigate("Auth");
        } */
        this.navigation.navigate(user ? "App" : "Auth");
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.login();
    }, 2000);
    /* await checkAuth(function () {
      this.navigation.navigate(this.userUid ? "App" : "Auth");
    }); */
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
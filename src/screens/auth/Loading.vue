<template>
  <view class="container" v-if="logging_in && isLoading">
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
      isLoading: true,
    };
  },
  computed: {
    logging_in() {
      return store.state.logging_in;
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
  color: darkolivegreen;
  margin: 20px;
}
.text {
  text-align: center;
  margin: 10px;
}
</style>
<template>
  <view v-if="isLoading" :style="{ flex: 1, justifyContent: 'center' }">
    <activity-indicator size="large" color="#0000ff" />
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
  methods: {
    isLoading() {
      this.navigation.navigate(usertoken ? "AppContainer" : "AuthStack");
    },
  },
};
</script>

<style>
.container {
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 50px;
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
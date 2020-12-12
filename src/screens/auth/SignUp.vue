<template>
  <view class="container">
    <view>
      <text-input
        class="textInput"
        v-model="email"
        placeholder="Email"
        auto-capitalize="none"
      />

      <text-input
        class="textInput"
        v-model="username"
        placeholder="Username"
        auto-capitalize="none"
      />

      <text-input
        class="textInput"
        v-model="password"
        placeholder="Password"
        auto-capitalize="none"
        secure-text-entry
        :on-blur="() => $v.password.$touch()"
      />
    </view>

    <touchable-opacity class="btn" :on-press="register">
      <text class="btn-text">Sign Up</text>
    </touchable-opacity>

    <touchable-opacity class="btn" :on-press="login">
      <text class="btn-text">Login</text>
    </touchable-opacity>
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
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.navigation.navigate("Login");
    },
    register() {
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
.textInput {
  margin: 10px;
  font-size: 18px;
  height: 50px;
  width: 300px;
  border-color: gray;
  border-width: 1px;
}
.btn {
  background-color: #40e0d0;
  border-radius: 4px;
  height: 52px;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
.btn-text {
  font-size: 16px;
  text-align: center;
  margin: 10px;
  font-weight: 600;
  padding-left: 60px;
  padding-right: 60px;
}
</style>
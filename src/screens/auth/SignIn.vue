<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-content padder>
      <view :style="{ margin: 10 }">
        <view>
          <text class="heading">Welcome back</text>
        </view>

        <!-- Form -->
        <nb-form :style="{ margin: 10 }">
          <nb-item last :error="!$v.email.required && $v.email.$dirty">
            <nb-input
              placeholder="Email"
              v-model="email"
              auto-capitalize="none"
              :on-blur="() => $v.email.$touch()"
            />
          </nb-item>

          <nb-item last :error="!$v.password.required && $v.password.$dirty">
            <nb-input
              placeholder="Password"
              v-model="password"
              auto-capitalize="none"
              secure-text-entry
              :on-blur="() => $v.password.$touch()"
            />
          </nb-item>
        </nb-form>
        <view :style="{ margin: 10 }">
          <nb-button block :on-press="login">
            <nb-spinner v-if="logging_in" size="small" />
            <nb-text>Login </nb-text>
          </nb-button>
        </view>

        <view :style="{ margin: 10 }">
          <touchable-opacity :on-press="register">
            <text class="text">
              Don't have an account?
              <text
                :style="{
                  fontWeight: '500',
                  color: 'blue',
                }"
                >Sign Up</text
              ></text
            >
          </touchable-opacity>
        </view>
      </view>
    </nb-content>

    <!-- <view class="container" v-if="!loaded">
      <nb-text>Loading</nb-text>
      <activity-indicator size="large" color="#0000ff" />
    </view> -->
  </nb-container>
</template>

<script>
import React from "react";
import Vue from "vue-native-core";
import firebase from "firebase";
import { Toast } from "native-base";
import Fire from "./../../api/firebaseAPI";
import store from "./../../store";
import { required, email } from "vuelidate/lib/validators";
import { Alert, AsyncStorage } from "react-native";
import { Font } from "expo-font";

Vue.use(firebase);

export default {
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  data: function () {
    return {
      email: "",
      password: "",
      loaded: false,
    };
  },
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
  },
  computed: {
    logging_in() {
      return store.state.logging_in;
    },
  },
  methods: {
    goToHomeScreen() {
      this.navigation.navigate("Home");
    },
    register() {
      this.navigation.navigate("Register");
    },
    login() {
      if (this.email && this.password && !this.$v.email.$invalid) {
        Fire.shared
          .signIn(this.email.trim(), this.password)
          .catch((error) => alert(error));
        this.navigation.navigate("Home");
      } else {
        Toast.show({
          text: "Invalid Email or Password",
          buttonText: "Okay",
        });
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
  margin-bottom: 180px;
}
.heading {
  font-size: 30px;
  font-weight: bold;
  color: rgb(0, 0, 0);
  margin-top: 70px;
  margin-bottom: 80px;
  text-align: center;
}
.text {
  text-align: center;
  margin: 10px;
}
</style>

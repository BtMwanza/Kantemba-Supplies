<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-content padder>
      <view v-if="loaded" :style="{ margin: 10 }">
        <view>
          <text class="heading">Welcome back</text>
        </view>

        <!-- Form -->
        <nb-form :style="{ margin: 10 }">
          <nb-item
            last
            :error="
              (!$v.emailValue.required || !$v.emailValue.email) &&
              $v.emailValue.$dirty
            "
          >
            <nb-input
              placeholder="Email"
              v-model="emailValue"
              auto-capitalize="none"
              :on-blur="() => $v.emailValue.$touch()"
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

    <view class="container" v-if="!loaded">
      <nb-text>Loading</nb-text>
      <activity-indicator size="large" color="#0000ff" />
    </view>
  </nb-container>
</template>

<script>
import React from "react";
import firebase from "firebase";
import { Toast } from "native-base";
import Fire from "./../../api/firebaseAPI";
import store from "./../../store";
import { required, email } from "vuelidate/lib/validators";
import { Alert, AsyncStorage } from "react-native";

export default {
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  data: function () {
    return {
      emailValue: "",
      password: "",
      loaded: false,
    };
  },
  validations: {
    emailValue: {
      required,
      email,
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
  created() {
    AsyncStorage.getItem("email").then((val) => {
      if (val) {
        this.loaded = true;
        this.navigation.navigate("Home");
        store.dispatch("SET_USER", { userObj: { email: val } });
      } else {
        this.loaded = true;
      }
    });
  },
  methods: {
    goToHomeScreen() {
      this.navigation.navigate("Home");
    },
    register() {
      this.navigation.navigate("Register");
    },
    login() {
      if (this.emailValue && this.password && !this.$v.emailValue.$invalid) {
        firebase
          .auth()
          .signInWithemailValueAndPassword(emailValue.trim(), password)
          .catch((error) => Alert.alert(error));
      } else {
        Toast.show({
          text: "Invalid emailValue or Password",
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

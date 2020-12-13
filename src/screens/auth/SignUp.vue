<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-content padder>
      <view :style="{ margin: 10 }">
        <view>
          <text class="heading text">Welcome to Katemba Supplies</text>
        </view>

        <!-- Form -->
        <nb-form :style="{ margin: 10 }">
          <nb-item last :error="!$v.username.required && $v.username.$dirty">
            <nb-input
              placeholder="Username"
              v-model="username"
              auto-capitalize="none"
              :on-blur="() => $v.username.$touch()"
            />
          </nb-item>

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
          <nb-button block :on-press="register">
            <nb-spinner v-if="logging_in" size="small" />
            <nb-text>Register</nb-text>
          </nb-button>
        </view>

        <view :style="{ margin: 10 }">
          <touchable-opacity :on-press="backToLogin">
            <text class="text">
              Already have an account?
              <text
                :style="{
                  fontWeight: '500',
                  color: 'blue',
                }"
                >Login</text
              ></text
            >
          </touchable-opacity>
        </view>
      </view>
    </nb-content>
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
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    backToLogin() {
      this.navigation.navigate("Login");
    },
    register() {
      this.navigation.navigate("Home");
    },
    login() {
      if (this.emailValue && this.password && !this.$v.emailValue.$invalid) {
        store.dispatch("LOGIN", {
          userObj: { email: this.emailValue },
          navigate: this.navigation.navigate,
        });
      } else {
        Toast.show({
          text: "Invalid Email or Password",
          buttonText: "Okay",
        });
      }
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
  computed: {
    logging_in() {
      return store.state.logging_in;
    },
  },
  validations: {
    username: {
      required,
    },
    emailValue: {
      required,
      email,
    },
    password: {
      required,
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
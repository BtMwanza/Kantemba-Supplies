<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-content padder>
      <view :style="{ margin: 10 }">
        <view>
          <text class="heading text">Welcome to Katemba Supplies</text>
        </view>

        <!-- Fisrtname -->
        <nb-form :style="{ margin: 10 }">
          <nb-item last>
            <nb-input
              placeholder="First name"
              v-model="firstName"
              auto-capitalize="none"
            />
          </nb-item>

          <!-- Lastname -->
          <nb-item last>
            <nb-input
              placeholder="Last name"
              v-model="lastName"
              auto-capitalize="none"
            />
          </nb-item>

          <!-- Othername -->
          <nb-item last>
            <nb-input
              placeholder="Other names"
              v-model="otherName"
              auto-capitalize="none"
            />
          </nb-item>

          <!-- Address -->
          <nb-item last>
            <nb-input
              placeholder="Address"
              v-model="address"
              auto-capitalize="none"
            />
          </nb-item>

          <!-- City -->
          <nb-item last>
            <nb-input
              placeholder="City"
              v-model="city"
              auto-capitalize="none"
            />
          </nb-item>

          <!-- Shop name -->
          <nb-item last>
            <nb-input
              placeholder="Phone Number"
              v-model="phoneNumber"
              auto-capitalize="none"
            />
          </nb-item>

          <!-- Email -->
          <nb-item last>
            <nb-input
              placeholder="Email"
              v-model="email"
              auto-capitalize="none"
            />
          </nb-item>

          <!-- Password -->
          <nb-item last>
            <nb-input
              placeholder="Password"
              v-model="password"
              auto-capitalize="none"
              secure-text-entry
            />
          </nb-item>

          <!-- Confirm Password -->
          <nb-item last>
            <nb-input
              placeholder="Confirm Password"
              v-model="confirmPassword"
              auto-capitalize="none"
              secure-text-entry
            />
          </nb-item>
        </nb-form>
        <view :style="{ margin: 10 }">
          <nb-button block :on-press="register">
            <nb-spinner v-if="isLoggedIn" size="small" />
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
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  computed: {
    isLoggedIn() {
      return store.state.logging_in;
    },
  },
  data: function () {
    return {
      email: "",
      firstName: "",
      lastName: "",
      otherName: "",
      city: "",
      address: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    };
  },

  methods: {
    backToLogin() {
      this.navigation.navigate("Login");
    },
    register: function () {
      if (this.password == this.confirmPassword) {
        Fire.shared.createUser(
          this.firstName,
          this.lastName,
          this.otherName,
          this.address,
          this.city,
          this.phoneNumber,
          this.email,
          this.password
        );
        console.log(store.state.userObj);
      } else {
        Toast.show({
          text: "Please Check Your Input",
          buttonText: "OK",
        });
      }
    },
  },
  /* validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    city: {
      required,
    },
    address: {
      required,
    },
    phoneNumber: {
      required,
    },
    email: {
      required,
    },
    password: {
      required,
    },
    confirmPassword: {
      required,
    },
  }, */
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
  margin-top: 2px;
  text-align: center;
}
.text {
  text-align: center;
  margin: 10px;
}
</style>
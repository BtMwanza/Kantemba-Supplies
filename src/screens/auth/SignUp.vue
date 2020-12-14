<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-content padder>
      <view :style="{ margin: 10 }">
        <view>
          <text class="heading text">Welcome to Katemba Supplies</text>
        </view>

        <!-- Fisrtname -->
        <nb-form :style="{ margin: 10 }">
          <nb-item last :error="!$v.firstName.required && $v.firstName.$dirty">
            <nb-input
              placeholder="First name"
              v-model="firstName"
              auto-capitalize="none"
              :on-blur="() => $v.firstName.$touch()"
            />
          </nb-item>

          <!-- Lastname -->
          <nb-item last :error="!$v.lastName.required && $v.lastName.$dirty">
            <nb-input
              placeholder="Last name"
              v-model="lastName"
              auto-capitalize="none"
              :on-blur="() => $v.lastName.$touch()"
            />
          </nb-item>

          <!-- Othername -->
          <nb-item last>
            <nb-input
              placeholder="Other names"
              v-model="otherName"
              auto-capitalize="none"
              :on-blur="() => $v.otherName.$touch()"
            />
          </nb-item>

          <!-- Address -->
          <nb-item last :error="!$v.address.required && $v.address.$dirty">
            <nb-input
              placeholder="Address"
              v-model="address"
              auto-capitalize="none"
              :on-blur="() => $v.address.$touch()"
            />
          </nb-item>

          <!-- City -->
          <nb-item last :error="!$v.city.required && $v.city.$dirty">
            <nb-input
              placeholder="City"
              v-model="city"
              auto-capitalize="none"
              :on-blur="() => $v.city.$touch()"
            />
          </nb-item>

          <!-- Shop name -->
          <nb-item last :error="!$v.shopName.required && $v.shopName.$dirty">
            <nb-input
              placeholder="Shop name"
              v-model="shopName"
              auto-capitalize="none"
              :on-blur="() => $v.shopName.$touch()"
            />
          </nb-item>

          <!-- Email -->
          <nb-item last :error="!$v.email.required && $v.email.$dirty">
            <nb-input
              placeholder="Email"
              v-model="email"
              auto-capitalize="none"
              keyboard-type="email"
              :on-blur="() => $v.email.$touch()"
            />
          </nb-item>

          <!-- Password -->
          <nb-item last :error="!$v.password.required && $v.password.$dirty">
            <nb-input
              placeholder="Password"
              v-model="password"
              auto-capitalize="none"
              secure-text-entry
              :on-blur="() => $v.password.$touch()"
            />
          </nb-item>

          <!-- Confirm Password -->
          <nb-item
            last
            :error="!$v.confirmPassword.required && $v.confirmPassword.$dirty"
          >
            <nb-input
              placeholder="Confirm Password"
              v-model="confirmPassword"
              auto-capitalize="none"
              secure-text-entry
              :on-blur="() => $v.confirmPassword.$touch()"
            />
          </nb-item>
        </nb-form>
        <view :style="{ margin: 10 }">
          <nb-button block :on-press="login">
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
      firstName: "",
      lastName: "",
      otherName: "",
      city: "",
      address: "",
      shopName: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    backToLogin() {
      this.navigation.navigate("Login");
    },
    register() {
      this.navigation.navigate("Home");
    },
    login: function () {
      if (this.password == this.confirmPassword) {
        Fire.shared.createUser(
          this.firstName,
          this.lastName,
          this.otherName,
          this.address,
          this.city,
          this.shopName,
          this.email,
          this.password
        );
        this.navigation.navigate("Home");
      } else {
        Toast.show({
          text: "Invalid Email or Password",
          buttonText: "Okay",
        });
      }
    },
  },
  computed: {
    logging_in() {
      return store.state.logging_in;
    },
  },
  validations: {
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
    shopName: {
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
  margin-top: 2px;
  text-align: center;
}
.text {
  text-align: center;
  margin: 10px;
}
</style>
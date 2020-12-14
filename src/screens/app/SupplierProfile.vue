<template>
  <nb-container>
    <!-- Header -->
    <nb-header :style="{ backgroundColor: defaultColor }">
      <nb-body>
        <nb-title>Supplier Profile for {{ supplierName }}</nb-title>
      </nb-body>
    </nb-header>

    <nb-content>
      <nb-text>{{ supplierName }}</nb-text>
    </nb-content>
  </nb-container>
</template>

<script>
import React from "react";

export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data: function () {
    return {
      defaultColor: "#1b4f72",
      supplierName: this.navigation.getParam("title"),
      logo: "",
      address: "",
      city: "",
      phoneNumber: "",
    };
  },
};
</script>

<style>
</style>
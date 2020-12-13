<template>
  <nb-container>
    <!-- Header -->
    <nb-header>
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
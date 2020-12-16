<template>
  <nb-container>
    <nb-header :style="{ backgroundColor: defaultColor }">
      <status-bar background-color="#1b4f72" bar-style="light-content" />
      <nb-left>
        <nb-button transparent :on-press="() => goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>

      <nb-body>Receipt</nb-body>
    </nb-header>
  </nb-container>
</template>

<script>
import React from "react";

export default {
  data: function () {
    return {
      defaultColor: "#1b4f72",
    };
  },
  methods: {
    goBack: function () {
      this.navigation.goBack();
    },
  },
};
</script>

<style>
</style>
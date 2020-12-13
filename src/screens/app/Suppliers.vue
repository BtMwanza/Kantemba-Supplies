<template>
  <nb-container>
    <nb-header>
      <nb-body>
        <nb-title>Suppliers</nb-title>
      </nb-body>
    </nb-header>

    <nb-content>
      <!-- <nb-list class="list" v-for="supplier in suppliers" :key="supplier.id">
        <touchable-opacity :on-press="viewSupplierProfile">
          <nb-text class="entry">{{ supplier.title }}</nb-text>
        </touchable-opacity>
      </nb-list> -->

      <flat-list :data="suppliers" :render-item="(item) => renderList(item)" />
    </nb-content>
  </nb-container>
</template>

<script>
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data: function () {
    return {
      suppliers: [
        {
          id: 1,
          title: "accusamus beatae",
        },
        {
          id: 2,
          title: "reprehenderit",
        },
        {
          id: 3,
          title: "officia ",
        },
        {
          id: 4,
          title: "culpa ",
        },
        {
          id: 5,
          title: "natus nisi",
        },
        {
          id: 6,
          title: "accusamus ",
        },
        {
          id: 7,
          title: "officia delectus ",
        },
        {
          id: 8,
          title: "aut porro officiis ",
        },
        {
          id: 9,
          title: "qui eius qui autem sed",
        },
        {
          id: 10,
          title: "beatae et ",
        },
      ],
    };
  },
  methods: {
    viewSupplierProfile: function () {
      // const id = this.suppliers.id;
      const title = this.suppliers.title;
      console.log(title);
      this.navigation.navigate("SupplierProfile", {
        title: title,
      });
    },
    renderList: function (item) {
      return (
        <TouchableOpacity class="list">
          <Text>{item.item.title}</Text>
        </TouchableOpacity>
      );
    },
  },
};
</script>

<style>
.list {
  border-bottom-width: 1;
  border-color: gainsboro;
  width: 100%;
  padding: 15px;
}
.entry {
  font-size: 16px;
}
</style>
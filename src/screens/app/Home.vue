<template>
  <nb-container>
    <nb-header>
      <nb-body>
        <nb-title>Home</nb-title>
      </nb-body>
    </nb-header>

    <nb-content class="products">
      <!-- Content goes here -->

      <view v-for="product in products" :key="product.id">
        <touchable-opacity class="product-display" :on-press="() => {}">
          <view>
            <image
              :style="{ width: 150, height: 150 }"
              :resizeMode="contain"
              :source="{ uri: product.thumbnailUrl }"
            />
            <text class="text">{{ product.title }}</text>
            <text class="text">{{ product.price }}</text>
          </view>
        </touchable-opacity>
      </view>
    </nb-content>
  </nb-container>
</template>

<script>
import React from "react";
import { Text } from "react-native";
import axios from "axios";
import { Font } from "expo";

export default {
  mounted() {},
  data() {
    return {
      products: [
        {
          albumId: 1,
          id: 1,
          title: "accusamus beatae ",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952",
        },
        {
          albumId: 1,
          id: 2,
          title: "reprehenderit",
          url: "https://via.placeholder.com/600/771796",
          thumbnailUrl: "https://via.placeholder.com/150/771796",
        },
        {
          albumId: 1,
          id: 3,
          title: "officia ",
          url: "https://via.placeholder.com/600/24f355",
          thumbnailUrl: "https://via.placeholder.com/150/24f355",
        },
        {
          albumId: 1,
          id: 4,
          title: "culpa ",
          url: "https://via.placeholder.com/600/d32776",
          thumbnailUrl: "https://via.placeholder.com/150/d32776",
        },
        {
          albumId: 1,
          id: 5,
          title: "natus nisi",
          url: "https://via.placeholder.com/600/f66b97",
          thumbnailUrl: "https://via.placeholder.com/150/f66b97",
        },
        {
          albumId: 1,
          id: 6,
          title: "accusamus ",
          url: "https://via.placeholder.com/600/56a8c2",
          thumbnailUrl: "https://via.placeholder.com/150/56a8c2",
        },
        {
          albumId: 1,
          id: 7,
          title: "officia delectus ",
          url: "https://via.placeholder.com/600/b0f7cc",
          thumbnailUrl: "https://via.placeholder.com/150/b0f7cc",
        },
        {
          albumId: 1,
          id: 8,
          title: "aut porro officiis ",
          url: "https://via.placeholder.com/600/54176f",
          thumbnailUrl: "https://via.placeholder.com/150/54176f",
        },
        {
          albumId: 1,
          id: 9,
          title: "qui eius qui autem sed",
          url: "https://via.placeholder.com/600/51aa97",
          thumbnailUrl: "https://via.placeholder.com/150/51aa97",
        },
        {
          albumId: 1,
          id: 10,
          title: "beatae et ",
          url: "https://via.placeholder.com/600/810b14",
          thumbnailUrl: "https://via.placeholder.com/150/810b14",
        },
        {
          albumId: 1,
          id: 11,
          title: "nihil at ",
          url: "https://via.placeholder.com/600/1ee8a4",
          thumbnailUrl: "https://via.placeholder.com/150/1ee8a4",
        },
        {
          albumId: 1,
          id: 12,
          title: "mollitia soluta ut",
          url: "https://via.placeholder.com/600/66b7d2",
          thumbnailUrl: "https://via.placeholder.com/150/66b7d2",
        },
        {
          albumId: 1,
          id: 13,
          title: "repudiandae iusto ",
          url: "https://via.placeholder.com/600/197d29",
          thumbnailUrl: "https://via.placeholder.com/150/197d29",
        },
        {
          albumId: 1,
          id: 14,
          title: "est necessitatibus",
          url: "https://via.placeholder.com/600/61a65",
          thumbnailUrl: "https://via.placeholder.com/150/61a65",
        },
        {
          albumId: 1,
          id: 15,
          title: "harum dicta similique",
          url: "https://via.placeholder.com/600/f9cee5",
          thumbnailUrl: "https://via.placeholder.com/150/f9cee5",
        },
        {
          albumId: 1,
          id: 16,
          title: "iusto sunt nobis quasi ",
          url: "https://via.placeholder.com/600/fdf73e",
          thumbnailUrl: "https://via.placeholder.com/150/fdf73e",
        },
        {
          albumId: 1,
          id: 17,
          title: "natus doloribus",
          url: "https://via.placeholder.com/600/9c184f",
          thumbnailUrl: "https://via.placeholder.com/150/9c184f",
        },
        {
          albumId: 1,
          id: 18,
          title: "laboriosam odit nam",
          url: "https://via.placeholder.com/600/1fe46f",
          thumbnailUrl: "https://via.placeholder.com/150/1fe46f",
        },
        {
          albumId: 1,
          id: 19,
          title: "perferendis ",
          url: "https://via.placeholder.com/600/56acb2",
          thumbnailUrl: "https://via.placeholder.com/150/56acb2",
        },
        {
          albumId: 1,
          id: 20,
          title: "assumenda voluptatem",
          url: "https://via.placeholder.com/600/8985dc",
          thumbnailUrl: "https://via.placeholder.com/150/8985dc",
        },
      ],
    };
  },
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  methods: {
    goToProfileScreen() {
      this.navigation.navigate("Profile");
    },
  },
};
</script>

<style>
.container {
  align-items: center;
  justify-content: center;
  flex: 1;
}
.products {
  margin: 2px;
}
.product-display {
  flex: 1;
  flex-direction: row;
  border-color: gold;
  border-width: 1px;
  flex-wrap: wrap;
  width: 50%;
  flex-basis: 50%;
  padding: 2px;
}
.heading {
  font-size: 30px;
  font-weight: bold;
  color: darkolivegreen;
  margin: 20px;
}
.text {
  text-align: center;
  margin: 1px;
}
</style>
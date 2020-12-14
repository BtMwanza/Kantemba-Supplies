<template>
  <nb-container>
    <nb-header :style="{ backgroundColor: defaultColor }">
      <nb-body>
        <nb-title>Home</nb-title>
      </nb-body>
      <nb-right searchBar rounded>
        <nb-item>
          <nb-input placeholder="Search" />
          <nb-button>
            <nb-icon active name="search" />
          </nb-button>
        </nb-item>
      </nb-right>
    </nb-header>

    <!-- <nb-content padder>
      <nb-card
        :style="{ flex: 1, flexDirection: 'column' }"
        v-for="product in products"
        :key="product.id"
      >
        <touchable-opacity :on-press="() => viewProduct(product)">
          <nb-card-item cardBody>
            <image
              :style="{ width: '100%', height: 200 }"
              :resizeMode="contain"
              :source="{ uri: product.thumbnailUrl }"
            />
          </nb-card-item>
          <nb-left>
            <nb-card-item>
              <text class="text-title">{{ product.title }}</text>
              <text class="text">{{ product.price }}</text>
            </nb-card-item>
          </nb-left>
        </touchable-opacity>
      </nb-card>
    </nb-content> -->

    <nb-grid>
      <nb-col :style="{ flex: 1, flexDirection: 'row' }">
        <nb-content padder>
          <nb-card v-for="product in products" :key="product.id">
            <touchable-opacity :on-press="() => viewProduct(product)">
              <nb-card-item>
                <nb-left>
                  <nb-body>
                    <nb-text>{{ product.title }}</nb-text>
                    <nb-text note>SupplierName</nb-text>
                  </nb-body>
                </nb-left>
              </nb-card-item>
              <nb-card-item cardBody>
                <image
                  :source="{ uri: product.thumbnailUrl }"
                  class="card-item-image"
                  :style="stylesObj.cardItemImage"
                />
              </nb-card-item>
            </touchable-opacity>
            <nb-card-item>
              <nb-left>
                <nb-text>{{ product.price }}</nb-text>
              </nb-left>

              <nb-right>
                <nb-button transparent :onPress="() => addToCart()">
                  <nb-icon
                    name="cart"
                    :style="{ fontSize: 25, color: defaultColor }"
                    active
                  ></nb-icon>
                </nb-button>
              </nb-right>
            </nb-card-item>
          </nb-card>
        </nb-content>
      </nb-col>
    </nb-grid>
  </nb-container>
</template>

<script>
import React from "react";
import { Text } from "react-native";

export default {
  mounted() {},
  data() {
    return {
      defaultColor: "#1b4f72",
      products: [
        {
          albumId: 1,
          id: 1,
          title: "accusamus beatae ",
          price: "K100",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952",
        },
        {
          albumId: 1,
          id: 2,
          title: "reprehenderit",
          price: "K100",
          url: "https://via.placeholder.com/600/771796",
          thumbnailUrl: "https://via.placeholder.com/150/771796",
        },
        {
          albumId: 1,
          id: 3,
          title: "officia ",
          price: "K100",
          url: "https://via.placeholder.com/600/24f355",
          thumbnailUrl: "https://via.placeholder.com/150/24f355",
        },
        {
          albumId: 1,
          id: 4,
          title: "culpa ",
          price: "K100",
          url: "https://via.placeholder.com/600/d32776",
          thumbnailUrl: "https://via.placeholder.com/150/d32776",
        },
        {
          albumId: 1,
          id: 5,
          title: "natus nisi",
          price: "K100",
          url: "https://via.placeholder.com/600/f66b97",
          thumbnailUrl: "https://via.placeholder.com/150/f66b97",
        },
        {
          albumId: 1,
          id: 6,
          title: "accusamus ",
          price: "K100",
          url: "https://via.placeholder.com/600/56a8c2",
          thumbnailUrl: "https://via.placeholder.com/150/56a8c2",
        },
        {
          albumId: 1,
          id: 7,
          title: "officia delectus ",
          price: "K100",
          url: "https://via.placeholder.com/600/b0f7cc",
          thumbnailUrl: "https://via.placeholder.com/150/b0f7cc",
        },
        {
          albumId: 1,
          id: 8,
          title: "aut porro officiis ",
          price: "K100",
          url: "https://via.placeholder.com/600/54176f",
          thumbnailUrl: "https://via.placeholder.com/150/54176f",
        },
        {
          albumId: 1,
          id: 9,
          title: "qui eius qui autem sed",
          price: "K100",
          url: "https://via.placeholder.com/600/51aa97",
          thumbnailUrl: "https://via.placeholder.com/150/51aa97",
        },
        {
          albumId: 1,
          id: 10,
          title: "beatae et ",
          price: "K100",
          url: "https://via.placeholder.com/600/810b14",
          thumbnailUrl: "https://via.placeholder.com/150/810b14",
        },
        {
          albumId: 1,
          id: 11,
          title: "nihil at ",
          price: "K100",
          url: "https://via.placeholder.com/600/1ee8a4",
          thumbnailUrl: "https://via.placeholder.com/150/1ee8a4",
        },
        {
          albumId: 1,
          id: 12,
          title: "mollitia soluta ut",
          price: "K100",
          url: "https://via.placeholder.com/600/66b7d2",
          thumbnailUrl: "https://via.placeholder.com/150/66b7d2",
        },
        {
          albumId: 1,
          id: 13,
          title: "repudiandae iusto ",
          price: "K100",
          url: "https://via.placeholder.com/600/197d29",
          thumbnailUrl: "https://via.placeholder.com/150/197d29",
        },
        {
          albumId: 1,
          id: 14,
          title: "est necessitatibus",
          price: "K100",
          url: "https://via.placeholder.com/600/61a65",
          thumbnailUrl: "https://via.placeholder.com/150/61a65",
        },
        {
          albumId: 1,
          id: 15,
          title: "harum dicta similique",
          price: "K100",
          url: "https://via.placeholder.com/600/f9cee5",
          thumbnailUrl: "https://via.placeholder.com/150/f9cee5",
        },
        {
          albumId: 1,
          id: 16,
          title: "iusto sunt nobis quasi ",
          price: "K100",
          url: "https://via.placeholder.com/600/fdf73e",
          thumbnailUrl: "https://via.placeholder.com/150/fdf73e",
        },
        {
          albumId: 1,
          id: 17,
          title: "natus doloribus",
          price: "K100",
          url: "https://via.placeholder.com/600/9c184f",
          thumbnailUrl: "https://via.placeholder.com/150/9c184f",
        },
        {
          albumId: 1,
          id: 18,
          title: "laboriosam odit nam",
          price: "K100",
          url: "https://via.placeholder.com/600/1fe46f",
          thumbnailUrl: "https://via.placeholder.com/150/1fe46f",
        },
        {
          albumId: 1,
          id: 19,
          title: "perferendis ",
          price: "K100",
          url: "https://via.placeholder.com/600/56acb2",
          thumbnailUrl: "https://via.placeholder.com/150/56acb2",
        },
        {
          albumId: 1,
          id: 20,
          title: "assumenda voluptatem",
          price: "K100",
          url: "https://via.placeholder.com/600/8985dc",
          thumbnailUrl: "https://via.placeholder.com/150/8985dc",
        },
      ],
      stylesObj: {
        cardItemImage: {
          resizeMode: "cover",
        },
      },
    };
  },
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  methods: {
    viewProduct: function (product) {
      const image = product.url;
      const title = product.title;
      const price = product.price;

      console.log(title);
      this.navigation.navigate("ProductDetails", {
        title: title,
        image: image,
        price: price,
      });
    },
    addToCart: function () {
      alert("Added to Cart");
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
.text-title {
  text-align: center;
  margin: 1px;
}
.card-item-image {
  flex: 1;
  height: 200;
}
</style>
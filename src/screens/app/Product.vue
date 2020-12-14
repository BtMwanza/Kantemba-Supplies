<template>
  <nb-container>
    <!-- Header -->
    <nb-header :style="{ backgroundColor: defaultColor }">
      <nb-body>
        <nb-title>{{ productName }}</nb-title>
      </nb-body>
      <nb-right>
        <nb-button transparent :onPress="() => addToCart()">
          <nb-icon
            name="cart"
            :style="{ fontSize: 25, color: '#fff' }"
            active
          ></nb-icon>
        </nb-button>
      </nb-right>
    </nb-header>

    <!-- Body -->
    <nb-grid>
      <nb-col>
        <nb-content>
          <nb-card :style="{ borderColor: defaultColor, borderWidth: 4 }">
            <nb-card-item cardBody>
              <nb-body>
                <image
                  :source="{ uri: '{{productImage}}' }"
                  class="card-item-image"
                  :style="stylesObj.cardItemImage"
                />

                <nb-text>{{ productDescription }}</nb-text>
              </nb-body>
            </nb-card-item>

            <nb-card-item :style="{ backgroundColor: defaultColor }">
              <nb-left>
                <nb-text :style="{ fontSize: 20, color: '#fff', marginLeft: 0 }"
                  >Unit price: {{ productPrice }}</nb-text
                >
              </nb-left>
            </nb-card-item>
          </nb-card>
        </nb-content>
      </nb-col>
    </nb-grid>
  </nb-container>
</template>

<script>
import React from "react";

export default {
  mounted() {},
  data() {
    return {
      defaultColor: "#1b4f72",
      productImage: this.navigation.getParam("image"),
      productName: this.navigation.getParam("title"),
      productPrice: this.navigation.getParam("price"),
      productDescription:
        "Coffee Shop iOS is a free UI Kit which emulates an iOS app for a local coffee shop. It comes with more than 50 well-designed screens, suitable for any app which features product categories and individual items. It is a part of the Ultimate UI Kit, crafted by Five agency. This free ecommerce UI Kit is designed using a vivid and bright color palette, and implements a clean interface. Coffee Shop UI Kit includes all the elements necessary for online purchasing and browsing. Fonts are free, and belong to Google Fonts library.",
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
    addToCart: function () {
      alert("Added to Cart");
    },
  },
};
</script>

<style>
.card-item-image {
  flex: 1;
  height: 200;
}
.text {
  text-align: center;
  margin: 0px;
}
</style>
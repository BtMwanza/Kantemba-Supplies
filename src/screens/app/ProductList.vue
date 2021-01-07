<template>
  <nb-container>
    <nb-header :style="{ backgroundColor: defaultColor }">
      <nb-left>
        <nb-button transparent :on-press="() => goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <status-bar background-color="#1b4f72" bar-style="light-content" />
      <nb-body>
        <nb-title>{{ navigation.getParam("supplierName") }}</nb-title>
      </nb-body>
    </nb-header>

    <nb-grid>
      <nb-col :style="{ flex: 1, flexDirection: 'row' }">
        <nb-content padder>
          <nb-card v-for="(product, productID) in productList" :key="productID">
            <nb-card-item>
              <nb-left>
                <nb-body>
                  <nb-text>{{ product.productName }}</nb-text>
                  <touchable-opacity
                    :on-press="() => viewSupplierProfile(product)"
                  >
                    <nb-text note>{{ product.supplierName }}</nb-text>
                  </touchable-opacity>
                </nb-body>
              </nb-left>
            </nb-card-item>
            <touchable-opacity :on-press="() => viewProduct(product)">
              <nb-card-item cardBody>
                <image
                  :source="{ uri: product.productImage }"
                  class="card-item-image"
                  :style="stylesObj.cardItemImage"
                />
              </nb-card-item>
            </touchable-opacity>
            <nb-card-item>
              <nb-left>
                <nb-text>K{{ product.price }}</nb-text>
              </nb-left>

              <nb-right>
                <nb-button transparent :on-press="() => toggleCart(product)">
                  <nb-icon
                    name="cart"
                    :style="{ fontSize: 25, color: defaultColor }"
                    v-if="!product.isAddedToCart"
                  ></nb-icon>
                  <nb-icon
                    name="cart"
                    :style="{ fontSize: 25, color: 'gray' }"
                    v-if="product.isAddedToCart"
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
import firebase from "firebase";
import store from "./../../store";

export default {
  mounted() {
    setTimeout(() => {
      this.listenForProducts();
    }, 1000);
  },

  data() {
    return {
      defaultColor: "#1b4f72",
      supplierID: this.navigation.getParam("supplierID"),
      productList: [],
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

  /* computed: {
    products() {
      return store.getters.products;
    },
  }, */

  methods: {
    viewProduct: function (product) {
      const productID = product.productID;
      const productName = product.productName;
      const productImage = product.productImage;
      const productDescription = product.productDescription;
      const price = product.unitPrice;
      const supplierID = product.supplierID;

      this.navigation.navigate("ProductDetails", {
        productID: productID,
        productName: productName,
        productDescription: productDescription,
        productImage: productImage,
        price: price,
        supplierID: supplierID,
      });
    },
    addToCart(product) {
      let idx = this.productList.indexOf(product);
      if (product.isAddedToCart == true) {
        store.dispatch("removeItem", idx);
      } else {
        store.dispatch("addItem", product);
      }
    },
    goBack: function () {
      this.navigation.goBack();
    },
    toggleCart(product) {
      try {
        let idx = this.productList.indexOf(product);
        if (product.index === idx) {
          product.isAddedToCart = !product.isAddedToCart;
          this.addToCart(product);
        }
      } catch (error) {
        alert(error);
      }
    },
    getProductList: function () {
      return firebase.firestore().collection("PRODUCTS");
    },
    listenForProducts: function () {
      try {
        //  var user = firebase.auth().currentUser;
        this.getProductList()
          .get()
          .then((querySnapshot) => {
            const products = [];
            let idx = 0;
            querySnapshot.forEach((doc) => {
              if (doc.data().supplierID == this.supplierID) {
                products.push({
                  index: idx++,
                  productID: doc.id,
                  productQuantity: doc.data().productQuantity,
                  supplierID: doc.data().supplierID,
                  productName: doc.data().productName,
                  supplierName: doc.data().supplierName,
                  productImage: doc.data().productImage,
                  price: doc.data().unitPrice,
                  isAddedToCart: doc.data().isAddedToCart,
                });
              }
            });
            this.productList = products;
          });
      } catch (err) {
        alert(err);
      }
    },
    viewSupplierProfile: function (product) {
      const supplierID = product.supplierID;
      const supplierName = product.supplierName;
      this.navigation.navigate("SupplierProfile", {
        supplierID: supplierID,
        supplierName: supplierName,
      });
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
  color: black;
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
  height: 300;
}
.added {
  color: #1b4f72;
  font-size: 25px;
}
.notAdded {
  color: gray;
  font-size: 25px;
}
</style>
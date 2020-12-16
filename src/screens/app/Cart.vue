<template>
  <nb-container>
    <!-- Header -->
    <nb-header :style="{ backgroundColor: defaultColor }">
      <status-bar background-color="#1b4f72" bar-style="light-content" />
      <nb-left>
        <nb-button transparent :on-press="() => goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>

      <nb-body>
        <nb-title>My Cart</nb-title>
        <nb-title>Total: K{{ totalPrice }}</nb-title>
      </nb-body>

      <nb-right>
        <nb-button bordered info :onPress="() => checkout(item)">
          <nb-text :style="{ color: '#fff' }">Checkout</nb-text>
        </nb-button>
      </nb-right>
    </nb-header>

    <!-- Body -->
    <nb-content>
      <!-- Product 1 -->
      <nb-list-item thumbnail v-for="item in items" :key="item.id">
        <nb-body>
          <nb-text>{{ item.title }}</nb-text>
        </nb-body>
        <nb-right
          :style="{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }"
        >
          <!--  Subtract button -->
          <nb-button bordered :onPress="() => handleSubtractQuantity(item)">
            <nb-icon
              name="remove"
              :style="{ fontSize: 12, color: defaultColor }"
            />
          </nb-button>

          <!-- Quantity -->
          <nb-text>{{ item.quantity }}</nb-text>

          <!-- Add button -->
          <nb-button bordered :onPress="() => handleAddQuantity(item)">
            <nb-icon
              name="add"
              :style="{ fontSize: 12, color: defaultColor }"
            />
          </nb-button>
        </nb-right>
      </nb-list-item>
      <!-- End Product 1 -->
    </nb-content>
  </nb-container>
</template>

<script>
export default {
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  data: function () {
    return {
      defaultColor: "#1b4f72",
      // quantity: 1,
      // unitPrice: 100,
      totalPrice: 0,
      items: [
        {
          id: 1,
          title: "accusamus beatae ",
          unitPrice: 100,
          quantity: 1,
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952",
        },
        {
          id: 2,
          title: "reprehenderit",
          unitPrice: 90,
          quantity: 1,
          url: "https://via.placeholder.com/600/771796",
          thumbnailUrl: "https://via.placeholder.com/150/771796",
        },
        {
          id: 3,
          title: "officia ",
          unitPrice: 200,
          quantity: 1,
          url: "https://via.placeholder.com/600/24f355",
          thumbnailUrl: "https://via.placeholder.com/150/24f355",
        },
        {
          id: 4,
          title: "culpa ",
          unitPrice: 50,
          quantity: 1,
          url: "https://via.placeholder.com/600/d32776",
          thumbnailUrl: "https://via.placeholder.com/150/d32776",
        },
      ],
    };
  },
  methods: {
    checkout: function () {
      alert("Checkout");
    },
    handleAddQuantity: function (item) {
      let idx = this.items.indexOf(item);
      this.items[idx].quantity = this.items[idx].quantity + 1;

      this.totalPrice = this.items[idx].quantity * this.items[idx].unitPrice;
    },
    handleSubtractQuantity: function (item) {
      let idx = this.items.indexOf(item);
      this.items[idx].quantity = this.items[idx].quantity - 1;
      if (this.items[idx].quantity < 1) {
        this.items[idx].quantity = 1;
      }

      this.totalPrice = this.items[idx].quantity * this.items[idx].unitPrice;
    },
    goBack: function () {
      this.navigation.goBack();
    },
  },
};
</script>

<style>
</style>
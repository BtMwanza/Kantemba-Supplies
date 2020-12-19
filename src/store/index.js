/**
 * reference
 * https://github.com/weexteam/weex-hackernews/tree/master/src/store
 */

import Vue from 'vue-native-core';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  mutations,

  state: {
    products: [],
    isAdded: false,
    storeCart: [],
    signedIn: false,
    mode: 'signin',
    totalPrice: 0,
    logging_in: false,
    user: {
      id: '',
      firstName: "",
      lastName: "",
      otherName: "",
      address: "",
      city: "",
      shopName: "",
      email: "",
      password: "",
      status: 0,
      uid: '',
    },
    isLoading: false,
    loadingProducts: false
  },
  getters: {
    products: (state) => state.products,
    storeCart: (state) => state.storeCart,
    signedIn: (state) => state.signedIn,
    mode: (state) => state.mode,
    userID: (state) => state.userObj.userID,
  },

});


export default store;

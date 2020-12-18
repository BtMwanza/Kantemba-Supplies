/**
 * reference
 * https://github.com/weexteam/weex-hackernews/tree/master/src/store
 */

import Vue from 'vue-native-core';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  mutations,

  state: {
    products: [],
    isAdded: false,
    storeCart: [],
    totalPrice: 0,
    logging_in: false,
    userObj: {},
    isLoading: false,
    loadingProducts: false
  },
  getters: {
    products: (state) => state.products,
    storeCart: (state) => state.storeCart,
  },

});


export default store;

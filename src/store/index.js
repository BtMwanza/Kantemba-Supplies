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
    email: '',
    password: '',
    avatar: '',
    firstName: '',
    lastName: '',
    otherName: '',
    productAvatar: '',
    productName: '',
    price: '',
    isBought: false,
    activeType: 'posts',
    posts: [],
    logging_in: false,
    userObj: {},
    isLoading: false
  }
});

export default store;

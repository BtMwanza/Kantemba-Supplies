import { fetchPosts } from './fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase";
import Fire from './../api/firebaseAPI'

// ensure data for rendering given list type
export function FETCH_LIST_DATA({ commit, dispatch }, { type }) {
  commit('FETCHING_LISTS');
  return fetchPosts(type)
    .then(posts => {
      return commit('SET_POSTS', { posts })
    });
}


export function REGISTER({ commit, state }, { userObj, navigate }) {
  commit('LOGGING_IN', true)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      commit('LOGIN_SUCCESFULL', { userObj })
      const firstName = ['firstName', userObj.firstName]
      const lastName = ['lastName', userObj.lastName]
      const otherName = ['otherName', userObj.otherName]
      const address = ['address', userObj.address]
      const city = ['city', userObj.city]
      const shopName = ['shopName', userObj.shopName]
      const email = ['email', userObj.email]
      const password = ['password', userObj.password]

      AsyncStorage.multiSet([firstName, lastName, otherName, address, city, shopName, email, password])
      navigate('Home');
      resolve();
    }, 1000)
  })
}

export function LOGIN({ commit, state }, { userObj, navigate }) {
  commit('LOGGING_IN', true)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      commit('LOGIN_SUCCESFULL', { userObj })
      AsyncStorage.setItem('email', userObj.email)
      navigate('Home');
      resolve();
    }, 1000)
  })
}

export function SET_USER({ commit, state }, { userObj }) {
  return commit('LOGIN_SUCCESFULL', { userObj })
}

export function LOGOUT({ commit, state }, callback) {
  return new Promise((resolve, reject) => {
    const keys = ['firstName', 'lastName', 'otherName', 'address', 'city', 'shopeName', 'email', 'password']
    AsyncStorage.multiRemove(keys).then(() => {
      callback();
      resolve();
    })
  })
}

export function ADD_TO_CART({ commit, state }, item) {
  return commit('ADD_TO_CART', item)
}
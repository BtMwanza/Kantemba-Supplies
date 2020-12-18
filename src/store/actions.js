import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase";
import Fire from './../api/firebaseAPI'

export function FETCH_LIST_DATA({ commit, state }, { type }) {
  commit('FETCHING_LISTS');

  firebase.firestore().collection("PRODUCTS").onSnapshot((querySnapshot) => {
    const productList = [];
    querySnapshot.forEach((doc) => {
      products.push({
        productID: doc.id,
        productQuantity: doc.data().productQuantity,
        supplierID: doc.data().supplierID,
        productName: doc.data().productName,
        supplierName: doc.data().supplierName,
        productImage: doc.data().productImage,
        unitPrice: doc.data().unitPrice,
      });
    });
    state.products = productList;
  })
    .then(productList => {
      return commit('SET_PRODUCTS', { productList })
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

export function addItem(context, product) {
  context.commit("ADD_ITEM", product);
}

export function removeItem(context, index) {
  context.commit("REMOVE_ITEM", index);
}

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
      console.log("Checking:", userObj.email)
      //   navigate('Home');
      resolve();
    }, 1000)
  })
}

export function LOGIN({ commit, state }, { userObj, navigate }) {
  commit('LOGGING_IN', true)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      commit('LOGIN_SUCCESFULL', { userObj })
      Fire.shared.signIn({ email: userObj.email, password: userObj.password })
      //navigate('Home');
      resolve();
    }, 1000)
  })
}

export function SET_USER({ commit, state }, { userObj }) {
  return commit('LOGIN_SUCCESFULL', { userObj })
}

/* export function LOGOUT({ commit, state }, callback) {
  return new Promise((resolve, reject) => {
    //  const keys = ['firstName', 'lastName', 'otherName', 'address', 'city', 'shopeName', 'email', 'password']
    firebase.auth().signOut().then(() => {
      callback();
      resolve();
    })
  })
} */

// Add items to the cart
export function addItem(context, product) {
  context.commit("ADD_ITEM", product);
}

// Remove cart items
export function removeItem(context, index) {
  context.commit("REMOVE_ITEM", index);
}

// Get current user from firebase
export function getCurrentUser({ commit }) {
  const user = firebase.auth().currentUser;
  if (user != null) {
    commit('setUserName', user.displayName);
    commit('setUserEmail', user.email);
    commit('setUserUid', user.uid);
    commit('setUserStatus', 1);
  }

}

export function LOGOUT({ commit }) {
  firebase.auth().signOut().then(() => {
  })
  commit('setUserId', '');
  commit('setUserName', '');
  commit('setUserEmail', '');
  commit('setUserUid', '');
  commit('setUserStatus', 0);
}

export function CLEARCART({ commit }) {
  return commit("clearCart")
}



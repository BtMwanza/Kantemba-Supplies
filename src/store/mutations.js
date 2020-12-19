export function SET_PRODUCTS(state, { products }) {
  state.loadingProducts = false;
  state.products = products;
}

export function FETCHING_LISTS(state) {
  state.loadingProducts = true;
}

export function LOGGING_IN(state, status) {
  state.logging_in = status;
}

export function LOGIN_SUCCESFULL(state, { userObj }) {
  state.userObj = userObj;
  state.logging_in = false;
}

export function ADD_ITEM(state, product) {
  //  state.isAdded = true;
  const added = state.storeCart.find(p => p.productID === product.productID)
  if (!added) {
    state.storeCart.push(product);
  } else {
    added.productQuantity++
  }

  console.log('ADDED', state.storeCart);

}

export function REMOVE_ITEM(state, idx) {
  //  state.isAdded = false;
  state.storeCart.splice(idx, 1);
  console.log('NEW CART', state.storeCart);
}

export function setUserId(state, data) {
  state.user.id = data
}

export function setUserName(state, data) {
  state.user.name = data
}

export function setUserEmail(state, data) {
  state.user.email = data
}

export function setUserUid(state, data) {
  state.user.uid = data
}

export function setUserStatus(state, data) {
  state.user.status = data
}
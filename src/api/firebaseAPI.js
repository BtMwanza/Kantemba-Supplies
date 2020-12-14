import firebase from "firebase";
require("firebase/firestore");

class Fire {
  constructor() {
    this.init();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCgVz_kOZISLOv_ruNXRxxGjapP8AfdPM4",
        authDomain: "kantemba-supplies.firebaseapp.com",
        projectId: "kantemba-supplies",
        storageBucket: "kantemba-supplies.appspot.com",
        messagingSenderId: "1076209588732",
        appId: "1:1076209588732:web:83ee1852c636c6d6967a79",
        measurementId: "G-LPVP55EVVL"
      });
    }
  };

  subscribeToAuthChanges(authStateChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      authStateChanged(user);
    })
  }

  uploadPhotoAsync = (uri, filename) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase
        .storage()
        .ref(filename)
        .put(file);

      upload.on(
        "state_changed",
        snapshot => { },
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  signIn = async (email, password) => {

    try {
      const signedIn = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log(signedIn);
      if (signedIn) {
        return signedIn.user;
      }
    } catch (e) {
      console.log(e.message);
      return {
        errorMessage: e.message
      }
    }
  }

  createUser = async (firstName, lastName, otherName, address, city, shopName, email, password, avatar) => {
    let remoteUri = null;

    try {
      await firebase.auth().createUserWithEmailAndPassword(email.trim(), password);

      let db = firebase.firestore().collection("users").doc(this.uid);

      db.set({
        firstName: firstName,
        lastName: lastName,
        otherName: otherName,
        address: address,
        city: city,
        email: email,
        avatar: null,
        shopName: shopName,

      });

      if (avatar) {
        remoteUri = await this.uploadPhotoAsync(avatar, `avatars/${this.uid}`);

        db.set({ avatar: remoteUri }, { merge: true });
      }
    } catch (error) {
      alert(error);
    }
  };

  ref() {
    return firebase.database().ref();
  }
  refOn = callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  off() {
    this.ref.off();
  }

  signOut = () => {
    firebase.auth().signOut();
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;

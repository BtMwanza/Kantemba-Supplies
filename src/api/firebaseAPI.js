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

  createUser = async user => {
    let remoteUri = null;

    try {
      await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

      let db = this.firestore.collection("users").doc(this.uid);

      db.set({
        name: user.name,
        email: user.email,
        avatar: null
      });

      if (user.avatar) {
        remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`);

        db.set({ avatar: remoteUri }, { merge: true });
      }
    } catch (error) {
      alert("Error: ", error);
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

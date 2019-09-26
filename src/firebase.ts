import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: "AIzaSyAdrA4We3xEwAyNrSqhxD3Y9sKJ8bGDrJk",
  authDomain: "intercorp-project-41105.firebaseapp.com",
  databaseURL: "https://intercorp-project-41105.firebaseio.com",
  projectId: "intercorp-project-41105",
  storageBucket: "",
  messagingSenderId: "26470041355",
  appId: "1:26470041355:web:d947dfe8ad94eb28d8840e"
});

export const db = firebaseApp.database();

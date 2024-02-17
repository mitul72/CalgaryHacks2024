// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const admin = require('firebase-admin');
const apiRoutes = require('./routes/firebase');
const bodyParser = require('body-parser');
const serviceAccount = require('routes/parkmycar-b9d36-firebase-adminsdk-eozx8-87b1367b27.json');


app.use(bodyParser.json());
const firebaseConfig = {
  apiKey: "AIzaSyDMwW8qljlf8d56lZ9eeCf3ynvNzcPbSS8",
  authDomain: "parkmycar-b9d36.firebaseapp.com",
  projectId: "parkmycar-b9d36",
  storageBucket: "parkmycar-b9d36.appspot.com",
  messagingSenderId: "353740192397",
  appId: "1:353740192397:web:b6a68ddd24f05a3b55c0c4",
  measurementId: "G-25E7DJ0ZSX"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FirebaseApp);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com'
});

const express = require("express");
const app = express();
const port = 5000;
app.use('/api', apiRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

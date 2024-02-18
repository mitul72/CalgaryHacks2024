const express = require('express');
const FirebaseApp = require("firebase/app");
const admin = require('firebase-admin');

const COLLECTION_NAME = 'garages';

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
const FirebaseInstance = FirebaseApp.initializeApp(firebaseConfig);


const serviceAccount = require('./parkmycar-b9d36-firebase-adminsdk-eozx8-87b1367b27.json');
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://parkmycar-b9d36.firebaseio.com'
});


const router = express.Router();
const db = admin.firestore();

// POST request handler for inserting data into Firestore
router.post('/data', async (req, res) => {
  try {
    const { field1, field2, field3 } = req.body;


    // Perform data validation if needed

    // Insert data into Firestore
    const docRef = await db.collection(COLLECTION_NAME).add({
      field1,
      field2,
      field3,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({ message: 'Data inserted successfully', id: docRef.id });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


async function getAllDataFromCollection(collectionName = COLLECTION_NAME) {
  try {
    const snapshot = await db.collection(collectionName).get();
    const data = [];
    snapshot.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.error('Error getting documents from collection:', error);
    throw error;
  }
}

router.get('/data', async (req, res)=>{
  try {
    const collectionName = 'garages'; // Replace with your collection name
    const data = await getAllDataFromCollection(collectionName);
    res.status(201).json({ message: 'Data successfully retrieved.'});
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

})

module.exports = router;

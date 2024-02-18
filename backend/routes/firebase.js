const express = require('express');
const Firebase = require("firebase/app");
const admin = require('firebase-admin');
const Firestore = require('@firebase/firestore');


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
const FirebaseInstance = Firebase.initializeApp(firebaseConfig);



const serviceAccount = require('./parkmycar-b9d36-firebase-adminsdk-eozx8-87b1367b27.json');
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://parkmycar-b9d36.firebaseio.com'
});


const router = express.Router();
const db = admin.firestore();

const GARAGE_COLLECTION = db.collection('garages');


// POST request handler for inserting data into Firestore
router.post('/data', async (req, res) => {
  try {
    const { Name, Location, ImagePath, Description, TimeStart, TimeEnd, Price } = req.body;

    const TimeStartStamp = admin.firestore.Timestamp.fromDate(new Date(TimeStart));
    const TimeEndStamp = admin.firestore.Timestamp.fromDate(new Date(TimeEnd));

    // Insert data into Firestore
    const docRef = await GARAGE_COLLECTION.add({
      Name,
      Location,
      ImagePath,
      Description,
      TimeStartStamp,
      TimeEndStamp,
      Price,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({ message: 'Data inserted successfully', id: docRef.id });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/data', async (req, res)=>{
  try {
    const {Order, TimeMin, TimeMax} = req.body;
    const q = Firestore.query(GARAGE_COLLECTION, Firestore.where("TimeStartStamp", ">=", Firestore.Timestamp.fromDate(new Date(TimeMin))),
     Firestore.orderBy(Order, 'desc'));

    const snapshot = await q.get();
    const data = [];
    snapshot.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() });
    });
    var message = "Data retrieved successfully." + '\n';
    data.forEach(element => {
      message += "Name: " + element.Name + '\n';
      message += "Location: " + element.Location + '\n';
      message += "Image: " + element.ImagePath + '\n';
      message += "Description: " + element.Description + '\n';
      message += "Time Start: " + element.TimeStartStamp.toDate() + '\n';
      message += "Time End: " + element.TimeEndStamp.toDate() + '\n';
      message += "Hourly Rate: " + element.Price + '\n' + '\n';
    });
    res.status(201).json({ message: message });
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

})

module.exports = router;

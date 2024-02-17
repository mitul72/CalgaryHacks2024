const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();
const db = admin.firestore();

// POST request handler for inserting data into Firestore
router.post('/data', async (req, res) => {
  try {
    const { field1, field2 } = req.body;

    // Perform data validation if needed

    // Insert data into Firestore
    const docRef = await db.collection('your_collection').add({
      field1,
      field2,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({ message: 'Data inserted successfully', id: docRef.id });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

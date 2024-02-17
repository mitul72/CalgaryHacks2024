import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


function AddGarage() {
    const [pictures, setPictures] = useState([]);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
  
    const handleAddGarage = async () => {
      try {
        const db = firebase.firestore();
        const garageRef = db.collection('garages').doc();
  
        await garageRef.set({
          pictures,
          description,
          price: parseFloat(price), // assuming price is a number
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
  
        // Clear form fields after successful submission
        setPictures([]);
        setDescription('');
        setPrice('');
        alert('Garage details added successfully!');
      } catch (error) {
        console.error('Error adding garage details: ', error);
        alert('Failed to add garage details. Please try again.');
      }
    };
  
    const handlePictureChange = (e) => {
      const files = e.target.files;
      const picturesArray = [];
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
  
        reader.onload = () => {
          picturesArray.push(reader.result);
          if (picturesArray.length === files.length) {
            setPictures(picturesArray);
          }
        };
  
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div>
        <h2>Add Garage</h2>
        <input type="file" multiple onChange={handlePictureChange} />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <button onClick={handleAddGarage}>Add Garage</button>
      </div>
    );
}


function RetrieveGarages() {
    const [garages, setGarages] = useState([]);
  
    useEffect(() => {
      const fetchGarages = async () => {
        try {
          const db = firebase.firestore();
          const garagesSnapshot = await db.collection('garages').get();
          const garagesData = garagesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setGarages(garagesData);
        } catch (error) {
          console.error('Error fetching garages: ', error);
        }
      };
  
      fetchGarages();
    }, []);
  
    return (
      <div>
        <h2>Garages</h2>
        <ul>
          {garages.map(garage => (
            <li key={garage.id}>
              <h3>Description: {garage.description}</h3>
              <p>Price: {garage.price}</p>
              <div>
                {garage.pictures.map((picture, index) => (
                  <img key={index} src={picture} alt={`Garage ${index + 1}`} style={{ maxWidth: '200px', margin: '5px' }} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default RetrieveGarages;
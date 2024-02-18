import { Router } from "express";
import { initializeApp } from "firebase/app";
import admin from "firebase-admin";
import {
  query,
  getDocs,
  collection,
  limit,
  where,
  orderBy,
  Timestamp,
  getFirestore,
  Query,
} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMwW8qljlf8d56lZ9eeCf3ynvNzcPbSS8",
  authDomain: "parkmycar-b9d36.firebaseapp.com",
  projectId: "parkmycar-b9d36",
  storageBucket: "parkmycar-b9d36.appspot.com",
  messagingSenderId: "353740192397",
  appId: "1:353740192397:web:b6a68ddd24f05a3b55c0c4",
  measurementId: "G-25E7DJ0ZSX",
};

const FirebaseInstance = initializeApp(firebaseConfig);

const serviceAccount = {
  type: "service_account",
  project_id: "parkmycar-b9d36",
  private_key_id: "87b1367b276f7d850a2dc0ca118bf4919777cfdc",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCls+Qybm7YCXW2\nn+AqVFGdJL/9fNcEfYsUJ4rU/DZ4CIKrtwxu+MW286mplCJXCY5jUOxZiQM94BLp\ntq/7tjRd/t5MOu/0i5B+moe6rwN9/m2l+iJ3w2lPGVYuCC8FKR0jrn1b8nzl6x4v\nEWpqG3W07BIVki20go3/3YY1nfkKHhtt+gzjlYRYO7CKZvMnkPJLuBP4HM4WLX/J\ntAMGNh1zcsARmLtO3mixbrEhz8OQgRP8GmQlosIK/j19qx1C1U0Dt7ur4EyvgYXz\nse4+AmC60rRZpSOvCGVu0E1455cjPAoXhu3AIeUp2fg2a5MzupBvA8MmjSKWADvn\nG5zdOFIrAgMBAAECggEALqN5YTBwBmJzPVm2cHOXHRHQ7/oJUvw6/ws6KkRq2FIc\n5VP6LenbTGk8obxOBg1shEusmm7T+MBu0lVXJxPbnXE1BGO6UixOGTRJa6QC6Z2J\nIyRKO0dHBrps5TvscBloWDiulAimWthYgIr4VrEv6iJf3K5uKtZsPU4OjlzOUag/\nPSL99LB+hFAoCyzncd+kwAPKwrnfXKAD2y4x04UIQyULI3ZX8cIWKdy4D+SWiswq\nu8QZFXxgp0u18xAU4maQr2rfod91eWpD1sZfMtcQlL/lK1yqNh+nHJIn0KXe6+2y\n3VEidR4lOetUvu5UQ1ONIX8wl9lP9mYLYwwuk++1YQKBgQDifvevXlkEpFBIXfSf\nnIPGv8nBXrcSuWeI4IOTq/+7KR7LUKcSuBdB2vLcrCX0nK3Zh8FgfH3HCJvANyuw\nJzRDoKEM/4NObZ/ZJJobidlGO77NyjcYVNITwen//MMaBPhUEQluoVMXwGTqWdQj\nEIWT32ELRPwTNVM7+WrzMNugMwKBgQC7SaGzivnIYuqKoQL1NxKEu83A13Pb28vs\n7f2LAITFmfGcM+tdszNK+k4r1EbgpFkMxJSt7RKTbQVZLlI9MXQVYNGU0kqgmBjy\n74mnVLq5IOSFZPbkCbg7IkPdebtoah1sbaJVNEh7o8tI87nIxPm/V8/8+xqnEm33\nnTOfwzOuKQKBgQDXAFWYCASSbnOzLlUfClDg4n/fakx4nrzUZuMf097uyEruDwJ5\nt3yETBXMOjHRcMVqv/5l2+b9f4NxxC1Ziu2G4LzgfNAlK9TYKHGNgJ5amC44ZSNF\nmobMsH+zOznswhkEnCOK++LHoh9pgpnoKy/RvfL94p8ykKURQmMutQtWlwKBgDXZ\nLtfrfnPiFON09d/BTN7DDJ6Ek/hD0vc1Wi/MH2CdKX2q4+JV8sp8+1rYtuRB/KSS\nJNl5D105/E6u5dBYVrMK2ld6uyA/evTmcGKfFuzBi1LbO61HKiQ+btrP9FVKJVmW\nkBUFak26Q2mfQex6zf/45IEtRXWB9AI8vaoSuto5AoGAPd3tbKRCdX+uOQBONB4q\nv8Dl4ugL8+vlOUKNcWylcR59ir153bneLmQfrFy9Oa8PMzk8O8mmMi/0Uozv4Emv\neIIfEOncHQ5ITlAJNLpXRRFDKWIo0LXvYqa1pvjkqw4g112s7z2odISlyPo1s+R0\nuLQo7LCcR960seNGMNLc6hI=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-eozx8@parkmycar-b9d36.iam.gserviceaccount.com",
  client_id: "101819771672781523984",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-eozx8%40parkmycar-b9d36.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

//from './parkmycar-b9d36-firebase-adminsdk-eozx8-87b1367b27.json';
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://parkmycar-b9d36.firebaseio.com",
});

const router = Router();
const db = getFirestore();

const GARAGE_COLLECTION = collection(db, "garages");

// POST request handler for inserting data into Firestore
router.post("/data", async (req, res) => {
  try {
    const { address, type, hourly_price, timings, shown, description } = req.body;

    const TimeStartStamp = Timestamp.fromDate(new Date(TimeStart));
    const TimeEndStamp = Timestamp.fromDate(new Date(TimeEnd));

    // Insert data into Firestore
    const docRef = await GARAGE_COLLECTION.add({ address, type, hourly_price, timings, shown, description });

    res
      .status(201)
      .json({ message: "Data inserted successfully", id: docRef.id });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/data", async (req, res) => {
  try {
    const { Order, TimeMin, TimeMax } = req.body;

    //Can only query ranges of the same property.
    //var q = query(GARAGE_COLLECTION, where("TimeStartStamp", ">=", Timestamp.fromDate(new Date(TimeMin))));
    //q = query(q, where("TimeStartEnd", "<=", Timestamp.fromDate(new Date(TimeMax))));
    var q = query(GARAGE_COLLECTION, orderBy(Order, "desc"));

    const snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    var message = "Data retrieved successfully." + '\n';
    data.forEach(element => {
      message += JSON.stringify(element);
    });
    res.status(201).json({ message: message });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

export { router as firebaseRouter };

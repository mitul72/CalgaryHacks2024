import { firebaseRouter } from './routes/firebase.js';
import { json } from 'express';
import express from 'express';


const app = express();
const port = 5000;
app.use(json());
app.use('/api', firebaseRouter);
const residentialParkingRouter = require("./routes/residentialParking");
const schoolParkingRouter = require("./routes/schoolParking");
const streetParkingRouter = require("./routes/streetParking");

app.use("/residential", residentialParkingRouter);
app.use("/school", schoolParkingRouter);
app.use("/street", streetParkingRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

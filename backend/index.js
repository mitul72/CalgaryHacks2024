import { firebaseRouter } from "./routes/firebase.js";
import { json } from "express";
import express from "express";

const app = express();
const port = 5000;
app.use(json());
app.use("/api", firebaseRouter);
import residentialParkingRouter from "./routes/residentialParking.js";
import schoolParkingRouter from "./routes/schoolParking.js";
import streetParkingRouter from "./routes/streetParking.js";

app.use("/residential", residentialParkingRouter);
app.use("/school", schoolParkingRouter);
app.use("/street", streetParkingRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

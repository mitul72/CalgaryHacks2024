const express = require("express");
const app = express();
const port = 5000;
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

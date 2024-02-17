const express = require("express");
const app = express();
const port = 5000;
const residentialParkingRouter = require("./routes/residentialParking");
app.use("/api", residentialParkingRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

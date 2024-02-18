const apiRoutes = require('./routes/firebase');
const bodyParser = require('body-parser');


const express = require("express");
const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

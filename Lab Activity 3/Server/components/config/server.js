const express = require("express");
const dbConnect = require("./dbConnect");
const dbConnect = require("./components/config/dbConnect.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

dbConnect();

app.get("/", (req, res) => {
  res.send("Server is running");
});

dbConnect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

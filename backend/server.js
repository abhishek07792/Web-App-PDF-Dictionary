const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const meaningRoute = require("./routes/meaning.js");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/meaning", meaningRoute);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

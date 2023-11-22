import express from "express";
import * as dotenv from "dotenv";
const app = express();

const port = process.env.PORT || 5000;

dotenv.config();

app.listen(port, () => {
  console.log("Server running");
});

import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

// const uploadRoute = require("./routes/upload");
import uploadRoute from "./routes/uploadRoute.js";

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`working on : http://localhost:${port}/`);
});

//routes

app.get("/", (req, res) => {
  res.send("Working <3");
});

app.use("/api/upload", uploadRoute);

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import meliController from "./controllers/meliController.js";

const app = express();
const PORT_URL = process.env.PORT || 5000;
const allowedOrigin = process.env.ALLOWED_ORIGIN;


app.use(
  cors({
    origin: allowedOrigin,
    methods: "GET",
  })
);
app.use(express.json());

app.use("/api", meliController);

app.listen(PORT_URL, () => {
  console.log(`Server running on port ${PORT_URL}`);
});

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/db";
import router from "./routes";
dotenv.config();

const PORT = process.env.PORT || 3000;

// connect to mongodb
connectToDatabase();

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", router());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

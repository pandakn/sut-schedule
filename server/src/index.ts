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

const origin = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:8080",
  process.env.ORIGIN,
];

const app = express();
app.use(
  cors({
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    origin,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", router());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

import dotenv from "dotenv";
import express from "express";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/auth.route";
import movieRouter from "./routes/movie.route";
import sessionRouter from "./routes/reservation.route";
import collectionRouter from "./routes/showings.route";
import logger from "./utils/logger";
const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-type", "Authorization", "x-refresh"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", userRouter);
app.use("/api/reservations", sessionRouter);
app.use("/api/showings", collectionRouter);
app.use("/api/movies", movieRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  logger.info(`🚀 Server is running at http://localhost:${PORT} 🚀 `);
});

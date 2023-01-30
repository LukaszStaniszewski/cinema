import dotenv from "dotenv";
import express from "express";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/auth.route";
import movieRouter from "./routes/movie.route";
import reservationRouter from "./routes/reservation.route";
import showingRouter from "./routes/showings.route";
import ticketRouter from "./routes/ticket.route";
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
app.use("/api/reservations", reservationRouter);
app.use("/api/showings", showingRouter);
app.use("/api/movies", movieRouter);
app.use("/api/tickets", ticketRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  logger.info(`🚀 Server is running at http://localhost:${PORT} 🚀 `);
});

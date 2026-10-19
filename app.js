import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import { followrouter } from "./routes/followerapi.route.js";

const app = express();

// 1. Core Global Middlewares Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// 2. Modular Router Imports




// 3. API Routes Declaration (RESTful Versioning)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", followrouter);


// 4. Global Error Handling Middleware (The Bodyguard)
app.use((err, req, res, next) => {
  // Check if error is an instance of our custom ApiError class
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || [];

  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errors,
  });
});

export { app };

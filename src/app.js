import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import indexRoutes from "./routes/index.routes.js";
import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import reviewsRoutes from "./routes/review.routes.js";

import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { logger } from "./middlewares/logger.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "https://localhost:5500" || "http://127.0.0.1:5500",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type"],
  }),
);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    ok: false,
    error: "Demasiadas peticiones, intentalo en 1 minuto",
  },
});

app.use(limiter);
app.use(logger);
app.use(express.json()); // Para leer los datos del body
app.use(express.urlencoded({ extended: true })); // Para leer los datos del body en formato urlencode
app.use(cookieParser());

app.use("/", indexRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("api/reviews", reviewsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

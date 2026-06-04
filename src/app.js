import express from "express";
import cookieParser from "cookie-parser";

import indexRoutes from "./routes/index.routes.js";
import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";

import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { logger } from "./middlewares/logger.middleware.js";

const app = express();

app.use(logger);
app.use(express.json()); // Para leer los datos del body
app.use(express.urlencoded({ extended: true })); // Para leer los datos del body en formato urlencode
app.use(cookieParser());

app.use("/", indexRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

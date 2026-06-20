import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

import indexRoutes from "./routes/index.routes.js";
import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import reviewsRoutes from "./routes/review.routes.js";
import userRoutes from "./routes/users.routes.js";
import wishListRoutes from "./routes/wishlist.routes.js";
import cartRoutes from "./routes/cart.routes.js";

import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { adminLogger } from "./middlewares/adminLogger.middleware.js";
import { limiter } from "./utils/common.utils.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type"],
  }),
);

app.use(express.json()); // Para leer los datos del body
app.use(express.urlencoded({ extended: true })); // Para leer los datos del body en formato urlencode
app.use(cookieParser());
app.use(limiter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", indexRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishListRoutes);
app.use("/api/cart", cartRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

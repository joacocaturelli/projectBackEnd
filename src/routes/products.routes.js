import express from "express"; //Importamos express
import { productsController } from "../controllers/products.controller.js"; //Importamos los controladores
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requiredRole } from "../middlewares/requireRole.middleware.js";

const router = express.Router(); //Creamos el router con la propiedad Router() de express

router.get("/", authMiddleware, productsController.getProducts);
router.get("/:id", authMiddleware, productsController.getProduct);
router.post("/", authMiddleware, requiredRole("ADMIN"), validate.createProduct, productsController.createOneProduct);
router.put("/:id", authMiddleware, requiredRole("ADMIN"), validate.updateProduct, productsController.updateOneProduct);
router.delete("/:id", authMiddleware, requiredRole("ADMIN"), productsController.deleteOneProduct);

export default router;

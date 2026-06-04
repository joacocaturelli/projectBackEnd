import express from "express"; //Importamos express
import { indexController } from "../controllers/products.controller.js"; // Importamos los controladores

const router = express.Router(); //Creamos el router con la propiedad Router() de express

router.get("/", indexController.serverLive);
router.get("/health", indexController.serverHealth);

export default router;
